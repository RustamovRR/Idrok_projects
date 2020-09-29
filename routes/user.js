const express = require('express');
const router = express.Router({ mergeParams: true });
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/users');
const { protect, authorize } = require('../middlewares/auth')
// router.use(protect);
// router.use(authorize('admin'));

router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

router
  .route('/:id')
  .get(getUser)
  .put(protect, updateUser)
  .delete(protect, deleteUser);

module.exports = router;
