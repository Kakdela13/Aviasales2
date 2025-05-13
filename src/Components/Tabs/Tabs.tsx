import "./Tabs.css";
import { TTabsProps } from "../../TypeScript/TypeScript";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { setTab } from "./tabsSlice";

export const Tabs = () => {
  const dispatch = useDispatch();
  const selectedTab = useSelector((state: RootState) => state.tabs.tab);
  return (
    <div className="tabs">
      <button
        className={`tab ${selectedTab === "cheap" ? "active" : ""}`}
        onClick={() => dispatch(setTab("cheap"))}
      >
        САМЫЙ ДЕШЕВЫЙ
      </button>
      <button
        className={`tab ${selectedTab === "fast" ? "active" : ""}`}
        onClick={() => dispatch(setTab("fast"))}
      >
        САМЫЙ БЫСТРЫЙ
      </button>
      <button
        className={`tab ${selectedTab === "optimal" ? "active" : ""}`}
        onClick={() => dispatch(setTab("optimal"))}
      >
        ОПТИМАЛЬНЫЙ
      </button>
    </div>
  );
};

export default Tabs;
