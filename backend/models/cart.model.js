import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema(
    {
        buyer: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        items: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: "Product", 
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true, 
                    min: 1, 
                },
            },
        ],
        totalPrice: {
            type: Number,
            required: true,
            default: 0, // To be calculated
        },
    },
    { timestamps: true }
);

// cartSchema.pre('save', function(next) {
//     let total = 0;
//     this.items.forEach(item => {
//         total += item.quantity * item.product.price; // Assuming each product has a 'price' field
//     });
//     this.totalPrice = total;
//     next();
// });

export const Cart = mongoose.model("Cart", cartSchema);
