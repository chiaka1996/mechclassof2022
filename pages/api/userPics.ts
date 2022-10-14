import ConnectMongo from '../../Utilis/ConnectMongo'
import gallery from '../../Model/Gallery';
import type { NextApiRequest, NextApiResponse } from 'next';

const userPics = async(req:NextApiRequest, res:NextApiResponse) => {
    try{
        await ConnectMongo()
        const {userId} = req.query;
        console.log(userId)
        if(!userId){
            res.status(400).json({
                message: "please add userId",
                status: false,
                code: 400
            })

            return false
        }
        const request = await gallery.find({userId})
        if(request){
            return res.status(200).json({
                message: "successfull",
                code: 200,
                status: true,
                request
            })
            
        }
       

    }
    catch(error:any){
        return res.status(500).json({
            message: error.message,
            status: false,
            code: 500
        })
    }
}

export default userPics