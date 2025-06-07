import { useDispatch, useSelector } from "react-redux";
import css from "./ContactsPage.module.css";
import {
  selectContacts,
  selectError,
  selectLoading,
} from "../../redux/contacts/selectors";
import { useEffect } from "react";
import { fetchContacts } from "../../redux/contacts/operations";
import ContactList from "../../components/ContactList/ContactList";
import ContactForm from "../../components/ContactForm/ContactForm";
import SearchBox from "../../components/SearchBox/SearchBox";

import Loader from "../../components/Loader/Loader";

const ContactsPage = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts);
  }, [dispatch]);

  return (
    <div className={css.wrapper}>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm />
      <SearchBox />

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
