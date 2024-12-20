import express from "express"
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { deleteprofile, updateprofile } from "../controllers/profile.controller.js";

const router = express.Router();

router.route("/updateprofile/:paramId").patch(isAuthenticated,updateprofile);;
router.route("/deleteprofile/:userId").delete(isAuthenticated,deleteprofile);

export default router