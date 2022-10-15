import ConnectMongo from '../../Utilis/ConnectMongo'
import commentModal from '../../Model/Comments';
import type { NextApiRequest, NextApiResponse } from 'next';

const Updatecomments = async (req: NextApiRequest, res: NextApiResponse) => {
    try{
        const {senderId,senderPics,senderNickname} = req.body;
        await ConnectMongo()
        if(!senderId){
            return res.status(400).json({
                message: 'please fill all required fields',
                status: false,
                code: 400
            })
        }

        const comment ={
            senderId,
            senderPics,
            senderNickname
        }

        // update all comment nicknames
        const updateMany = await commentModal.updateMany({senderId:senderId},{$set:comment},{multi: true})

        if(updateMany){
             res.status(200).json({
                message: 'comment updated successfully',
                code: 200,
                status: true
            })
            return true;
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

export default Updatecomments;