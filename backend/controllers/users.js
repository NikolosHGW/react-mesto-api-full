const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const HandError = require('../errors/HandError');
const userModel = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

function getIdError() {
  return new HandError('Пользователь по указанному _id не найден', 404);
}

function getUsers(_, res, next) {
  userModel.find({})
    .then((users) => res.send(users))
    .catch(next);
}

function getCurrentUser(req, res, next) {
  const { _id } = req.user;
  userModel.findById(_id)
    .orFail(getIdError())
    .then((user) => res.send(user))
    .catch(next);
}

function getUsersById(req, res, next) {
  const { userId } = req.params;
  userModel.findById(userId)
    .orFail(getIdError())
    .then((user) => res.send(user))
    .catch(next);
}

function createUser(req, res, next) {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => userModel.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.send(user))
    .catch(next);
}

function updateUser(req, res, next) {
  const { name, about } = req.body;
  const { _id } = req.user;
  userModel.findByIdAndUpdate(
    _id,
    { name, about },
    { new: true, runValidators: true, upsert: false },
  )
    .orFail(getIdError())
    .then((user) => res.send(user))
    .catch(next);
}

function updateAvatar(req, res, next) {
  const { avatar } = req.body;
  const { _id } = req.user;
  userModel.findByIdAndUpdate(
    _id,
    { avatar },
    { new: true, runValidators: true, upsert: false },
  )
    .orFail(getIdError())
    .then((user) => res.send(user))
    .catch(next);
}

function login(req, res, next) {
  const { email, password } = req.body;

  userModel.findUserByCredentials(email, password)
    .then((user) => {
      const { _id } = user;
      const token = jwt.sign(
        { _id },
        NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      }).send({ tokenStatus: 'ok' });
    })
    .catch(next);
}

module.exports = {
  getUsers,
  getCurrentUser,
  getUsersById,
  createUser,
  updateUser,
  updateAvatar,
  login,
};
