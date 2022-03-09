const mongoose = require('mongoose')

const costumerMsgSchema = new mongoose.Schema({
    sender:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Customer',
        required:true
    },
    receiver:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Seller',
        required:true
    },
    text:{
        type:String
    }
})

module.exports = costumerMsgSchema