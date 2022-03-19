import asyncHandler from "express-async-handler";
import Category from "../models/CategoryModel.js";
import User from '../models/UserModel.js';

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    console.log(req.body)
    const {name,mobile,email,jobType,location,DOB,image}=req.body;
    const userExists = await User.findOne({ email })
    const category=await Category.find()

    if (userExists) {
      res.status(400)
      throw new Error('User already exists')
    }

    const user=await User.create({
        name,
        mobile,
        email,
        jobType,
        location,
        DOB,
        image
    })
    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            mobile:user.mobile,
            jobType:user.jobType,
            location:user.location,
            DOB:user.DOB,
            image:user.image,
        })
    }else{
        res.status(400);
        throw new Error('Invalid user data');
    }
})

// @desc    Register a new user
// @route   POST /api/userList
// @access  Public
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.json(users)
  })

export {registerUser,getUsers}