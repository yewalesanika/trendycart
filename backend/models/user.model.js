import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    fullname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    role : {
        type : String,
        enum : ['buyer','seller','admin'],
        required : true
    },
    phonenumber:{
        type:Number,
    },
    address:[
        {
            street: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            pincode: { type: String, required: true },
            country: { type: String, required: true },
        }
    ]
},{timestamps:true})

export const User = mongoose.model("User",userSchema)


