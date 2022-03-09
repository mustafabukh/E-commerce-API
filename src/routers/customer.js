const express = require('express')
const Customer = require('../models/customer')
const Seller = require('../models/seller')
const CustomerMsg = require('../models/CustomerMsg')
const Order = require('../models/order')
const customerAuth = require('../middlewares/customerAuth')

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

router.post('/customers/logOut',customerAuth, async(req,res)=>{
    try {
        req.customer.tokens = req.customer.tokens.filter((token)=> token.token != req.token)
        await req.customer.save()
        res.status(200).send()
    } catch (e) {
        res.status(400).send(e)
    }
})
router.post('/customers/logOutAll', customerAuth, async (req,res)=>{
    try {
        req.customer.tokens = []
        await req.customer.save()
        res.status(200).send()
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/customers/delete' , customerAuth, async(req,res)=>{
    try {
        Order.deleteMany({customer:req.customer._id})
        await req.customer.remove()
        res.status(200).send('Done!')
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/customers/logIn', async (req,res)=>{
    try {
        const user = await Customer.findByCredentials(req.body.id,req.body.password)
        const token = await user.generateAuthToken()
        res.status(200).send({user,token})
    } catch (e) {
        res.status(400).send(e.toString())
    }
})

router.patch('/customer/account',customerAuth, async(req,res)=>{
    const allowedUpdates = ['phoneNumber','email','password']
    const toUpdate = Object.keys(req.body)
    const valid = toUpdate.every((update)=>{
        return allowedUpdates.includes(update)
    })
    if(!valid){
        res.status(400).send('not allowed')
    }
    try {
        toUpdate.forEach((update)=> req.customer[update] = req.body[update])
        await req.customer.save()
        res.status(200).send('done!')
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/customers/sendmsg' , customerAuth, async(req,res)=>{
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
router.get('/customers/getinmsgs' , customerAuth, async (req,res)=>{
    try {
        if(!req.customer){
            throw new Error('user not found')
        }
        const customer = await req.customer.populate('inMessages')
        res.status(200).send(customer.inMessages)
    } catch (e) {
        res.status(400).send(e.toString())
    }
})
router.get('/customers/getoutmsgs' , customerAuth, async (req,res)=>{
    try {
        if(!req.customer){
            throw new Error('user not found')
        }
        const customer = await req.customer.populate('outMessages')
        res.status(200).send(customer.outMessages)
    } catch (e) {
        res.status(400).send(e.toString())
    }
})


module.exports = router