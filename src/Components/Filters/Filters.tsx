import "./Filters.css";
import { TFilter, LABEL_TEXT, allOptions } from "../../TypeScript/TypeScript";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { filteredCheck } from "./filtersSlice";

export const Filters: React.FC = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filters);

  const filteredCheckbox = (filter: TFilter) => {
    dispatch(filteredCheck(filter));
  };
  const isChecked = (filter: TFilter) => filters.filters.includes(filter);
  return (
    <aside className="filters">
      <h3>КОЛИЧЕСТВО ПЕРЕСАДОК</h3>
      {allOptions.map((filter) => (
        <label
          key={filter}
          className={`filter-label ${isChecked(filter) ? "active" : ""}`}
        >
          <input
            className="my-input"
            type="checkbox"
            checked={isChecked(filter)}
            onChange={() => filteredCheckbox(filter)}
          />
          {LABEL_TEXT[filter]}
        </label>
      ))}
    </aside>
  );
};
export default Filters;
