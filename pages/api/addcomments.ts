import ConnectMongo from '../../Utilis/ConnectMongo'
import commentModal from '../../Model/Comments';
import type { NextApiRequest, NextApiResponse } from 'next';

const Addcomments = async (req: NextApiRequest, res: NextApiResponse) => {
    try{
        const {userId, senderId,senderSurname,senderLastname, comment, senderPics, senderNickname} = req.body;
        console.log(req.body)
        console.log(userId)
        await ConnectMongo()
        if(!userId || !senderId || !senderSurname || !senderLastname || !comment){
            return res.status(400).json({
                message: 'please fill all fields',
                status: false,
                code: 400
            })
        }

        const findOne = await commentModal.findOne({senderId, userId})

        if(findOne){
             res.status(400).json({
                message: 'Sorry, You already commented on this comrade',
                code: 400,
                status: false
            })
            return false;
        }

        const newComment = new commentModal({
            userId,
            senderId,
            senderSurname,
            senderLastname,
            comment,
            senderPics,
            senderNickname
        })

        const saveComment = await newComment.save()
        if(saveComment){
            return res.status(200).json({
                message: "comment added",
                code: 200,
                status: true
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

export default Addcomments;