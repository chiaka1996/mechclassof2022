import ConnectMongo from '../../Utilis/ConnectMongo'
import gallery from '../../Model/Gallery';
import type { NextApiRequest, NextApiResponse } from 'next'

const getSinglePhoto = async (req:NextApiRequest, res:NextApiResponse) => {

    try{
        await ConnectMongo();
        const {cloudinaryId} = req.query;
        if(!cloudinaryId){
            return res.status(400).json({
                message: "please fill all fields",
                status: false,
                code: 400
            })
        }
        const photo = await gallery.findOne({cloudinaryId});
        if(photo){
            res.status(200).json({
                message: 'successful',
                photo,
                status: true,
                code: 200
            })
        }
        else{
            res.status(400).json({
                message: 'Unsuccessful',
                status: false,
                code: 400
            })
        }
    }
    catch(error:any){
    res.status(500).json({
        message: error.message,
        status: false,
        code: 500
    })
    }
       
}

export default getSinglePhoto;