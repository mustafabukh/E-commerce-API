const express = require('express')
const Seller = require('../models/seller')
const Product = require('../models/product')
const Customer = require('../models/customer')
const sellerAuth = require('../middlewares/sellerAuth')
const SellerMsg = require('../models/sellerMsg')

const router = new express.Router()

router.post('/sellers/signUp',async(req,res)=>{
    const seller = new Seller(req.body)
    try {
        await seller.save()
        const token = await seller.generateAuthToken()
        res.status(201).send({seller,token})
    } catch (e) {
        res.status(400).send(e)
    }
    
})
router.post('/sellers/logIn', async (req,res)=>{
    try {
        const user = await Seller.findByCredentials(req.body.id,req.body.password)
        const token = await user.generateAuthToken()
        res.status(201).send({user,token})
    } catch (e) {
        res.status(400).send(e.toString())
    }
})

router.post('/sellers/logOut',sellerAuth, async(req,res)=>{
    try {
        req.seller.tokens = req.seller.tokens.filter((token)=> token.token != req.token)
        await req.seller.save()
        res.send()
    } catch (e) {
        res.status(400).send(e)
    }
})
router.post('/sellers/logOutAll', sellerAuth, async (req,res)=>{
    try {
        req.seller.tokens = []
        await req.seller.save()
        res.send()
    } catch (e) {
        res.status(500).send(e)
    }
})
router.delete('/sellers' , sellerAuth, async(req,res)=>{
    try {
        await req.seller.remove()
        res.send('Done!')
    } catch (e) {
        res.status(400).send(e)
    }
})
router.patch('/sellers/account',sellerAuth, async(req,res)=>{
    const allowedUpdates = ['phoneNumber','email','password']
    const toUpdate = Object.keys(req.body)
    const valid = toUpdate.every((update)=>{
        return allowedUpdates.includes(update)
    })
    if(!valid){
        res.status(400).send('not allowed')
    }
    try {
        toUpdate.forEach((update)=> req.seller[update] = req.body[update])
        await req.seller.save()
        res.status(200).send('done!')
    } catch (e) {
        res.status(400).send(e)
    }
})
router.post('/sellers/msg' , sellerAuth, async(req,res)=>{
    try {
        const customer = await Customer.findById(req.body.id)
        const seller = req.seller
        if(!customer){
            throw new Error('user not found')
        }
        if(!seller){
            throw new Error('user sender not found')
        }
        const message = new SellerMsg({sender:seller._id,receiver:customer._id,text:req.body.text})
        // const seller = req.seller
        // const id = req.body.id
        // console.log(id)
        // const text = req.body.text
        // seller.sendmsg(id,text)
        await message.save()
        res.status(200).send('sent!')
    } catch (e) {
        res.status(400).send(e.toString())
    }
})
router.get('/sellers/msg' , sellerAuth, async (req,res)=>{
    try {
        const id = req.seller._id
        console.log(id)
        const seller = await Seller.findById(id).populate('inMessages')
        console.log(seller.inMessages)
        res.status(100).send(seller.inMessages)
        // if(!seller){
        //     throw new Error('user not found')
        // }
        // console.log(seller)
        // await seller.populate('inMessages','text')
        // console.log(JSON.stringify(seller.messages))
        // console.log(seller.messages.toObject({ virtuals: true }).toJSON({ virtuals: true }))
        // res.status(100).send(seller.messages[0].text)
    } catch (e) {
        res.status(400).send(e.toString())
    }
})

module.exports = router