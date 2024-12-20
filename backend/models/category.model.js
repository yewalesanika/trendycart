import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
    categoryname: {
        type: String,
        required: true,
        unique: true, 
    },
    categorydescription: {
        type: String, 
        required:true,
    },
    admin:{
        type: Schema.Types.ObjectId,
        ref: "User",
    }
},{timestamps:true})

export const Category = mongoose.model("Category",categorySchema)