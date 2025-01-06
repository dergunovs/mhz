export interface ICalendarEvent<T> {
  id?: string;
  start: Date | null;
  end: Date | null;
  title: string;
  content: T[];
}

export interface ICalendarUpdate {
  firstCellDate: string;
  lastCellDate: string;
}
