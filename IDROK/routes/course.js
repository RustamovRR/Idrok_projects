const express = require('express');
const router = express.Router({ mergeParams: true });
const {
    getAllCourse,
    getSingleCourse,
    createCourse,
    updateCourse,
    deleteCourse
} = require('../controllers/course');
const { protect, authorize } = require('../middlewares/auth')

router
    .route('/')
    .get(getAllCourse)
    .post(protect, authorize('admin'), createCourse);

router
    .route('/:id')
    .get(getSingleCourse)
    .put(protect, authorize('admin'), updateCourse)
    .delete(protect, authorize('admin'), deleteCourse)

module.exports = router;
