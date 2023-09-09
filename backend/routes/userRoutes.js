const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  editMe,
  getUser,
  deleteMe,
} = require('../controllers/userController');

const { protect } = require('../middleware/authMiddleware');

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.put('/me', protect, editMe);
router.delete('/me', protect, deleteMe);
router.get('/:id', protect, getUser);

module.exports = router;
