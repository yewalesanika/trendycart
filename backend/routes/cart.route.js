import express from "express"
import { addtocart, deletecartproduct, getcartproducts } from "../controllers/cart.controller.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/addtocart/:productId").post(isAuthenticated,addtocart);
router.route("/getcartproducts/:userId").get(isAuthenticated,getcartproducts);
router.route("/deleteproduct/:cartId/:itemId").delete(isAuthenticated,deletecartproduct);

export default router