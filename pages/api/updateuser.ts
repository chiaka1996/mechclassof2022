import profile from '../../Model/profile';
import ConnectMongo from '../../Utilis/ConnectMongo'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function updateUser(req:NextApiRequest, res:NextApiResponse){

    try{
        await ConnectMongo();
        const {_id, nickname, bio} = req.body
        const updateUser = new profile({
            _id,
            nickname,
            bio
        })
        const result = await profile.updateOne({_id:_id}, updateUser)
        if(result){
            res.status(200).json({
                user:{
                    _id,
                   nickname,
                   bio
                },
                message: 'profile updated successfully'
            })
        }
    }
    catch(error:any){
        res.status(500).json({
            mesage: error.message
        })
    }

}