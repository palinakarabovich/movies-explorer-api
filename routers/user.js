const router = require('express').Router();

const { celebrate, Joi } = require('celebrate');

const { getCurrentUser, updateCurrentUser } = require('../controllers/user');

router.get('/me', getCurrentUser);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), updateCurrentUser);

module.exports = router;
