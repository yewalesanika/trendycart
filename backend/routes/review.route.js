import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { addreview, deletereview } from "../controllers/review.controller.js";

const router = express.Router({ mergeParams: true });

router.route("/").post(isAuthenticated,addreview);
router.route("/:reviewId").delete(isAuthenticated,deletereview)

export default router;