import express from 'express';
import asyncHandler from 'express-async-handler'
import {getProducts,getProductById} from '../controller/productController.js';


const router = express.Router()
import Product from '../models/productModel.js';

//@desc  Fetch all products 
//@route GET /api/products
//@access Public
// router.get('/',asyncHandler(async (req, res)=>{
//     const products=await Product.find({})

//     res.json(products)
// }))
router.route('/').get(getProducts)

//@desc  Fetch single product 
//@route GET /api/product/:id
//@access Public
// router.get('/:id',asyncHandler(async(req, res)=>{
    
//     const product=await Product.findById(req.params.id)
//     console.log("in id",product);
//     if(product){
//     res.json(product)
//     }else{
//         res.status(404).json({message: 'Product not found'})
//     }
// }))
router.route('/:id').get(getProductById)

export default router;