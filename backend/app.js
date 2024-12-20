import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/mongoDB.js";
import userRouter from "./routes/user.route.js";
import adminRouter from "./routes/admin.route.js"
import productRouter from "./routes/product.route.js"
import sellerRotuter from "./routes/profile.route.js"
import cartRouter from "./routes/cart.route.js"
import reviewRouter from "./routes/review.route.js"
import cookieParser from "cookie-parser";

const app = express();
dotenv.config({});

const PORT = process.env.PORT || 5000;

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use("/api/t1/user",userRouter);
app.use("/api/t1/admin",adminRouter);
app.use("/api/t1/product",productRouter);
app.use("/api/t1/profile",sellerRotuter);
app.use("/api/t1/cart",cartRouter);
app.use("/api/t1/product/:productId/review",reviewRouter);

app.listen(PORT,()=>{
    console.log(`Sever listening to port ${PORT}`);
    connectDB();
});