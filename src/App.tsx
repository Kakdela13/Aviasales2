import React, { useEffect, useState } from "react";
import Filters from "./Components/Filters/Filters";
import Tabs from "./Components/Tabs/Tabs";
import "./App.css";
import logo1 from "./logo1.svg";
import TicketList from "./Components/TicketList/TiketList";
import { format } from "date-fns";
import {
  TTicket,
  TFilter,
  TTabsProps,
  TSegment,
} from "./TypeScript/TypeScript";

function App() {
  const [tabs, setTabs] = useState<TTabsProps>("cheap");
  const [tickets, setTickets] = useState<TTicket[]>([]);
  const [shownCount, setShownCount] = useState(5);
  const [filters, setFilters] = useState<TFilter[]>(["ALL"]);

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
    console.log("какие фильтры", filters);
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
      console.log("сегменты подходят?", allSegments);
      return allSegments;
    });
  };

  const handleTab = (tab: TTabsProps) => {
    setTabs(tab);
    setShownCount(5);
  };

  const getTime = (segment: TSegment) => {
    // console.log("что приходит", segment);
    const departureDate = new Date(segment.date);
    const arrivalDate = new Date(departureDate.getMinutes() + segment.duration);
    // console.log("счет даты", arrivalDate);
    return `${format(departureDate, "HH:mm")} - ${format(arrivalDate, "HH:mm")}`;
  };

  const formatTransfer = (count: number): string => {
    if (count === 0) return "ПРЯМОЙ";
    {
      if (count === 1) {
        return `${count} ПЕРЕСАДКА`;
      } else if (count === 2 && count <= 4) {
        return `${count} ПЕРЕСАДКИ`;
      } else {
        return `${count} ПЕРЕСАДОК`;
      }
    }
  };

  const shownMoreTickets = () => {
    setShownCount((prev) => prev + 5);
  };

  const totalDuration = (ticket: TTicket) => {
    let sum = 0;
    for (let i = 0; i < ticket.segments.length; i++) {
      sum += ticket.segments[i].duration;
    }
    console.log("сумма", sum);
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
  const filtered = filteredTickets(tickets, filters);
  const sortedTickets = sortTickets({ tickets: filtered, tabs });
  return (
    <div className="App">
      <header>
        <img src={logo1} alt="Логотип" />
      </header>
      <div className="container">
        <Filters filters={filters} setFilters={setFilters} />

        <section className="content">
          <Tabs setTabs={handleTab} tabs={tabs} />
          <TicketList
            tickets={sortedTickets}
            tabs={tabs}
            shownCount={shownCount}
            setShownCount={setShownCount}
            filters={filters}
            getTime={getTime}
            formatTransfer={formatTransfer}
            shownMoreTickets={shownMoreTickets}
          />
        </section>
      </div>
    </div>
  );
}

export default App;
