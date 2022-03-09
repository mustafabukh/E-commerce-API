const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const SellerMsg = require('../models/sellerMsg')
const Customer = require('../models/customer')

// const Product = require ('./product')
const userSchema = require('../schemas/user')
userSchema.set('toJSON',{virtuals:true})
userSchema.set('toObject',{virtuals:true})

userSchema.virtual('products',{
    ref:'Product',
    localField:'_id',
    foreignField:'seller'
})

userSchema.virtual('inMessages',{
    ref: 'CustomerMsg',
    localField: '_id',
    foreignField: 'receiver',
})
userSchema.virtual('ouMessages',{
    ref:'sellerMsg',
    localField:'_id',
    foreignField:'sender'
})
//MongoNetworkError: connect ECONNREFUSED 127.0.0.1:27017 at connectionFailureError done

userSchema.statics.findByCredentials = async (id,password)=>{
    const user = await Seller.findOne({email:id})
    if(!user){
        throw new Error('Login Failed')
    }
    const match = bcrypt.compare(password,user.password)
    if(!match){
        console.log(password)
        throw new Error('Login Failed')
    }
    return user
}

userSchema.methods.generateAuthToken = async function (){
    const user = this
    const userID = user._id.toString()
    const token = jwt.sign({_id:userID},'EcommerceAppSecKey',{expiresIn:'3 days'})
    user.tokens = user.tokens.concat({token})
    await user.save()
    // const decoded = jwt.decode(token,'EcommerceAppSecKey')
    // console.log(decoded)
    return token
}
userSchema.methods.sendmsg = async (id,text)=>{
    const seller = this
    const customer = await Customer.findById(id)
    if(!customer){
        throw new Error('user not found')
    }
    const message = new SellerMsg({sender:seller._id,reciver:customer._id,text})
    // message.sender = seller._id
    // message.reciver = customer._id
    // message.text = text
    await message.save()
}


userSchema.pre('save',async function (next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }
    next()
})

const Seller = mongoose.model('Seller',userSchema)

module.exports = Seller