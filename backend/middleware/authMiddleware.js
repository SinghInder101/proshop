import jwt from "jsonwebtoken"
import asyncHandler from "./asyncHandler.js"
import User from '../models/userModel.js'


//Protect routes

export const protect = asyncHandler(async (req,res,next) => {
    let token;

    token = req.cookies.jwt;
    console.log(req.cookies.jwt);

    if(token) {
        try {
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            req.user = await User.findById(decoded.userId).select('-password');
            next();
            
        } catch (error) {
            res.status(401);
            throw new Error('Not authorized,token failed')
        }

    } else {
        res.status(401)
        throw new Error('Not authorized,no token')
    }

})

export const admin = asyncHandler((req,res,next) => {

    if(req.user && req.user.isAdmin){
        next();
    }
    else {
        res.status(401);
        throw new Error('Not authorized as admin');
    }


})