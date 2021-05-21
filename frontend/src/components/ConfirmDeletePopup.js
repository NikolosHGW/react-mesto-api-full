import PopupWithForm from "./PopupWithForm";

export default function ConfirmDeletePopup({ isOpen, onClose, onConfirmCardDelete, card }) {
  function handleSubmit(evt) {
    evt.preventDefault();
    onConfirmCardDelete(card);
  }

  return (
    <PopupWithForm
      name="del"
      title="Вы уверены?"
      textButton="Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={true}
    />
  );
}
