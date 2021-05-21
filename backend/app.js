require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { celebrate, Joi, errors } = require('celebrate');
const cors = require('cors');
const userRout = require('./routes/users');
const cardRout = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const HandError = require('./errors/HandError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();

const corsOptions = {
  origin: 'https://express.mesto.nomoredomains.club',
  credentials: true,
};

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(helmet());
app.use(cors(corsOptions));
app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post('/signin', express.json(), celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);
app.post('/signup', express.json(), celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), createUser);
app.use(userRout);
app.use(cardRout);

app.use(() => {
  throw new HandError('Запрашиваемый ресурс не найден', 404);
});

app.use(errorLogger);

app.use(errors());

app.use((err, _req, res, next) => {
  const {
    name, code, statusCode = 500, message,
  } = err;

  switch (name) {
    case 'CastError':
      res.status(400).send({ message: 'Передан невалидный id' });
      break;
    case 'MongoError':
      if (code === 11000) {
        res.status(409).send({ message: 'Такой email уже существует' });
      }
      break;
    case 'ValidationError':
      res.status(400).send({ message });
      break;
    default:
      res
        .status(statusCode)
        .send({
          message: statusCode === 500
            ? 'На сервере произошла ошибка'
            : message,
        });
      break;
  }

  next();
});

app.listen(PORT);
