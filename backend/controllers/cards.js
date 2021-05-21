const HandError = require('../errors/HandError');
const cardModel = require('../models/card');

function getCards(_, res, next) {
  cardModel.find({})
    .then((cards) => res.send(cards))
    .catch(next);
}

function createCard(req, res, next) {
  const { name, link } = req.body;
  const { _id: owner } = req.user;
  cardModel.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch(next);
}

function deleteCard(req, res, next) {
  const { cardId } = req.params;
  const { _id } = req.user;
  cardModel.findById(cardId)
    .orFail(new HandError('Карточка с указанным _id не найдена', 404))
    .then((card) => {
      if (card.owner.toString() !== _id) {
        throw new HandError('Нельзя удалить чужую карточку', 403);
      }
      return cardModel.findByIdAndRemove(cardId)
        .orFail(new HandError('Карточка с указанным _id не найдена', 404))
        .then(() => res.send({ message: 'Пост удалён' }));
    })
    .catch(next);
}

function putLike(req, res, next) {
  const { cardId } = req.params;
  const { _id } = req.user;
  cardModel.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: _id } },
    { new: true },
  )
    .orFail(new HandError('Карточка с указанным _id не найдена', 404))
    .then((card) => res.send(card))
    .catch(next);
}

function deleteLike(req, res, next) {
  const { cardId } = req.params;
  const { _id } = req.user;
  cardModel.findByIdAndUpdate(
    cardId,
    { $pull: { likes: _id } },
    { new: true },
  )
    .orFail(new HandError('Карточка с указанным _id не найдена', 404))
    .then((card) => res.send(card))
    .catch(next);
}

module.exports = {
  getCards,
  createCard,
  deleteCard,
  putLike,
  deleteLike,
};
