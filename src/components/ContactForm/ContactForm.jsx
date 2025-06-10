import { Formik, Form, Field, ErrorMessage } from "formik";
import { useId } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import toast from "react-hot-toast";

import Modal from "../Modal/Modal";

import { addContact } from "../../redux/contacts/operations";
import { selectContacts } from "../../redux/contacts/selectors";

import css from "./ContactForm.module.css";

export default function ContactForm({ onClose }) {
  const nameFieldId = useId();
  const numberFieldId = useId();
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const handleSubmit = async (values, actions) => {
    const isDuplicate = contacts.some(
      (contact) =>
        contact.name.toLowerCase() === values.name.toLowerCase() &&
        contact.number === values.number
    );

    if (isDuplicate) {
      toast.error("This contact already exists!");
      actions.setSubmitting(false);
      return;
    }

    try {
      await dispatch(
        addContact({
          name: values.name,
          number: values.number,
        })
      ).unwrap();

      toast.success("Contact added succesfully!");
      actions.resetForm();
      onClose();
    } catch (error) {
      toast.error("Failed to add contact." + error);
    }
  };

  const ContactSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Min 3 chars")
      .max(30, "Max 30 chars")
      .matches(
        /^[a-zA-Zа-яА-ЯёЁїЇіІєЄґҐ\s'-]+$/,
        "Name can only contain letters, spaces, apostrophes and dashes"
      )
      .required("This is a required field"),
    number: Yup.string()
      .matches(/^\d{9}$/, "Phone number must be exactly 9 digits")
      .required("Phone number is required"),
  });

  return (
    <Modal onClose={onClose}>
      <Formik
        initialValues={{
          name: "",
          number: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={ContactSchema}
      >
        <Form className={css.form}>
          <label className={css.label} htmlFor={nameFieldId}>
            Name
            <Field
              className={css.input}
              type="text"
              name="name"
              id={nameFieldId}
            />
          </label>
          <ErrorMessage className={css.error} name="name" component="span" />

          <label className={css.label} htmlFor={numberFieldId}>
            Number
            <Field
              className={css.input}
              type="tel"
              name="number"
              id={numberFieldId}
            />
          </label>
          <ErrorMessage className={css.error} name="number" component="span" />

          <button className={css.btn} type="submit">
            Add contact
          </button>
        </Form>
      </Formik>
    </Modal>
  );
}
