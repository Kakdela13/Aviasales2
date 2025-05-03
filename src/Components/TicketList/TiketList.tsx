import "./TicketList.css";
import { Ticket } from "../Ticket/Ticket";
import { TTicketListProps } from "../../TypeScript/TypeScript";

export const TicketList: React.FC<TTicketListProps> = ({
  tickets,
  tabs,
  shownCount,
  setShownCount,
  filters,
  getTime,
  formatTransfer,
  shownMoreTickets,
}) => {
  return (
    <section className="tickets-container">
      {tickets.slice(0, shownCount).map((ticket, index) => (
        <Ticket
          key={index}
          ticket={ticket}
          tabs={tabs}
          setShownCount={setShownCount}
          shownCount={shownCount}
          filters={filters}
          getTime={getTime}
          formatTransfer={formatTransfer}
        />
      ))}
      {shownCount < tickets.length && (
        <button className="show-more" onClick={shownMoreTickets}>
          {" "}
          Показать еще 5 билетов!
        </button>
      )}
    </section>
  );
};
export default TicketList;
