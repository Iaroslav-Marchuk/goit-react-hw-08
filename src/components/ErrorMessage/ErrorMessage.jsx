import css from "./ErrorMessage.module.css";

export default function ErrorMessage({ message }) {
  return (
    <div className={css.wrapper}>
      <p className={css.text}>{message}</p>
    </div>
  );
}
