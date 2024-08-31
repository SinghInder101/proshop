import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';


//@desc Auth user & get token
//@ post /api/users/login
//@access Public

const authUser = asyncHandler(async(req,res) => {
    const{email,password} = req.body;

    const user = await User.findOne({email})

    if(user && (await user.matchPassword(password))){
        generateToken(res, user._id)
       
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin
        })
    }
    else{
        res.status(401);
        throw new Error('Invalid email or password'); 
    }
   

});
//@desc Register
//@ POST /api/users
//@access Public

const registerUser = asyncHandler(async(req,res) => {

    const {name,email,password} = req.body;

    const userExists = await User.findOne({email});

    if(userExists){
        res.status(400);
        throw new Error('User already exists');

    }

    const user = await User.create({
        name,
        email,
        password
    })

    if(user){
        generateToken(res, user._id)
        res.status(201).json({
            _id:user._id,
            name: user.name,
            email:user.email,
            isAdmin: user.isAdmin
        })
    }else{
        res.status(400);
        throw new Error('Invalid user data')
    }



   
       
});

//@desc Logout user / clear cookie
//@ POST /api/users/logout
//@access private

const logoutUser = asyncHandler(async(req,res) => {
    res.cookie('jwt','',{
        httpOnly:true,
        expires: new Date(0)
    });
    res.status(200).json({message:'logged out succesfully'});
});

//@desc Get user profile
//@ GET /api/users/logout
//@access private
    
const getUserProfile = asyncHandler(async(req,res) => {
    
    const user = await User.findById(req.user._id);

    if(user) {
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
        })
    }
    else{
        res.status(404);
        throw new Error('User Not Found')
    }
       
});

//@desc update user profile
//@ PUT /api/users/logout
//@access private
    
const updateUserProfile = asyncHandler(async(req,res) => {

    const user = await User.findById(req.user._id);

    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email

        if(req.body.password){
            user.password = req.body.password
        }

        const updatedUser = await user.save();
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin:updatedUser.email
            
        })

    }
    else {
        res.status(404);
        throw new Error('User Not Found');
    }


 
       
});

//@desc  get users
//@ GET /api/users
//@access private/admin
    
const getUsers = asyncHandler(async(req,res) => {
    res.send(' get users');
       
});
//@desc  get user by ID
//@ GET /api/users/:ID
//@access private/admin
    
const getUserByID = asyncHandler(async(req,res) => {
    res.send(' get user by id');
       
});

//@desc  get user profile
//@ GET /api/users/:id
//@access private/Admin

const deleteUser = asyncHandler(async(req,res) => {
    res.send(' delete users');
       
});

//@desc  Update user 
//@ PUT /api/users/:id
//@access private/Admin

const updateUser = asyncHandler(async(req,res) => {
    res.send(' update user');
       
});

export {
    authUser,
    registerUser,
    logoutUser,
    getUserByID,
    getUserProfile,
    deleteUser,
    getUsers,
    updateUser,
    updateUserProfile
}