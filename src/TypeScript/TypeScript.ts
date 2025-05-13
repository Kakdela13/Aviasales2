export type TTicket = {
  price: number;
  duration: number;
  segments: TSegment[];
};
// TICKET
export type TTicketProps = {
  ticket: TTicket;
  tabs: TTabsProps;
  shownCount: number;
  setShownCount: React.Dispatch<React.SetStateAction<number>>;
  filters: TFilter[];
};

// TICKETLIST
export type TTicketListProps = {
  tickets: TTicket[];
  tabs: TTabsProps;
  shownCount: number;
  setShownCount: React.Dispatch<React.SetStateAction<number>>;
  filters: TFilter[];
  shownMoreTickets: () => void;
};

export const allOptions = [
  "ALL",
  "NO_TRANSFER",
  "ONE_TRANSFER",
  "TWO_TRANSFER",
  "THREE_TRANSFER",
];
export type TFilter = (typeof allOptions)[number];

export const LABEL_TEXT: Record<TFilter, string> = {
  ALL: "Все",
  NO_TRANSFER: "Без пересадок",
  ONE_TRANSFER: "1 пересадка",
  TWO_TRANSFER: "2 пересадки",
  THREE_TRANSFER: "3 пересадки",
} as const;

export type TFilterProps = {
  filters: TFilter[];
  setFilters: React.Dispatch<React.SetStateAction<TFilter[]>>;
};

export type TTabs = {
  tabs: TTabsProps;
};
export type TTabsProps = "cheap" | "fast" | "optimal";

export type TSegment = {
  origin: string;
  destination: string;
  date: string;
  duration: number;
  stops: string[];
};
