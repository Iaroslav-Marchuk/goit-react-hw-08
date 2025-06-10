import Modal from "../Modal/Modal";

import css from "./ConfirmDelete.module.css";

const ConfirmDelete = ({ onDelete, onClose }) => {
  return (
    <Modal onClose={onClose}>
      <div className={css.wrapper}>
        <p className={css.text}>Do you really want to delete this contact?</p>
        <div className={css.btns}>
          <button className={css.btnY} onClick={onDelete}>
            Yes
          </button>
          <button className={css.btnN} onClick={onClose}>
            No
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDelete;
