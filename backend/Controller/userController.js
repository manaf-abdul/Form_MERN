import asyncHandler from "express-async-handler";
import User from '../models/UserModel.js';
import moment from 'moment'

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    console.log(req.body)
    const { name, mobile, email, jobType, location, DOB } = req.body;
    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }
    // console.log(typeof value)
    // console.log(typeof moment(value).format('DD-MM-YYYY'))
    const myCloud=await cloudinary.v2.uploader.upload(req.body.image,{
        folder:"users",
        width:150,
        crop:"Scale"
    })

    const user = await User.create({
        name,
        mobile,
        email,
        jobType,
        location,
        DOB: moment(DOB).format('DD-MM-YYYY'),
        image:{
            public_id:myCloud.public._id,
            url:myCloud.secure_url
        }
    })
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            mobile: user.mobile,
            jobType: user.jobType,
            location: user.location,
            DOB: user.DOB,
            image: user.image,
        })
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
})

// @desc    Get all users
// @route   GET /api/users/userList
// @access  Public
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.json(users)
})

// @desc    delete a user
// @route   DELETE /api/users/:id
// @access  Public
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
        await user.remove()
        res.json({ message: 'User Removed' })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})



export { registerUser, getUsers, deleteUser }