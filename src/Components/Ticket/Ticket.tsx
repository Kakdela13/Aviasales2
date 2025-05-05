import "./Ticket.css";
import logoS7 from "../../s7-logo.svg";
import { TSegment, TTicketProps } from "../../TypeScript/TypeScript";
import { format } from "date-fns";

const getTime = (segment: TSegment) => {
  const departureDate = new Date(segment.date);
  const arrivalDate = new Date(departureDate.getMinutes() + segment.duration);
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
export const Ticket: React.FC<TTicketProps> = ({ ticket }) => {
  return (
    <div className="ticket">
      <div className="ticket-header">
        <div className="price">{ticket.price} Р</div>
        <img src={logoS7} alt="S7 Airlines" />
      </div>
      <div className="ticket-info">
        {ticket.segments.map((segment, index) => (
          <section className="option" key={index}>
            <article className="info">
              <div className="time">
                {segment.origin}-{segment.destination}
              </div>
              <div className="details">{getTime(segment)}</div>
            </article>
            <article className="info">
              <div className="duration">В ПУТИ</div>
              <div className="duration-time">
                {Math.floor(segment.duration / 60)}ч {segment.duration % 60}м
              </div>
            </article>
            <article className="info">
              <div className="transfer">
                {formatTransfer(segment.stops.length)}
              </div>
              <div className="transfer-city">{segment.stops.join(", ")}</div>
            </article>
          </section>
        ))}
      </div>
    </div>
  );
};
