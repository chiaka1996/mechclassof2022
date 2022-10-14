import profile from '../../Model/profile';
import ConnectMongo from '../../Utilis/ConnectMongo'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function getAllProfile(req:NextApiRequest, res:NextApiResponse){

    try{
        await ConnectMongo();
        const result = await profile.find()
        if(result){
            res.status(200).json(result)
        }
    }
    catch(error:any){
        res.status(500).json({
            mesage: error.message
        })
    }

}