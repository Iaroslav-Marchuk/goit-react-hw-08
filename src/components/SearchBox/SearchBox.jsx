import { useSelector, useDispatch } from "react-redux";

import { changeFilter } from "../../redux/filters/slice";
import { selectValueFilter } from "../../redux/filters/selectors";

import css from "./SearchBox.module.css";

export default function SearchBox() {
  const dispatch = useDispatch();

  const filter = useSelector(selectValueFilter);

  const handleFilterChange = (filter) => dispatch(changeFilter(filter));

  return (
    <div className={css.wrapper}>
      <label className={css.label}>Find contacts</label>
      <input
        className={css.input}
        value={filter}
        onChange={(event) => handleFilterChange(event.target.value)}
      ></input>
    </div>
  );
}
