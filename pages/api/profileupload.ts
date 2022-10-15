const cloudinary = require('cloudinary').v2
import type { NextApiRequest, NextApiResponse } from 'next';
const formidable = require('formidable')
import ConnectMongo from '../../Utilis/ConnectMongo'
import profile from '../../Model/profile'
import {server} from '../../Config/index'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARYY_API_SECRET
})

export const config = {
    api: {
      bodyParser: false, // Disallow body parsing, consume as stream
    },
  };

  const Profile_upload = async (req:NextApiRequest, res: NextApiResponse) => {
    try{
        await ConnectMongo();
        const form = new formidable.IncomingForm({ keepExtensions: true });

        form.parse(req, async function (err:any, fields:any, files:any) {
          const img = files.image.filepath;
          const _id = fields._id; 

          if(!_id || !img){
            res.status(400).json({
                message: 'please fill al fields',
                code: 400,
                status: false
            })
            return false
          }

          const findProfile = await profile.findOne({_id})
          if(findProfile){
            let cloud_id = findProfile.cloudinaryId
            if(cloud_id.length > 1){
               const destroy = await cloudinary.uploader.destroy(cloud_id)
               if(!destroy){
                return res.status(500).json({
                    message: 'internal server error',
                    code: 500,
                    status: false
                })
               }
            }
                
            const upload =  await cloudinary.uploader.upload(img);
            if(upload){
              const data = { 
                senderId: _id,
                senderPics: upload.secure_url,
                senderNickname: ''
              }

              const updateComment = await fetch(`${server}/api/updatecomment`, {
                method: 'PuT',
                body: JSON.stringify(data),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
    
                let updateResult = await updateComment.json()
    
                if(updateComment.status === 200){
                  const updateProfile = {
                    image: upload.secure_url,
                    cloudinaryId: upload.public_id
                }

                const updateImage = await profile.updateOne({_id}, updateProfile)

                if(updateImage){
                  return res.status(200).json({
                      image: upload.secure_url,
                      cloudinaryId: upload.public_id,
                      message: "profile photo updated successfully",
                      code: 200,
                      status: true
                  })
              }
                }   

                else{
                  res.status(400).json({
                    message: updateResult.message,
                    code: 400,
                    status: false

                  })
                }
            }
          }

        });
    }
    catch(error:any){
        res.status(500).json({
            message: error.message,
            status: false,
            code: 500
        })
    }
  }

  export default Profile_upload;