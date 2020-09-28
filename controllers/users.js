const asyncHandler = require('../middlewares/async');
const  User  = require('../models/User');
const errorResponse = require('../utils/errorResponse');

//@desc Get all users
//@route GET api/users
//@access Private/Admin
exports.getAllUsers = asyncHandler(async (req, res, next) =>{
    const users = await User.find();
    res.status(200).json({
        success : true,
        data : users
    });
})

//@desc Get single user
//@route GET api/users/:id
//@access Private/Admin
exports.getUser = asyncHandler(async (req, res, next) =>{
    const user = await User.findById(req.params.id);
    if(!user)
    return next(new errorResponse(`Not found user with  id of ${req.params.id}`,404));
    res.status(200).json({
        success : true,
        data: user
    });
})

//@desc Create user
//@route Post api/users
//@access Private/Admin
exports.createUser = asyncHandler(async (req, res, next) =>{
    const user = await User.create(req.body)
    
    res.status(200).json({
        success : true,
        data: user
    });
})

//@desc  Update user
//@route Put api/users/:id
//@access Private/Admin
exports.updateUser = asyncHandler(async (req, res, next) =>{
    let user = await User.findOne({email: req.body.email});
    if(user){
        return next(new errorResponse('This email has already been registred',404))
    }
     user = await User.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
        runValidators: true
    });
    
    res.status(200).json({
        success : true,
        data: user
    });
})

//@desc Delete user
//@route Delete api/users/:id
//@access Private/Admin
exports.deleteUser = asyncHandler(async (req, res, next) =>{
    const user = await User.findByIdAndDelete(req.params.id)
    
    if(!user) return next(new errorResponse(`Not found user id of ${req.params.id}`, 404))
    res.status(200).json({
        success : true,
        data: user
    });
})