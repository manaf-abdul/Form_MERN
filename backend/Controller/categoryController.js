import asyncHandler from "express-async-handler";
import Category from "../models/CategoryModel.js";

// @desc    Get all categories
// @route   GET /api/users/category
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
    const category = await Category.find({})
    res.json(category)
  })


export {getCategories}