import { User } from "../models/user.model.js";

export const updateprofile = async (req, res) => {
    try {
        const userId = req.id;
        const paramId = req.params.id; 

        if (userId !== paramId) {
            return res.status(403).json({
                message: "You are not authorized to update this profile.",
                success: false,
            });
        }

        const { fullname, email, phonenumber, address } = req.body;

        if (!fullname || !email || !phonenumber || !address) {
            return res.status(400).json({
                message: "All fields are required.",
                success: false,
            });
        }

        const seller = await User.findById(userId);

        if (!seller) {
            return res.status(404).json({
                message: "Seller not found.",
                success: false,
            });
        }

        const updatedSeller = await User.findByIdAndUpdate(
            userId,
            { fullname, email, phonenumber, address },
            { new: true }
        );

        return res.status(200).json({
            message: "Profile updated successfully.",
            success: true,
            user: updatedSeller,
        });
    } catch (error) {
        console.error("Error updating seller profile:", error);
    }
};

export const deleteprofile = async (req, res) => {
    try {
        const { userId } = req.params;
        console.log(userId)
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found.",
                success: false,
            });
        }
        if (req.id !== userId) {
            return res.status(403).json({
                message: "Unauthorized access to delete this account.",
                success: false,
            });
        }

        await User.findByIdAndDelete(userId);

        return res.status(200).json({
            message: "Account deleted successfully.",
            success: true,
        });
    } catch (error) {
        console.error("Error deleting profile:", error);
    }
};
