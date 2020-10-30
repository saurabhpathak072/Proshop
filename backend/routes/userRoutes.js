import express from 'express';
import {authUser,getUserProfile,registerUser,updateUserProfile} from '../controller/userController.js';
import {protect} from '../middleware/authMiddleware.js'


const router = express.Router()


//@desc  Fetch all products 
//@route GET /api/products
//@access Public
// router.get('/',asyncHandler(async (req, res)=>{
//     const products=await Product.find({})

//     res.json(products)
// }))
router.route('/').post(registerUser)
router.post('/login',authUser);
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile)


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


export default router;