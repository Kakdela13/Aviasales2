import "./Tabs.css";
import { TTabs } from "../../TypeScript/TypeScript";
export const Tabs = ({ setTabs, tabs }: TTabs) => {
  return (
    <div className="tabs">
      <button
        className={`tab ${tabs === "cheap" ? "active" : ""}`}
        onClick={() => setTabs("cheap")}
      >
        САМЫЙ ДЕШЕВЫЙ
      </button>
      <button
        className={`tab ${tabs === "fast" ? "active" : ""}`}
        onClick={() => setTabs("fast")}
      >
        САМЫЙ БЫСТРЫЙ
      </button>
      <button
        className={`tab ${tabs === "optimal" ? "active" : ""}`}
        onClick={() => setTabs("optimal")}
      >
        ОПТИМАЛЬНЫЙ
      </button>
    </div>
  );
};

export default Tabs;
