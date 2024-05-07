import React from 'react';
import './css/Modal.css';

const Modal = ({ onClose, children }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="modal-close-btn">&times;</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;