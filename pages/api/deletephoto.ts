import ConnectMongo from '../../Utilis/ConnectMongo'
import gallery from '../../Model/Gallery';
const cloudinary = require('cloudinary').v2
import type { NextApiRequest, NextApiResponse } from 'next'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARYY_API_SECRET
})

const DeletePhoto = async (req:NextApiRequest, res:NextApiResponse) => {
    try{
        await ConnectMongo()
        const {cloudinaryId} = req.query;
        if(!cloudinaryId){
            return res.status(400).json({
                message: "please fill all fields",
                status: false,
                code: 400
            })
        }

        const destroy = await cloudinary.uploader.destroy(cloudinaryId)
        if(!destroy){
         return res.status(400).json({
             message: 'image id do not exist',
             code: 400,
             status: false
         })
        }

        const deletePhoto = await gallery.deleteOne({cloudinaryId})
        if(deletePhoto){
             res.status(200).json({
                message: 'photo deleted successfully',
                code: 200,
                status: false
            })
        }
        else{
            res.status(400).json({
                message: 'photo id do not exist',
                code: 400,
                status: false
            })
        }
     }
    catch(error:any){
        return res.status(500).json({
            message: error.message,
            code: 500,
            status: false
        })
    }
}

export default DeletePhoto;