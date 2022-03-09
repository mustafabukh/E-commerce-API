const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        default:''
    },
    seller:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Seller',
        required:true
    },
    price:{
        type:mongoose.SchemaTypes.Decimal128,
        required:true
    },
    rating:{
        type:Number,
        default:0,
        max:5,
        min:0
    },
    categoty:{
        type:String,
        required:true,
        default:'Others'
    },
    date:{
        type:Date,
        required:true,
        default:Date.now
    },
    stock:{
        type:Number,
        require:true,
        min:0
    },
    image:{
        type:Buffer,
        default:undefined
    }
    
},{ toJSON: { virtuals: true } ,toJSON: { virtuals: true }})

module.exports = productSchema