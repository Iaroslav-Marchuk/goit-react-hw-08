import { Formik, Form, Field, ErrorMessage } from "formik";
import { useId } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import * as Yup from "yup";

import Modal from "../Modal/Modal";

import { editContact } from "../../redux/contacts/operations";
import { selectContacts } from "../../redux/contacts/selectors";

import css from "./EditContact.module.css";

const EditContact = ({ contact, onClose }) => {
  const nameFieldId = useId();
  const numberFieldId = useId();
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const handleSave = async (values, actions) => {
    if (
      values.name.trim() === contact.name.trim() &&
      values.number.trim() === contact.number.trim()
    ) {
      toast.error("Contact unchanged.");
      actions.setSubmitting(false);
      return;
    }

    const isDuplicate = contacts.some(
      (cont) =>
        cont.id !== contact.id &&
        cont.name.toLowerCase() === values.name.toLowerCase() &&
        cont.number === values.number
    );

    if (isDuplicate) {
      toast.error("This contact already exists!");
      actions.setSubmitting(false);
      return;
    }

    try {
      await dispatch(
        editContact({
          id: contact.id,
          updatedContact: { name: values.name, number: values.number },
        })
      ).unwrap();

      toast.success("Contact saved succesfully!");
      actions.resetForm();
      onClose();
    } catch (error) {
      toast.error("Failed to add contact." + error);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const FeedbackSchema = Yup.object().shape({
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
          name: contact.name,
          number: contact.number,
        }}
        onSubmit={handleSave}
        validationSchema={FeedbackSchema}
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

          <div className={css.btns}>
            <button className={css.btnSave} type="submit">
              Save
            </button>
            <button
              className={css.btnCancel}
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </Form>
      </Formik>
    </Modal>
  );
};

export default EditContact;
