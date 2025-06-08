import Modal from "../Modal/Modal";

import css from "./ConfirmDelete.module.css";

const ActiveModal = Object.freeze({
  Confirm: "confirm",
  None: "none",
});

const ConfirmDelete = ({ onDelete, onClose }) => {
  return (
    <Modal onClose={onClose}>
      <div className={css.wrapper}>
        <p className={css.text}>Do you really want to delete this contact?</p>
        <button className={css.btn} onClick={onDelete}>
          Yes
        </button>
        <button className={css.btn} onClick={onClose}>
          No
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmDelete;
