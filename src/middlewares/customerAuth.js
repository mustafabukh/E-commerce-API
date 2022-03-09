const Customer = require('../models/customer')
const jwt = require('jsonwebtoken')
const secKey = 'EcommerceAppSecKey'
const auth = async (req,res,next)=>{
    try {
        const token = req.header('Authorization').replace('Bearer ','')
        const decodedToken = jwt.decode(token,secKey)
        const customer = await Customer.findOne({_id:decodedToken._id,'tokens.token':token})
        if(!customer){
            throw new Error()
        }
        req.customer = customer
        req.token = token
        next()
    } catch (e) {
        res.status(400).send('Authetication error!')
    }
}

module.exports = auth