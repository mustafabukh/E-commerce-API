const express = require('express')
const Customer = require('../models/customer')
const Seller = require('../models/seller')
const Product = require('../models/product')
const CustomerMsg = require('../models/CustomerMsg')
const auth = require('../middlewares/customerAuth')

const router = new express.Router()

router.post('/customers/signUp' , async (req,res)=>{
    const customer = new Customer(req.body)
    try {
        await customer.save()
        const token = await customer.generateAuthToken()
        res.status(201).send({customer,token})
    } catch (e) {
        res.status(400).send(e.toString())
    } 
})
router.post('/customers/logIn', async (req,res)=>{
    try {
        const user = await Customer.findByCredentials(req.body.id,req.body.password)
        const token = await user.generateAuthToken()
        res.status(201).send({user,token})
    } catch (e) {
        res.status(400).send(e.toString())
    }
})


router.post('/customers/msg' , auth, async(req,res)=>{
    try {
        const customer = req.customer
        console.log(req.body.id)
        const seller = await Seller.findById(req.body.id)
        if(!customer){
            throw new Error('not autherized')
        }
        if(!seller){
            throw new Error('user not found')
        }
        const message = new CustomerMsg({sender:customer._id,receiver:seller._id,text:req.body.text})
        await message.save()
        res.status(200).send('sent!')
    } catch (e) {
        res.status(400).send(e.toString())
    }
})
router.get('/customers/inmsgs' , auth, async (req,res)=>{
    try {
        if(!req.customer){
            throw new Error('user not found')
        }
        const customer = await req.customer.populate('inMessages')
        //console.log(customer)
        res.status(300).send(customer.inMessages)
    } catch (e) {
        res.status(400).send(e.toString())
    }
})
router.get('/customers/outmsgs' , auth, async (req,res)=>{
    try {
        if(!req.customer){
            throw new Error('user not found')
        }
        const customer = await req.customer.populate('outMessages')
        //console.log(customer)
        res.status(300).send(customer.outMessages)
    } catch (e) {
        res.status(400).send(e.toString())
    }
})


module.exports = router