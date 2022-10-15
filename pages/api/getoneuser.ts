import ConnectMongo from '../../Utilis/ConnectMongo'
import profile from '../../Model/profile';
import type { NextApiRequest, NextApiResponse } from 'next';

const GetOneUser = async (req: NextApiRequest, res: NextApiResponse) => {
    try{
        await ConnectMongo()
        const {id} = req.query
        if(!id){
            res.status(400).json({
                message: "please add user id",
                code: 400,
                status: false
            })

            return false
        }
        
        const request = await profile.findOne({_id:id})
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
export default GetOneUser;