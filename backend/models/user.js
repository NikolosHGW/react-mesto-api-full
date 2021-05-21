const mongoose = require('mongoose');
const validatorEmail = require('validator');
const bcrypt = require('bcryptjs');
const HandError = require('../errors/HandError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(v) {
        return /\bhttps?:\/\/[a-z0-9-._~:/?#[\]@!$&'()*+,;=]/g.test(v);
      },
      message: 'Некорректная ссылка',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validatorEmail.isEmail(v);
      },
      message: 'Некорректный email',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
});

function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new HandError('Неправильные почта или пароль', 401));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new HandError('Неправильные почта или пароль', 401));
          }
          return user;
        });
    });
}

userSchema.statics = { findUserByCredentials };

module.exports = mongoose.model('user', userSchema);
