const express = require('express');
const router = require('express').Router();
const cookieParser = require('cookie-parser');
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const {
  getUsers, getUsersById, updateUser, updateAvatar, getCurrentUser,
} = require('../controllers/users');
const auth = require('../middlewares/auth');

function validateUrl(value, helpers) {
  if (validator.isURL(value, { require_protocol: true })) {
    return value;
  }
  return helpers.message('Невалидный url');
}

router.get('/users', cookieParser(), auth, getUsers);

router.get('/users/me', cookieParser(), auth, getCurrentUser);

router.get('/users/:userId', cookieParser(), auth, celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
}), getUsersById);

router.patch('/users/me', express.json(), cookieParser(), auth, celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);

router.patch('/users/me/avatar', express.json(), cookieParser(), auth, celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validateUrl),
  }),
}), updateAvatar);

module.exports = router;
