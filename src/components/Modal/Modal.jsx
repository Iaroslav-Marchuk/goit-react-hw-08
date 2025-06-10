import { createPortal } from "react-dom";
import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import Fade from "@mui/material/Fade";

import css from "./Modal.module.css";

const Modal = ({ children, onClose, isOpen = true }) => {
  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div
      className={css.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <Fade in={isOpen} timeout={600}>
        <div className={css.modal}>
          <button
            className={css.closeBtn}
            onClick={onClose}
            aria-label="Close modal"
          >
            <FaTimes />
          </button>
          {children}
        </div>
      </Fade>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;
