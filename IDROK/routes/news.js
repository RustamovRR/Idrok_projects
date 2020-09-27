const express = require('express');
const fileUpload = require('express-fileupload');
const router = express.Router({mergeParams : true});
const {
    getAllNews,
    getSingleNews,
    createNews,
    updateNews,
    deleteNews
} = require('../controllers/news');
const {protect, authorize} = require('../middlewares/auth')
// router.use(protect);
// router.use(authorize('admin'));

router
  .route('/')
  .get(getAllNews)
  .post(protect,authorize('admin'),createNews);

router
  .route('/:id')
  .get(getSingleNews)
  .put(protect,authorize('admin'), updateNews)
  .delete(protect,authorize('admin'), deleteNews)
  
module.exports = router;
