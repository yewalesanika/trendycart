import { Product } from "../models/product.model.js";
import { Review } from "../models/review.model.js";

export const addreview = async (req, res) => {
    try {
        const userId = req.id;
        const { productId } = req.params;

        const { comment, rating } = req.body;

        const product = await Product.findOne({ _id: productId });
        if (!product) {
            res.status(200).json({
                message: "No Product found",
                success: false,
            });
        }

        const newReview = new Review({
            comment,
            rating,
            buyer: userId,
        });

        const savedReview = await newReview.save();

        product.review.push(savedReview._id);
        await product.save();

        res.status(200).json({
            message: "Review created successfully",
            success: true,
        });
    } catch (error) {
        console.log("Add review error", error);
    }
};

export const deletereview = async (req, res) => {
    try {
        const userId = req.id;
        const { reviewId } = req.params;
        const { productId } = req.params;

        const review = await Review.findOne({ _id: reviewId });
        if (userId != review.buyer) {
            return res.status(400).json({
                message: "You are not author to delete this review",
                success: false,
            });
        }

        await Product.findByIdAndUpdate(productId, { $pull: { review: reviewId } });
        await Review.findByIdAndDelete(reviewId);

        res.status(400).json({
            message: "Review deleted successfully",
            success: true,
        });
    } catch (error) {
        console.log("delete review error", error);
    }
};
