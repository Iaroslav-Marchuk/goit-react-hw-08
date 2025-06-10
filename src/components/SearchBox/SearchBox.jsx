import { useSelector, useDispatch } from "react-redux";
import { FaSearch } from "react-icons/fa";

import { changeFilter } from "../../redux/filters/slice";
import { selectValueFilter } from "../../redux/filters/selectors";

import css from "./SearchBox.module.css";

export default function SearchBox() {
  const dispatch = useDispatch();

  const filter = useSelector(selectValueFilter);

  const handleFilterChange = (filter) => dispatch(changeFilter(filter));

  return (
    <div className={css.wrapper}>
      <label className={css.label}>
        <div className={css.inputWrapper}>
          <FaSearch className={css.icon} />
          <input
            className={css.input}
            value={filter}
            placeholder="Search contact..."
            onChange={(event) => handleFilterChange(event.target.value)}
          />
        </div>
      </label>
    </div>
  );
}
