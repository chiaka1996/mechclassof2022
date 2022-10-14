import ConnectMongo from '../../Utilis/ConnectMongo'
import commentModal from '../../Model/Comments';
import type { NextApiRequest, NextApiResponse } from 'next';

const GetAllComments = async (req: NextApiRequest, res: NextApiResponse) => {
    try{
        await ConnectMongo()
        const {userId} = req.query
        console.log(userId)
        if(!userId){
            res.status(400).json({
                message: "please add user id",
                code: 400,
                status: false
            })

            return false
        }
        
        const request = await commentModal.find({userId})
        if(request){
            res.status(200).json({
                message: 'successful',
                request,
                status: true,
                code: 200
            })
        }
}
catch(error:any){
    res.status(500).json({
        message: error.message,
        code: 500,
        status: false
    })
}
}
export default GetAllComments