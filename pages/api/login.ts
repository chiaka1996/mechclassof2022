import profile from '../../Model/profile';
import ConnectMongo from '../../Utilis/ConnectMongo'
import type { NextApiRequest, NextApiResponse } from 'next';
const bcrypt = require('bcrypt')
const {compare} = bcrypt;

const Login = async (req: NextApiRequest, res: NextApiResponse) => {
    try{
        await ConnectMongo()
        console.log(req.body)
        let {matric, password} = req.body;
        console.log(matric)
        console.log(password)
        const matricNo = /p\/hd\/19\/34400[0-9]{2}/i
        matric = matric.toLowerCase()

        if(!matric || !password)
        return res.status(400).json({
            message: 'please fill all fields'
        })

        if(matricNo.test(matric)){ 
            const result = await profile.findOne({matric})
            console.log(result)
            if(result){
            const auth = await compare(password, result.password)
            if(auth){
                res.status(200).json({
                    data: result,
                    message: 'comrade logged in successfully'
                })
            }
            else{
                res.status(400).json({
                    message: 'matric number and password do not match'
                })
            }
            }else{
                res.status(400).json({
                    message: 'matric number and password do not match'
                })
            }
        }else(
            res.status(400).json({
                message: 'invalid matric number'
            })
        )

    }
    catch(error:any){
        res.status(500).json({
            message: error.message
        })
    }
}

export default Login