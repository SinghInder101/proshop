import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import jwt  from 'jsonwebtoken';


//@desc Auth user & get token
//@ post /api/users/login
//@access Public

const authUser = asyncHandler(async(req,res) => {
    const{email,password} = req.body;

    const user = await User.findOne({email})

    if(user && (await user.matchPassword(password))){
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {
            expiresIn: '30d'
        })

        //Set hwt as HTTP-only cookie
        res.cookie('jwt',token, {
            httpOnly:true,
            secure:process.env.NODE_ENV !== 'development',
            sameSite:'strict',
            maxAge:30*24*60*60*1000 //30DAYS

        })
        res.json({
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
    res.send('register user');
       
});

//@desc Logout user / clear cookie
//@ POST /api/users/logout
//@access private

const logoutUser = asyncHandler(async(req,res) => {
    res.send('logout user');
       
});

//@desc Get user profile
//@ GET /api/users/logout
//@access private
    
const getUserProfile = asyncHandler(async(req,res) => {
    res.send(' get user profile');
       
});

//@desc update user profile
//@ PUT /api/users/logout
//@access private
    
const updateUserProfile = asyncHandler(async(req,res) => {
    res.send(' update user profile');
       
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