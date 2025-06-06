import ContactList from "../ContactList/ContactList";
import css from "./Layout.module.css";

const Layout = ({ children }) => {
  ContactList;
  return <div className={css.container}>{children}</div>;
};

export default Layout;
