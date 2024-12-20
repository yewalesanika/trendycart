import express from "express"
import { addcategory, deleteCategory, updatecategory } from "../controllers/admin.controller.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/addcategory").post(isAuthenticated,addcategory);
router.route("/updatecategory/:categoryId").put(isAuthenticated,updatecategory);
router.route("/deletecategory/:categoryId").delete(isAuthenticated,deleteCategory);

export default router