const mongoose = require('mongoose');
const HandError = require('../errors/HandError');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        if (/\bhttps?:\/\/[a-z0-9-._~:/?#[\]@!$&'()*+,;=]/g.test(v)) {
          return true;
        }
        throw new HandError('Некорректная ссылка', 400);
      },
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
