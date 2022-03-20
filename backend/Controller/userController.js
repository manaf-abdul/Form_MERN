import asyncHandler from "express-async-handler";
import User from '../models/UserModel.js';
import moment from 'moment'
import cloudinary from 'cloudinary'                                                                                                                                                                     

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    // console.log(req.files)
    // console.log(req.body)
    const { name, mobile, email, category, location, DOB } = req.body;
    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }
    // console.log(typeof value)
    // console.log(typeof moment(value).format('DD-MM-YYYY'))
    try {

    const myCloud=await cloudinary.uploader.upload(req.body.avatar,{
        folder:"users",
    })
    console.log(myCloud)

      
    const user = await User.create({
        name,
        mobile,
        email,
        jobType:category,
        location,
        DOB: moment(DOB).format('DD-MM-YYYY'),
        image:{
            public_id:myCloud.public_id,
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
        
    } catch (error) {
        console.log(error)
        throw new Error(error)
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

// @desc    Get user by id
// @route   GET /api/users/:id
// @access  Public
const getUserDetailsById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if(user){
    res.json(user)
    } else{
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc    Update user by id
// @route   PUT /api/users/:id
// @access  Public
const updateUser = asyncHandler(async (req, res) => {
    const { name, mobile, email, category, location, DOB } = req.body;
    const newUserData = {
        name,
        mobile,
        email,
        jobType:category,
        location,
        DOB: moment(DOB).format('DD-MM-YYYY'),
    }
    if (req.body.avatar !== "") {
        const user = await User.findById(req.params.id);
    
        const image_id = user.image.public_id;
        const res = await cloudinary.uploader.destroy(image_id);
    
        const result = await cloudinary.uploader.upload(req.body.avatar, {
          folder: "users",
        });
    
        newUserData.image = {
          public_id: result.public_id,
          url: result.secure_url,
        };
      }
      const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });
    
      res.status(200).json({
        success: true,
      });

})


export { registerUser, getUsers, deleteUser,getUserDetailsById,updateUser }