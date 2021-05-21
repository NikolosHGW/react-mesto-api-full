const express = require('express');
const router = require('express').Router();
const cookieParser = require('cookie-parser');
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getUsersById, updateUser, updateAvatar, getCurrentUser,
} = require('../controllers/users');
const auth = require('../middlewares/auth');

router.get('/users', cookieParser(), auth, getUsers);

router.get('/users/me', cookieParser(), auth, getCurrentUser);

router.get('/users/:userId', cookieParser(), auth, celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
}), getUsersById);

router.patch('/users/me', express.json(), cookieParser(), auth, celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);

router.patch('/users/me/avatar', express.json(), cookieParser(), auth, celebrate({
  body: Joi.object().keys({
    avatar: Joi.string(),
  }),
}), updateAvatar);

module.exports = router;
