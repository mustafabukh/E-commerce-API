const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const userSchema = require('../schemas/user')
userSchema.set('toJSON',{virtuals:true})
userSchema.set('toObject',{virtuals:true})

userSchema.virtual('inMessages',{
    ref:'SellerMsg',
    localField:'_id',
    foreignField:'receiver'
})
userSchema.virtual('outMessages',{
    ref:'CustomerMsg',
    localField:'_id',
    foreignField:'sender'
})
userSchema.virtual('orders',{
    ref:'Order',
    localField:'_id',
    foreignField:'customer'
})


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

userSchema.statics.findByCredentials = async (id,password)=>{
    const user = await Customer.findOne({email:id})
    if(!user){
        throw new Error('Login Failed!')
    }
    const match = await bcrypt.compare(password,user.password)
    if(!match){
        throw new Error('Login Failed!')
    }
    return user

}
userSchema.pre('save',async function (next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }
    next()
})

const Customer = mongoose.model('Customer',userSchema)

module.exports = Customer