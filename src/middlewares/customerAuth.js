const Customer = require('../models/customer')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const passCode = process.env.userPassCode
const auth = async (req,res,next)=>{
    try {
        const token = req.header('Authorization').replace('Bearer ','')
        const decodedToken = jwt.decode(token,passCode)
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