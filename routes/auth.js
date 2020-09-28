const express = require('express');
const {
  register,
  login,
  getMe,
  updateDetails,
  updatePassword,
  forgotPassword,
  resetPassword
} = require('../controllers/auth');
const router = express.Router();
const { protect } = require('../middlewares/auth');

router.get('/register',(req,res)=>{
  res.render('admin/login')
})

router.get('/login',(req,res)=>{
  res.render('admin/login')
})

router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, getMe);
router.put('/updatedetails', protect, updateDetails);
router.put('/updatepassword', protect, updatePassword);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);


module.exports = router;
