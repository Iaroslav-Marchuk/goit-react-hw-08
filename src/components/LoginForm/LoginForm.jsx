import { Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import { logIn } from "../../redux/auth/operations";

import css from "./LoginForm.module.css";

const LoginForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (values, actions) => {
    if (!values.email || !values.password) {
      toast.error("Fill all fields, please");
      actions.setSubmitting(false);
      return;
    }

    try {
      await dispatch(logIn(values)).unwrap();

      toast.success("Logged in successfully!");
      actions.resetForm();
    } catch (error) {
      toast.error("Failed to log in." + error);
    }
  };

  return (
    <Formik initialValues={{ email: "", password: "" }} onSubmit={handleSubmit}>
      <Form className={css.form} autoComplete="off">
        <label className={css.label}>
          Email
          <Field className={css.input} type="email" name="email" />
        </label>

        <label className={css.label}>
          Password
          <Field className={css.input} type="password" name="password" />
        </label>

        <button className={css.btn} type="submit">
          Login
        </button>
      </Form>
    </Formik>
  );
};

export default LoginForm;
