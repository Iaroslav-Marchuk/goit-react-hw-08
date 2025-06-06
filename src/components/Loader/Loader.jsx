import css from "./Loader.module.css";

import { ScaleLoader } from "react-spinners";

export default function Loader({ loadingState }) {
  return (
    <div className={css.wrapper}>
      <ScaleLoader
        className={css.loader}
        loading={loadingState}
        aria-label="Loading Spinner"
        data-testid="loader"
        color="#0f2027"
      />
    </div>
  );
}
