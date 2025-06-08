import Modal from "../Modal/Modal";

import { FaUser, FaPhone } from "react-icons/fa";

import { editContact } from "../../redux/contacts/operations";
import { useId } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import * as Yup from "yup";

import css from "./EditContact.module.css";
import { useDispatch } from "react-redux";

const EditContact = ({ contact, onClose }) => {
  const nameFieldId = useId();
  const numberFieldId = useId();
  const dispatch = useDispatch();

  const handleSave = async (values, actions) => {
    try {
      await dispatch(
        editContact({
          id: contact.id,
          updatedContact: { name: values.name, number: values.number },
        })
      ).unwrap();

      actions.resetForm();
      onClose();
    } catch (error) {
      alert("Error updating contact: " + error);
      actions.setSubmitting(false);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const FeedbackSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Min 3 chars")
      .max(30, "Max 50 chars")
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
          name: contact.name,
          number: contact.number,
        }}
        onSubmit={handleSave}
        validationSchema={FeedbackSchema}
      >
        <Form className={css.form}>
          <label className={css.label} htmlFor={nameFieldId}>
            Name
          </label>
          <Field
            className={css.input}
            type="text"
            name="name"
            id={nameFieldId}
          />
          <ErrorMessage className={css.error} name="name" component="span" />

          <label className={css.label} htmlFor={numberFieldId}>
            Number
          </label>
          <Field
            className={css.input}
            type="text"
            name="number"
            id={numberFieldId}
          />
          <ErrorMessage className={css.error} name="number" component="span" />

          <button className={css.btn} type="submit">
            Save
          </button>
          <button className={css.btn} type="button" onClick={handleCancel}>
            Cancel
          </button>
        </Form>
      </Formik>
    </Modal>
  );
};

export default EditContact;
