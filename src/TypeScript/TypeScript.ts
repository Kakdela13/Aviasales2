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
  getTime: (segment: TSegment) => string;
  formatTransfer: (count: number) => string;
};

// TICKETLIST
export type TTicketListProps = {
  tickets: TTicket[];
  tabs: TTabsProps;
  shownCount: number;
  setShownCount: React.Dispatch<React.SetStateAction<number>>;
  filters: TFilter[];
  getTime: (segment: TSegment) => string;
  formatTransfer: (count: number) => string;
  shownMoreTickets: () => void;
};
export type TFilter = keyof typeof LABEL_TEXT;

export const LABEL_TEXT = {
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
  setTabs: (filter: TTabsProps) => void;
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
