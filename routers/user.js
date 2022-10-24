const router = require('express').Router();

const { validateUserProfile } = require('../middlewares/validation');

const { getCurrentUser, updateCurrentUser } = require('../controllers/user');

router.get('/me', getCurrentUser);
router.patch('/me', validateUserProfile, updateCurrentUser);

module.exports = router;
