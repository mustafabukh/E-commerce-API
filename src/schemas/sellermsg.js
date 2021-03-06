const mongoose = require('mongoose')

const sellerMsgSchema = new mongoose.Schema({
    date:{
        type:Date,
        required:true,
        default:Date.now
    },
    sender:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Seller',
        required:true
    },
    receiver:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Customer',
        required:true
    },
    text:{
        type:String
    }
})

module.exports = sellerMsgSchema