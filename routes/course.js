const express = require('express')
const path = require('path')
const Course = require('../models/Course')
const fileUpload = require('express-fileupload')
const router = express.Router({ mergeParams: true })


router.post('/All', async (req, res, next) => {

  let course = await Course.create(req.body)

  await course.save()
  res.redirect('/admin/course/All')

})

router.get('/', async (req, res) => {
  let course = await Course.find()
  res.render('admin/course')
})

router.get('/All', async (req, res) => {
  let courses = await Course.find().sort({ createdAt: 'desc' })
  res.render('admin/course_All', { courses: courses })
})


// By id////////////////////////////////////////////////////////////////////////////////////////////
router.get('/:id', async (req, res) => {
  let course = await Course.findById(req.params.id)
  if (!course)
    return next(res.send(`Course not found with  id of ${req.params.id}`, 404))
})

// update
router.get('/edit/:id', async (req, res) => {
  let course = await Course.findById(req.params.id)
  res.render('admin/edit_Course', { course: course })
})

router.post('/edit/:id', async (req, res) => {
  let course = await Course.findByIdAndUpdate(req.params.id, req.body)

  await course.save()
  res.redirect('/admin/course/All')
})

// delete
router.post('/All/:id', async (req, res) => {
  let course = await Course.findByIdAndDelete(req.params.id)
  res.redirect('/admin/course/All')
})



module.exports = router
