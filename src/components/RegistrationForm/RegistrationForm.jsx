import { Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import { register } from "../../redux/auth/operations";

import css from "./RegistrationForm.module.css";

const RegistrationForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (values, actions) => {
    if (!values.email) {
      toast.error("Fill all fields, please");
      actions.setSubmitting(false);
      return;
    }
    try {
      await dispatch(register(values)).unwrap();
      toast.success("Registered successfully!");
      actions.resetForm();
    } catch (error) {
      toast.error("Failed to register." + error);
    }
  };

  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      onSubmit={handleSubmit}
    >
      <Form className={css.form} autoComplete="off">
        <label className={css.label}>
          User name
          <Field className={css.input} type="text" name="name"></Field>
        </label>

        <label className={css.label}>
          E-mail
          <Field className={css.input} type="email" name="email"></Field>
        </label>

        <label className={css.label}>
          Password
          <Field className={css.input} type="password" name="password"></Field>
        </label>

        <button className={css.btn} type="submit">
          Register
        </button>
      </Form>
    </Formik>
  );
};
export default RegistrationForm;
