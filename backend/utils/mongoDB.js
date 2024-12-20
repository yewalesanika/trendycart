import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGODBURL);
        console.log("MongoDB connected Successfully...")
    } catch (error) {
        console.log("MongoDB error:",error)
    }
}

export default connectDB