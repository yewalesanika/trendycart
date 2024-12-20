import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const signup = async(req,res)=>{
    try {
        const {email,fullname,password,role} = req.body;
        if(!email || !fullname || !password || !role)
        {
            return res.status(400).json({
                message:"Some value is missing",
                success:false
            })
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "Account with this email already exists",
                success: false,
            });
        }

        const hashpassword = await bcrypt.hash(password,12); //12 is salt

        await User.create({email,fullname,password:hashpassword,role});

        res.status(200).json({
            message:"Account Created Successfully",
            success:true
        })
    } catch (error) {
        console.log("SignUp error",error)
    }
}

export const login = async(req,res)=>{
    try {
        const {email,password,role} = req.body;
        if(!email || !password || !role)
        {
            return res.status(400).json({
                message:"Something is missing",
                success:false
            })
        }

        let user = await User.findOne({email});

        if(!user)
        {
            return res.status(400).json({
                message:"Incorrect email or passwaord",
                success:false
            })
        }

        if(role!=user.role)
        {
            return res.status(400).json({
                message:"Account dose not exist for current role",
                success:false
            })
        }

        const ispasswordmatch = await bcrypt.compare(password,user.password);
        if(!ispasswordmatch){
            return res.status(400).json({
                message:"Incorrect password",
                success:false
            })
        }

        user={
            userId : user._id,
            email : user.email,
            fullname : user.fullname
        }

        const tokenData = {
            userId : user.userId,
        }

        const token = jwt.sign(tokenData, process.env.JWTTOKENSECRETKEY, { expiresIn: '1d' });

        res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000, httpOnly:true, sameSite:'strict'}).json({
            message:`Welcome to trendycart ${user.fullname}`,
            user,
            success:true
        })
    } catch (error) {
        console.log("Login error",error);
    }
}

export const logout = (req,res) =>{
    try{
        return res.status(200).clearCookie("token").json({
            message:"You have been logged out successfully",
            success:true
        })
    }
    catch(error)
    {
        console.log("Logout error",error)
    }
}