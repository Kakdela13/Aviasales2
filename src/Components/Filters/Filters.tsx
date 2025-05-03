import "./Filters.css";
import { TFilter, TFilterProps, LABEL_TEXT } from "../../TypeScript/TypeScript";

const allOptions = Object.keys(LABEL_TEXT) as TFilter[];

export const Filters: React.FC<TFilterProps> = ({ filters, setFilters }) => {
  const filteredCheckbox = (filter: TFilter) => {
    if (filter === "ALL") {
      if (filters.includes("ALL")) {
        setFilters([]);
      } else {
        setFilters([...allOptions]);
      }
    } else {
      let newFilters = filters.includes(filter)
        ? filters.filter((f) => f !== filter)
        : [...filters.filter((f) => f !== "ALL"), filter];

      if (newFilters.length === allOptions.length - 1) {
        newFilters = [...allOptions];
      }

      setFilters(newFilters);
    }
  };
  const isChecked = (filter: TFilter) => filters.includes(filter);
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
