const express = require('express')
const Seller = require('../models/seller')
const Customer = require('../models/customer')
const Product = require('../models/product')
const SellerMsg = require('../models/sellerMsg')
const sellerAuth = require('../middlewares/sellerAuth')

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
router.delete('/sellers/delete' , sellerAuth, async(req,res)=>{
    try {
        //remove seller's product before delete the seller account
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
router.post('/sellers/sendmsg' , sellerAuth, async(req,res)=>{
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
        await message.save()
        res.status(200).send('sent!')
    } catch (e) {
        res.status(400).send(e.toString())
    }
})
router.get('/sellers/getinmsgs' , sellerAuth, async (req,res)=>{
    try {
        const id = req.seller._id
        const seller = await Seller.findById(id).populate('inMessages')
        res.status(100).send(seller.inMessages)
    } catch (e) {
        res.status(400).send(e.toString())
    }
})
router.get('/sellers/getoutmsgs' , sellerAuth, async (req,res)=>{
    try {
        const id = req.seller._id
        const seller = await Seller.findById(id).populate('outMessages')
        res.status(100).send(seller.outMessages)
    } catch (e) {
        res.status(400).send(e.toString())
    }
})


// add getting out message endpoint

module.exports = router