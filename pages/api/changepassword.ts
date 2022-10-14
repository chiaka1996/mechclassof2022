import profile from '../../Model/profile';
import ConnectMongo from '../../Utilis/ConnectMongo'
import type { NextApiRequest, NextApiResponse } from 'next';
const bcrypt = require('bcrypt')
const {compare, hash} = bcrypt;

const ChangePassword = async (req: NextApiRequest, res: NextApiResponse) => {
    try{
        const {_id, oldPassword, newPassword} = req.body
        if(!_id || !oldPassword || !newPassword) {
            res.status(400).json({
                message: 'please fill all fields',
                status: 400
            })
        }
        else{
            console.log('waiting to connect')
            await ConnectMongo()
            console.log('connected')
            let response = await profile.findOne({_id})
            if(!response){
                return res.status(404).json({
                    message: 'user not found',
                    status: 404
                })
            }

            const valid = await compare(oldPassword, response.password)
            if(!valid){
                return res.status(400).json({
                    message: 'old Password is Incorrect',
                    status: 400
                })
            }

            const hashPassword =  await hash(newPassword, 10)
            if(!hashPassword){
                return res.status(500).json({
                    message: "something went wrong from our end. Try again later",
                    status: 500
                })
               }

               const passwordChange = new profile({
                _id,
                password: hashPassword
              })

              const updatePassword = await profile.updateOne({_id:_id}, passwordChange)
              console.log(updatePassword)
              if(!updatePassword){
                res.status(500)
                .json({
                    message: "something went wrong from our end. Try again",
                    status: 500
                })
              }
              else{
                res.status(200).json({
                    message: 'password changed successully',
                    status: 200
                })
              }
        }

    }
    catch(error:any){
        res.status(500).json({
            message: error.message
        })
    }
}

export default ChangePassword;