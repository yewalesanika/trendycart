import { Product } from "../models/product.model.js"
import { Category } from "../models/category.model.js";
import { User } from "../models/user.model.js";

export const addproduct = async(req,res)=>{
    try {
        const {name,description,price,brand,quantity,category} = req.body;
        const userId = req.id;

        const user = await User.findOne({_id:userId});


        if(user.role != "seller")
        {
            return res.status(400).json({
                message:"You are not a seller",
                success:false,
            })
        }

        if(!name || !description || !price || !brand || !quantity || !category)
        {
            return res.status(400).json({
                message:"Someting is missing",
                success:false,
            })
        }

        const findCategory = await Category.findOne({ categoryname: category });

        if(!findCategory){
            return res.status(400).json({
                message:"No such category found",
                success:false,
            })
        }

        //console.log({name,description,price,brand,quantity,category:findCategory._id,seller:user._id})

        Product.create({name,description,price,brand,quantity,category:findCategory._id,seller:user._id});

        res.status(200).json({
            message:"Product Created Successfully",
            success:true,
        })
    } catch (error) {
        console.log("add product",error);
    }
}

export const updateproduct = async(req,res)=>{
    try {
        const {name,description,price,brand,quantity} = req.body;
        const { productId } = req.params;
        const userId = req.id;

        const product = await Product.findOne({_id:productId});

        if(!product){
            return res.status(400).json({
                message:"Such product is not available",
                success:false
            })
        }

        if(userId!=product.seller)
        {
            return res.status(400).json({
                message:"You are not owner of this product",
                success:false,
            })
        }

        const updateData = {
            name,
            description,
            price,
            brand,
            quantity,
        }

        await Product.findByIdAndUpdate(productId,updateData,{new:true});

        res.status(200).json({
            message:"Product updated successfully",
            success:true
        })

    } catch (error) {
        console.log("edit product",error);
    }
}

export const deleteproduct = async(req,res)=>{
    try {
        const { productId } = req.params;
        const userId = req.id;

        const product = await Product.findOne({_id:productId});

        if(!product){
            return res.status(400).json({
                message:"Such product is not available",
                success:false
            })
        }

        if(userId!=product.seller)
        {
            return res.status(400).json({
                message:"You are not owner of this product",
                success:false,
            })
        }

        await Product.findByIdAndDelete({_id:productId});

        res.status(200).json({
            message:"Product deleted successfully",
            success:true
        })
    } catch (error) {
        console.log("delete product",error);
    }
}