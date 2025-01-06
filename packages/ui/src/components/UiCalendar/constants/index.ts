import { ICalendarEvent } from '../interface';

export const EVENTS: ICalendarEvent<object>[] = [
  { id: 'id of event', start: new Date(), end: new Date(), title: '+', content: [{ id: 1, text: 'Text' }] },
];
