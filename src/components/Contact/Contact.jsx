import { FaUser, FaPhone, FaTrash, FaPen } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useState } from "react";
import toast from "react-hot-toast";

import ConfirmDelete from "../ConfirmDelete/ConfirmDelete";

import { deleteContact } from "../../redux/contacts/operations";

import css from "./Contact.module.css";

const Contact = ({ contact, onEdit }) => {
  const dispatch = useDispatch();

  const [confirm, setConfirm] = useState(false);

  const openConfirm = () => setConfirm(true);
  const closeConfirm = () => setConfirm(false);

  const handleDelete = () => {
    dispatch(deleteContact(contact.id))
      .unwrap()
      .then(() => {
        toast.success("Contact deleted succesfully!");
        closeConfirm();
      })
      .catch(() => {
        toast.error("Failed to delete contact.");
      });
  };

  return (
    <>
      <div className={css.card}>
        <div className={css.info}>
          <p className={css.name}>
            <FaUser className={css.icon} />
            {contact.name}
          </p>
          <p className={css.number}>
            <FaPhone className={css.icon} />
            {`${contact.number.slice(0, 3)}-${contact.number.slice(
              3,
              6
            )}-${contact.number.slice(6, 9)}`}
          </p>
        </div>

        <div className={css.buttons}>
          <button className={css.button} onClick={() => onEdit(contact)}>
            <FaPen />
          </button>
          <button className={css.btn} onClick={openConfirm}>
            <FaTrash />
          </button>
        </div>
      </div>

      {confirm && (
        <ConfirmDelete onDelete={handleDelete} onClose={closeConfirm} />
      )}
    </>
  );
};

export default Contact;
