import { Product } from "../models/product.model.js";
import { Cart } from "../models/cart.model.js";

export const addtocart = async (req, res) => {
    try {
        const userId = req.id;
        const { productId } = req.params;
        const {quantity} = req.body;

        const product = await Product.findOne({ _id: productId });

        if (!product) {
            return res.status(400).json({
                message: "Product not found",
                success: false,
            });
        }

        let cart = await Cart.findOne({ buyer: userId });

        if (!cart) {
            cart = await Cart.create({
                buyer: userId,
                items: [
                    {
                        product: productId,
                        quantity: quantity,
                    },
                ],
                totalPrice: product.price * quantity, 
            });
        } else {
            const existingItem = cart.items.find(
                (item) => item.product.toString() === productId
            );
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.items.push({
                    product: productId,
                    quantity: quantity,
                });
            }
            cart.totalPrice += product.price * quantity;
            await cart.save();
        }

        res.status(200).json({
            message:"Product added to cart",
            success:true
        })
    } catch (error) {
        console.log("add to cart:", error);
    }
};

export const getcartproducts = async (req,res) =>{
    try {
        const {userId} = req.params;

        const cartProduct = await Cart.find({buyer:userId})
        .populate({
            path: "items.product", 
            select: "name price description brand", 
        });

        console.log(JSON.stringify(cartProduct,"",3));

        res.status(200).json({
            cart : cartProduct,
            success:true,
        })
    } catch (error) {
        console.log("get cart products:",error);
    }
}

export const deletecartproduct = async (req,res) =>{
    try {
        const { cartId, itemId } = req.params;

        const cart = await Cart.findById(cartId);
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const item = cart.items.find(item => item._id.toString() === itemId);
        if (!item) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        item.quantity -= 1;

        if (item.quantity <= 0) {
            cart.items = cart.items.filter(item => item._id.toString() !== itemId);
        }

        cart.totalPrice = cart.items.reduce((total, item) => {
            const itemTotal = item.product?.price * item.quantity;
            return total + (isNaN(itemTotal) ? 0 : itemTotal);
        }, 0);

        // Save the updated cart
        await cart.save();

        return res.status(200).json({ message: 'Item quantity updated successfully', cart });
    }  catch (error) {
        console.log("delete cart product",error);
    }
}