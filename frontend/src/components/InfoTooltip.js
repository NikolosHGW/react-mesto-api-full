import React from 'react';
import succesSvg from '../images/Success.svg';
import failSvg from '../images/Fail.svg';

export default React.memo(({ isOpen, onClose, isSuccess, text }) => {
  return (
    <div className={`info-tool${isOpen ? ' info-tool_opened' : ''}`}>
      <div className="info-tool__container">
        <button
          className="info-tool__close-icon"
          type="button"
          aria-label="close"
          onClick={onClose}
        ></button>
        <img className="info-tool__img" src={isSuccess ? succesSvg : failSvg} alt="success or fail icon" />
        <p className="info-tool__text">{text}</p>
      </div>
    </div>
  );
});
