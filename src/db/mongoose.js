const mongoose = require('mongoose')
require('dotenv').config();
console.log(process.env.LOCALMONGO)
const connectionURL = process.env.LOCALMONGO

mongoose.connect(connectionURL,{ useNewUrlParser: true })
