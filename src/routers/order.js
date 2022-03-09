const express = require('express')
const Order = require('../models/order')
const customerAuth = require('../middlewares/customerAuth')

const router = new express.Router()

router.post('/customers/orders/add',customerAuth,async (req,res)=>{
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

router.get('/customers/oreders/getall',customerAuth,async (req,res)=>{
    try {
        await req.customer.populate('orders')
        res.status(200).send(req.customer.orders)
    } catch (e) {
        res.status(400).send(e.toString())
    }
    
})

router.delete('/customers/orders/delete/:id',customerAuth,async (req,res)=>{
    try {
        const order = await Order.findOneAndDelete({_id:req.params.id,customer:req.customer._id})
        res.status(200).send(order)
    } catch (e) {
        res.status(404).send(e)
    }
})
module.exports = router
