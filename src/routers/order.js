const express = require('express')
const Seller = require('../models/seller')
const Order = require('../models/order')
const Customer = require('../models/customer')
const customerAuth = require('../middlewares/customerAuth')

const router = new express.Router()

router.post('/customers/addorder',customerAuth,async (req,res)=>{
    try {
        const order = new Order({
            ...req.body,
            customer:req.customer._id
        })
        await order.save()
        res.status(201).send(order)

    } catch (e) {
        res.status(400).send(e.toString())
    }
    
})

router.get('/customers/alloreders',customerAuth,async (req,res)=>{
    try {
        await req.customer.populate('orders')
        res.status(200).send(req.customer.orders)
    } catch (e) {
        res.status(400).send(e.toString())
    }
    
})

router.delete('/customers/deleteorder/:id',customerAuth,async (req,res)=>{
    try {
        const order = await Order.findOneAndDelete({_id:req.params.id,customer:req.customer._id})
        res.status(200).send(order)
    } catch (e) {
        res.status(404).send(e)
    }
})


// //customers CURD operations on Orders
// router.post('/customers/neworder',sellerAuth,async (req,res)=>{
    
// })

// router.get('/customers/myorders',sellerAuth,async (req,res)=>{
    
// })

// router.delete('/customers/canceleoreder:id',sellerAuth,async (req,res)=>{
//     //pre for cancelling
// })

module.exports = router
