const express = require('express')
const Course = require('../models/Course')
const router = express.Router({ mergeParams: true });
const {
  getAllCourse,
  getSingleCourse,
  createCourse,
  updateCourse,
  deleteCourse
} = require('../controllers/course');


router
  .route('/')

router
  .route('/all')
  .get(getAllCourse)
  .post(createCourse);

router
  .route('/:id')
  .post(deleteCourse)


router.get('/', async (req, res) => {
  let courses = await Course.find().sort({ createdAt: 'desc' })
  res.render('admin/course', { courses: courses })
})

router.get('/all', async (req, res) => {
  let courses = await Course.find().sort({ createdAt: 'desc' })
  res.render('admin/course_All', { courses: courses })
})

router.get('/edit/:id', async (req, res) => {
  const course = await Course.findById(req.params.id, req.body, {
    new: true,
    runValidators: true
  })
  res.render('admin/edit_Course', { course: course })
  if (!course) return next(new errorResponse(`Not found user with  id of ${req.params.id}`, 404))

})

router.post('/edit/:id', async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })

  await course.save()
  res.redirect('/api/course/all')

})

module.exports = router;