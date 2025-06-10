import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Fade from "@mui/material/Fade";

import { selectIsLoggedIn } from "../../redux/auth/selectors";

import css from "./HomePage.module.css";

const HomePage = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <div className={css.container}>
      <h1 className={css.title}>Welcome to Our App!</h1>
      <p className={css.text}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
        asperiores eius nobis saepe quis voluptatibus facere expedita tempora,
        hic similique natus minima fugit doloribus molestiae dolorum sed debitis
        tempore consectetur repellat, accusantium aspernatur incidunt
        doloremque.
      </p>
      <p className={css.text}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorum et
        illo non vel rerum odit, maxime, vitae dolorem molestiae error
        cupiditate! Quasi eaque est provident voluptates adipisci? Cumque
        quisquam laboriosam ullam, inventore ipsa ducimus quaerat dolorum natus
        quasi amet ab earum vero, laborum cum quibusdam qui?
      </p>

      <Fade in={!isLoggedIn} timeout={600}>
        <div>
          <p className={css.text}>
            To use the app, please{" "}
            <Link to="/register" className={css.linkBtn}>
              Register
            </Link>{" "}
            or{" "}
            <Link to="/login" className={css.linkBtn}>
              Log In
            </Link>
            .
          </p>
          <p className={css.text}>
            Once you’re authenticated, you’ll have full access to all features.
          </p>
        </div>
      </Fade>
    </div>
  );
};

export default HomePage;
