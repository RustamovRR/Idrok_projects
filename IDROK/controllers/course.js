const path = require('path');
const asyncHandler = require('../middlewares/async');
const Course = require('../models/Course');
const errorResponse = require('../utils/errorResponse');

//@desc  Get all course
//@route  Get /api/course
//@access  public
exports.getAllCourse = asyncHandler(async (req, res, next) => {
    const course = await Course.find();
    res.status(200).json({
        success: true,
        count: course.length,
        data: course
    });
});

//@desc  Get single course
//@route  Get /api/course/:id
//@access  public
exports.getSingleCourse = asyncHandler(async (req, res, next) => {
    const course = await Course.findById(req.params.id);
    if (!course)
        return next(new errorResponse(`Course not found with  id of ${req.params.id}`, 404));

    res.status(200).json({
        success: true,
        data: course
    });
});


//@desc  Create news
//@route  Post /api/course
//@access  private/admin
exports.createCourse = asyncHandler(async (req, res, next) => {
    const { name, titleWhat, titleWhy, bodyWhat, bodyWhy, during, time, days, price } = req.body;
    let course = await Course.create(req.body);
    if (!req.files) {
        return next(new errorResponse(`Please ulpoad a file`, 400));
    }

    const photo = req.files.photo;
    const photoWhat = req.files.photoWhat;
    const photoWhy = req.files.photoWhy;


    // Make sure the image is a photo
    if (!photo.mimetype.startsWith('image') && !photoWhat.mimetype.startsWith('image') && !photoWhy.mimetype.startsWith('image')) {
        return next(new errorResponse(`Please ulpoad an image file`, 400));
    }

    // Check file size
    if (photo.size > process.env.MAX_FILE_UPLOAD && photoWhat.size > process.env.MAX_FILE_UPLOAD && photoWhy.size > process.env.MAX_FILE_UPLOAD) {
        return next(new errorResponse(`Please upload an image less than 
        ${process.env.MAX_FILE_UPLOAD}`, 400));
    }


    // Create custom file name
    photo.name = `photo_${course._id}${path.parse(photo.name).ext}`;
    photo.mv(`${process.env.FILE_UPLOAD_PATH}/${photo.name}`, async err => {
        if (err) {
            console.error(err);
            return next(new errorResponse(`Please upload an image less than `, 500));
        }
    });

    photoWhat.name = `photoWhat_${course._id}${path.parse(photoWhat.name).ext}`;
    photoWhat.mv(`${process.env.FILE_UPLOAD_PATH}/${photoWhat.name}`, async err => {
        if (err) {
            console.error(err);
            return next(new errorResponse(`Please upload an image less than `, 500));
        }
    });

    photoWhy.name = `photoWhy_${course._id}${path.parse(photoWhy.name).ext}`;
    photoWhy.mv(`${process.env.FILE_UPLOAD_PATH}/${photoWhy.name}`, async err => {
        if (err) {
            console.error(err);
            return next(new errorResponse(`Please upload an image less than `, 500));
        }
    });

    course = await Course.findByIdAndUpdate(course._id, {
        photo: photo.name,
        photoWhat: photoWhat.name,
        photoWhy: photoWhy.name
    }, {
        new: true,
        runValidators: true
    });
    res.status(200).json({
        success: true,
        data: course
    });

});


//@desc  Update course
//@route  PUT /api/course/:id
//@access  Private/admin
exports.updateCourse = asyncHandler(async (req, res, next) => {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!course) return next(new errorResponse(`course not found with  id of ${req.params.id}`, 404));

    res.status(200).json({
        success: true,
        data: course
    });
});

//@desc  Delete  course
//@route  Delete /api/course/:id
//@access  private/admin
exports.deleteCourse = asyncHandler(async (req, res, next) => {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return next(new errorResponse(`Course not found with  id of ${req.params.id}`, 404));
    res.status(200).json({
        success: true,
        data: course
    });
});
