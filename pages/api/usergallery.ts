import ConnectMongo from '../../Utilis/ConnectMongo'
import gallery from '../../Model/Gallery';
import type { NextApiRequest, NextApiResponse } from 'next'

const getUserGallery = async (req:NextApiRequest, res:NextApiResponse) => {

    try{
        await ConnectMongo();
        let {_id,page,limit} = req.body
        console.log(_id)
        console.log(page)
        console.log(limit)
        let result = {
            current: 0,
            next: {
                page: 0,
                limit: limit
            },
            previous: {
                page: 0,
                limit: limit
            },
            totalProduct: 0,
            results:{}

        }
        page = parseInt(page)
        limit = parseInt(limit)
        const startIndex = (page - 1) * limit
        const endIndex = page * limit
        if(page === 0 || !_id || !page || !limit){
            res.status(400).json({
                message: 'please input all correct parameters'
            })
            return
        }

        result.current = page

        const countDoc = await gallery.countDocuments({userId:_id}).exec();
        console.log(countDoc)

        if(endIndex < countDoc ){
            result.next = {
                page: page + 1,
                limit
            }
        }

        if(startIndex > 0){
            if(startIndex === 1){
                result.previous ={
                    page: 1,
                    limit: limit
                }
            }
            else{
            result.previous ={
                page: page - 1,
                limit: limit
            }
        }
        }

        // const noOfProducts = await gallery.collection.find({userId: _id}).count()
        const noOfProducts = await gallery.collection.countDocuments({userId:_id})
        if(noOfProducts){
            result.totalProduct = noOfProducts
        }


        const results = await gallery.find({userId:_id}).limit(limit).skip(startIndex).exec()
        if(results){
            result.results = results
            res.status(200).json({
                data: result,
                message: 'successfully',
                status: true,
                code: 200
            })
        }
    }
    catch(error:any){
        res.status(500).json({
            mesage: error.message,
            code: 500,
            status: false
        })
    }

}

export default getUserGallery;