import { useSelector } from "react-redux";
import { useState } from "react";

import Contact from "../Contact/Contact";
import EditContact from "../EditContact/EditContact";

import { selectFilteredContacts } from "../../redux/contacts/selectors";

import css from "./ContactList.module.css";

const ContactList = () => {
  const [editting, setEditing] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  const openEdit = (contact) => {
    setSelectedContact(contact);
    setEditing(true);
  };

  const closeEdit = () => {
    setSelectedContact(null);
    setEditing(false);
  };

  const contacts = useSelector(selectFilteredContacts);

  return (
    <>
      <ul className={css.contactslist}>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <Contact contact={contact} onEdit={openEdit} />
          </li>
        ))}
      </ul>

      {editting && (
        <EditContact contact={selectedContact} onClose={closeEdit} />
      )}
    </>
  );
};

export default ContactList;
