import { useSelector } from "react-redux";

import { selectUser } from "../../redux/auth/selectors";
import { selectContacts } from "../../redux/contacts/selectors";

import css from "./ProfilePage.module.css";

const ProfilePage = () => {
  const user = useSelector(selectUser);
  const contacts = useSelector(selectContacts);
  return (
    <div className={css.wrapper}>
      <h1 className={css.title}>Welcome, {user.name}</h1>
      {contacts.length ? (
        <p className={css.text}>You have already {contacts.length} contacts</p>
      ) : (
        <p className={css.text}>Your phonebook is empty!</p>
      )}
    </div>
  );
};

export default ProfilePage;
