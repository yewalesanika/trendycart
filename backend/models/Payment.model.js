import mongoose, { Schema } from "mongoose";

const paymentSchema = new Schema(
    {
        status: {
            type: String,
            enum: ["pending", "paid", "failed"], // Add more statuses as needed
            default: "pending", // Default payment status
        },
        method: {
            type: String, // Payment method, e.g., credit card, PayPal
            required: true,
        },
        transactionId: {
            type: String, // External payment provider's transaction ID
            unique: true, // Ensure each transaction ID is unique
        },
        order: {
            type: Schema.Types.ObjectId,
            ref: "Order",
            required: true, // Ensure the payment is linked to an order
        },
    },
    { timestamps: true }
);

export const Payment = mongoose.model("Payment", paymentSchema);
