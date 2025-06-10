import { useDispatch, useSelector } from "react-redux";
import { FaUserPlus } from "react-icons/fa";
import { useEffect, useState } from "react";

import Loader from "../../components/Loader/Loader";
import ContactList from "../../components/ContactList/ContactList";
import ContactForm from "../../components/ContactForm/ContactForm";
import SearchBox from "../../components/SearchBox/SearchBox";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

import {
  selectContacts,
  selectError,
  selectIsLoading,
} from "../../redux/contacts/selectors";
import { fetchContacts } from "../../redux/contacts/operations";

import css from "./ContactsPage.module.css";

const ContactsPage = () => {
  const [modalOpen, setModalIsOpen] = useState(false);

  const dispatch = useDispatch();

  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={css.wrapper}>
      <SearchBox />

      <button className={css.btn} type="button" onClick={openModal}>
        <div className={css.btnContent}>
          <FaUserPlus className={css.icon} />
          <span>Create new contact</span>
        </div>
      </button>

      {modalOpen && <ContactForm onClose={closeModal} />}

      {isLoading && <Loader loadingState={isLoading} />}
      {error && <ErrorMessage message={error} />}
      {!error && contacts.length > 0 && <ContactList />}

      {!isLoading && !error && contacts.length === 0 && (
        <p className={css.noResults}>The phonebook is empty!</p>
      )}
    </div>
  );
};

export default ContactsPage;
