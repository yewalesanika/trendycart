import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { addproduct, deleteproduct, updateproduct,  } from "../controllers/product.controller.js";

const router = express.Router();

router.route("/addproduct").post(isAuthenticated,addproduct);
router.route("/updateproduct/:productId").put(isAuthenticated,updateproduct);
router.route("/deleteproduct/:productId").delete(isAuthenticated,deleteproduct);

export default router