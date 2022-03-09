const express = require('express')
const Product = require('../models/product')
const sellerAuth = require('../middlewares/sellerAuth')

const router = new express.Router()

router.post('/sellers/products/add',sellerAuth,async (req,res)=>{
    try {
        const product = new Product({
            ...req.body,
            seller:req.seller._id
        })
        await product.save()
        res.status(201).send(product)

    } catch (e) {
        res.status(400).send(e)
    }
    
})

router.get('/sellers/products/getall',sellerAuth,async (req,res)=>{
    try {
        const id = req.seller._id
        await req.seller.populate('products')
        res.status(200).send(req.seller.products)
    } catch (e) {
        res.status(400).send(e.toString())
    }
    
})

router.delete('/sellers/products/delete/:id',sellerAuth,async (req,res)=>{
    try {
        const product = await Product.findOneAndDelete({_id:req.params.id,author:req.seller._id})
        res.status(200).send(product)
    } catch (e) {
        res.status(404).send(e)
    }
})

router.patch('/sellers/products/update/:id',sellerAuth,async (req,res)=>{
    allowed = ['name','description','price','stock','categoty']
    const product = await Product.findById(req.params.id)
    if(!product){
        res.status(404).send('product not found!')
    }
    const updates = Object.keys(req.body)
    const valid = updates.every((update)=>{
        return allowed.includes(update)
    })
    if(!valid){
        res.status(400).send('not allowed!')
    }
    try {
        updates.forEach((update)=> product[update] = req.body[update])
        await product.save()
        res.status(200).send(product)

    } catch (e) {
        res.status(400).send(e.toString())
    }

})



module.exports = router