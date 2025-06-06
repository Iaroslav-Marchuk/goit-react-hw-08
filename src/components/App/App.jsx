import ContactForm from "../ContactForm/ContactForm";
import ContactList from "../ContactList/ContactList";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Layout from "../Layout/Layout";
import Loader from "../Loader/Loader";

import SearchBox from "../SearchBox/SearchBox";
import { useDispatch, useSelector } from "react-redux";
import {
  selectContacts,
  selectError,
  selectLoading,
} from "../../redux/contacts/selectors";

import css from "./App.module.css";
import { useEffect } from "react";
import { fetchContacts } from "../../redux/contacts/operations";

function App() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts);
  }, [dispatch]);

  return (
    <Layout>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm />
      <SearchBox />
      {loading && <Loader loadingState={loading} />}
      {error && <ErrorMessage message={error} />}
      {!error && contacts.length > 0 && <ContactList />}

      {!loading && !error && contacts.length === 0 && (
        <p className={css.noResults}>The phonebook is empty!</p>
      )}
    </Layout>
  );
}

export default App;
