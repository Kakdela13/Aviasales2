import React, { useEffect, useState } from "react";
import Filters from "./Components/Filters/Filters";
import Tabs from "./Components/Tabs/Tabs";
import "./App.css";
import logo1 from "./logo1.svg";
import TicketList from "./Components/TicketList/TiketList";
import { TTicket, TFilter, TTabsProps } from "./TypeScript/TypeScript";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./app/store";
import { setTab } from "./Components/Tabs/tabsSlice";

function App() {
  const [tickets, setTickets] = useState<TTicket[]>([]);
  const [shownCount, setShownCount] = useState(5);

  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filters);
  const tabs = useSelector((state: RootState) => state.tabs.tab);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/tickets");

        const data = await res.json();
        console.log(data);
        setTickets(data);
      } catch (error) {
        console.log("Ошибка:", error);
      }
    };
    fetchData();
  }, []);

  const filteredTickets = (tickets: TTicket[], filters: TFilter[]) => {
    for (let i = 0; i < filters.length; i++) {
      if (filters[i] === "ALL") {
        return tickets;
      }
    }

    return tickets.filter((ticket) => {
      let allSegments = true;

      for (let i = 0; i < ticket.segments.length; i++) {
        const stopsCount = ticket.segments[i].stops.length;
        let segmentsMatch = false;

        for (let j = 0; j < filters.length; j++) {
          const filter = filters[j];

          if (
            (filter === "NO_TRANSFER" && stopsCount === 0) ||
            (filter === "ONE_TRANSFER" && stopsCount === 1) ||
            (filter === "TWO_TRANSFER" && stopsCount === 2) ||
            (filter === "THREE_TRANSFER" && stopsCount === 3)
          ) {
            segmentsMatch = true;
          }
        }
        if (!segmentsMatch) {
          allSegments = false;
        }
      }

      return allSegments;
    });
  };

  const handleTab = (tab: TTabsProps) => {
    dispatch(setTab(tab));
    setShownCount(5);
  };

  const shownMoreTickets = () => {
    setShownCount((prev) => prev + 5);
  };

  const totalDuration = (ticket: TTicket) => {
    let sum = 0;
    for (let i = 0; i < ticket.segments.length; i++) {
      sum += ticket.segments[i].duration;
    }
    return sum;
  };

  const sortTickets = ({
    tickets,
    tabs,
  }: {
    tickets: TTicket[];
    tabs: TTabsProps;
  }) => {
    switch (tabs) {
      case "cheap":
        return [...tickets].sort((a, b) => a.price - b.price);
      case "fast":
        return [...tickets].sort((a, b) => totalDuration(a) - totalDuration(b));
      case "optimal":
        return [...tickets].sort((a, b) => a.price + totalDuration(a));
      default:
        return tickets;
    }
  };
  const filtered = filteredTickets(tickets, filters.filters);

  const sortedTickets = sortTickets({ tickets: filtered, tabs });

  return (
    <div className="App">
      <header>
        <img src={logo1} alt="Логотип" />
      </header>
      <div className="container">
        <Filters />

        <section className="content">
          <Tabs />
          <TicketList
            tickets={sortedTickets}
            tabs={tabs}
            shownCount={shownCount}
            setShownCount={setShownCount}
            filters={filters.filters}
            shownMoreTickets={shownMoreTickets}
          />
        </section>
      </div>
    </div>
  );
}

export default App;
