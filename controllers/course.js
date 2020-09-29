const path = require('path')
const asyncHandler = require('../middlewares/async')
const Course = require('../models/Course')
const errorResponse = require('../utils/errorResponse')

//@desc  Get all course
//@route  Get /api/course
//@access  public
exports.getAllCourse = asyncHandler(async (req, res, next) => {
    const courses = await Course.find().sort({ createdAt: 'desc' })
    res.render('admin/course_All', { courses: courses })
    // res.status(200).json({
    //     success: true,
    //     count: course.length,
    //     data: course
    // })
})

//@desc  Get single course
//@route  Get /api/course/:id
//@access  public
exports.getSingleCourse = asyncHandler(async (req, res, next) => {
    const course = await Course.findById(req.params.id)
    if (!course)
        return next(new errorResponse(`Course not found with  id of ${req.params.id}`, 404))

    res.status(200).json({
        success: true,
        data: course
    })
})


//@desc  Create news
//@route  Post /api/course
//@access  private/admin
exports.createCourse = asyncHandler(async (req, res, next) => {
    const {
        name, titleWhat_1, title_1, content_1, titleWhat_2, title_2, content_2, during, time, days, price
    } = req.body

    let course = await Course.create(req.body)

    if (!req.files) {
        return next(new errorResponse(`Please upload a file`, 400))
    }

    const photo = req.files.photo
    const photo_1 = req.files.photo_1
    const photo_2 = req.files.photo_2


    // Make sure the image is a photo
    if (!photo.mimetype.startsWith('image') && !photo_1.mimetype.startsWith('image') && !photo_2.mimetype.startsWith('image')) {
        return next(new errorResponse(`Please upload an image file`, 400))
    }

    // Check file size
    if (photo.size > process.env.MAX_FILE_UPLOAD && photo_1.size > process.env.MAX_FILE_UPLOAD && photo_2.size > process.env.MAX_FILE_UPLOAD) {
        return next(new errorResponse(`Please upload an image less than 
        ${process.env.MAX_FILE_UPLOAD}`, 400))
    }


    // Create custom file name
    photo.name = `photo_${course._id}${path.parse(photo.name).ext}`
    photo.mv(`public/uploadImage/courseImage/${photo.name}`, async err => {
        if (err) {
            console.error(err)
            return next(new errorResponse(`Please upload an image less than `, 500))
        }
    })

    photo_1.name = `photoWhat_${course._id}${path.parse(photo_1.name).ext}`
    photo_1.mv(`public/uploadImage/courseImage/${photo_1.name}`, async err => {
        if (err) {
            console.error(err)
            return next(new errorResponse(`Please upload an image less than `, 500))
        }
    })

    photo_2.name = `photoWhy_${course._id}${path.parse(photo_2.name).ext}`
    photo_2.mv(`public/uploadImage/courseImage/${photo_2.name}`, async err => {
        if (err) {
            console.error(err)
            return next(new errorResponse(`Please upload an image less than `, 500))
        }
    })

    course = await Course.findByIdAndUpdate(course._id, {
        photo: photo.name,
        photo_1: photo_1.name,
        photo_2: photo_2.name
    }, {
        new: true,
        runValidators: true
    })

    res.redirect('/api/5f73231390cf343bec38e4f1/course/all')
    // res.status(200).json({
    //     success: true,
    //     data: course
    // })

})


//@desc  Update course
//@route  PUT /api/course/:id
//@access  Private/admin
exports.updateCourse = asyncHandler(async (req, res, next) => {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    if (!course) return next(new errorResponse(`course not found with  id of ${req.params.id}`, 404))

    // res.status(200).json({
    //     success: true,
    //     data: course
    // })
})

//@desc  Delete  course
//@route  Delete /api/course/:id
//@access  private/admin
exports.deleteCourse = asyncHandler(async (req, res, next) => {
    const course = await Course.findByIdAndDelete(req.params.id)
    if (!course) return next(new errorResponse(`Course not found with  id of ${req.params.id}`, 404))
    // res.status(200).json({
    //     success: true,
    //     data: course
    // })
    res.redirect('/api/5f73231390cf343bec38e4f1/course/all')
})