import type { NextApiRequest, NextApiResponse } from 'next'
import ConnectMongo from '../../Utilis/ConnectMongo'
const bcrypt = require('bcrypt')
const {hash} = bcrypt;
import profile from '../../Model/profile';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try{
    const {surname, lastname, nickname, image, matric, phone, bio, password} = req.body;
    await ConnectMongo()
    const passwordHash: String = await hash(password, 10)
    interface Data{
        surname: string,
        lastname: string,
        nickname: string,
        image: string,
        phone: number,
        matric: string,
        bio: string,
        password: String
    }
    
    let data:Data = {
        surname,
        lastname,
        nickname,
        image,
        matric,
        phone,
        bio,
        password: passwordHash
    }
    const createProfile = await profile.create(data)
    if(createProfile){
        res.status(200).json({
            createProfile,
            message: 'profile created'
        })
    }
}
catch(err:any){
    res.status(500).json({
        mesage: err.message
    })
}
}