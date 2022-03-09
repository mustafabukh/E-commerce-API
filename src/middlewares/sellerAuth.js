const Seller = require('../models/seller')
const jwt = require('jsonwebtoken')
const secKey = 'EcommerceAppSecKey'
const auth = async (req,res,next)=>{
    try {
        const token = req.header('Authorization').replace('Bearer ','')
        const decodedToken = jwt.decode(token,secKey)
        const seller = await Seller.findOne({_id:decodedToken._id,'tokens.token':token})
        if(!seller){
            throw new Error()
        }
        req.seller = seller
        req.token = token
        next()
    } catch (e) {
        res.status(400).send('Authetication error!')
    }
}

module.exports = auth