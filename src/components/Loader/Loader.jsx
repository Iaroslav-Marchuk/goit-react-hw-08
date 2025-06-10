import { ClipLoader } from "react-spinners";

import css from "./Loader.module.css";

export default function Loader({ loadingState }) {
  return (
    <div className={css.wrapper}>
      <ClipLoader
        loading={loadingState}
        size={48}
        color="#0f2027"
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
