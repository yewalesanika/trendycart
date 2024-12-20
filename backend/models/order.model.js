import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
    {
        totalPrice: {
            type: Number,
            required: true, // Ensure total price is always provided
        },
        buyer: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true, // Ensure the buyer reference is required
        },
        products: [
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: "Product",
                    required: true, // Ensure product reference is required
                },
                quantity: {
                    type: Number,
                    required: true, // Ensure quantity is tracked for each product
                    min: 1,
                },
            },
        ],
        payment: {
            type: Schema.Types.ObjectId,
            ref: "Payment", // Link to the payment model
        },
    },
    { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);