const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth');
const followController = require('../controllers/followController');

router.post('/:userId/follow', protect, followController.followUser);
router.get('/:userId/follow-status', protect, followController.getFollowStatus);

module.exports = router;