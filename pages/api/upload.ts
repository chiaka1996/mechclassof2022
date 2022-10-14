const cloudinary = require('cloudinary').v2
import type { NextApiRequest, NextApiResponse } from 'next';
const formidable = require('formidable')
import gallery from '../../Model/Gallery';
import ConnectMongo from '../../Utilis/ConnectMongo'

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

const Upload = async (req:NextApiRequest, res: NextApiResponse) => {
    try{
      await ConnectMongo()
      const form = new formidable.IncomingForm({ keepExtensions: true });

      form.parse(req, async function (err:any, fields:any, files:any) {
        const img = files.image.filepath;
        const _id = fields._id; 
        if(!_id || !img){
          res.status(400).json({
            message: 'please fill all fields',
            code: 400,
            status: false
          })
          return
        }
         const result =  await cloudinary.uploader.upload(img,{width: 2500, height: 3500, crop: "fill"})
         if(result){
          const newPicture = new gallery({
                    userId: _id,
                    imgUrl: result.secure_url,
                    cloudinaryId: result.public_id
         })

         const savePicture = await newPicture.save()
             if(savePicture){
                 res.status(200).json({
                     message: "picture saved successfully",
                     status: true,
                     code: 200
                 })
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

export default Upload;
    
