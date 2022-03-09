const validator = require('validator')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        required:true,
        type:String,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Your Email is invalide')
            }
        },
        unique:true
    },
    phoneNumber:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isMobilePhone(value)){
                throw new Error('Your Phone Number Is Invalide')
            }
        },
        unique:true
    },
    password:{
        required:true,
        type:String,
        trim:true,
        minlength:8,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('password cannot contain " password" !')
            }
        }
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
}, { toJSON: { virtuals: true } ,toJSON: { virtuals: true }})

module.exports = userSchema