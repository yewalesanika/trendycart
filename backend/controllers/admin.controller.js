import { Category } from "../models/category.model.js";
import { User } from "../models/user.model.js";

export const addcategory = async (req, res) => {
    try {
        const userId = req.id;
        const { categoryname, categorydescription } = req.body;

        const user = await User.findOne({ _id: userId });

        if (!categoryname || !categorydescription) {
            return res.status(400).json({
                message: "Something is missing",
                success: false,
            })
        }

        if (user.role != "admin") {
            return res.status(400).json({
                message: "You are not admin",
                success: false,
            })
        }
        //console.log({categoryname,categorydescription,admin:userId});
        Category.create({ categoryname, categorydescription, admin: userId });

        res.status(200).json({
            message: "Category created successfully",
            success: true,
        })


    } catch (error) {
        console.log("Add category", error);
    }
}

export const updatecategory = async (req, res) => {
    try {
        const { categoryname, categorydescription } = req.body;
        const userId = req.id;
        const { categoryId } = req.params;

        const category = await Category.findById(categoryId);

        if (!category) {
            return res.status(200).json({
                message: "No Such Category Found",
                success: false
            })
        }

        if (category.admin.toString() !== userId) {
            return res.status(403).json({
                message: "You are not authorized to update this category",
                success: false,
            });
        }

        const updataData = {
            categoryname,
            categorydescription
        }

        await Category.findByIdAndUpdate(categoryId, updataData, { new: true });

        res.status(200).json({
            message: "Category Updated Successfully",
            success: true
        })

    } catch (error) {
        console.log("Update error ", error);
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const userId = req.id;
        const { categoryId } = req.params;

        const category = await Category.findById(categoryId);

        if (!category) {
            return res.status(404).json({
                message: "No such category found",
                success: false
            });
        }

        if (category.admin.toString() !== userId) {
            return res.status(403).json({
                message: "You are not authorized to delete this category",
                success: false
            });
        }

        await Category.findByIdAndDelete(categoryId);

        res.status(200).json({
            message: "Category deleted successfully",
            success: true
        });

    } catch (error) {
        console.log("Category Delete ",error);
    }
}