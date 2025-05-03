import "./Ticket.css";
import logoS7 from "../../s7-logo.svg";
import { TTicketProps } from "../../TypeScript/TypeScript";

export const Ticket: React.FC<TTicketProps> = ({
  ticket,
  getTime,
  formatTransfer,
}) => {
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
