import ConnectMongo from '../../Utilis/ConnectMongo'
import commentModal from '../../Model/Comments';
import type { NextApiRequest, NextApiResponse } from 'next';

const DeleteComment = async (req:NextApiRequest, res:NextApiResponse) => {
    try{
    await ConnectMongo()
    const {_id} = req.query;
    if(!_id){
        res.status(400).json({
            message: 'please fill all fields',
            code: 400,
            status: false
        })

        return false;
    }

    const deleteComment = await commentModal.deleteOne({_id})
    if(deleteComment){
        res.status(200).json({
            message: 'comment deleted successfully',
            status: 200,
            code: true
        })
    }
}catch(error:any){
    res.status(500).json({
        message: error.meassga,
        code: 500,
        status: false
    })
}
}

export default DeleteComment