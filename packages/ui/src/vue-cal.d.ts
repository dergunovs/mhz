/* eslint-disable import-x/export */
/* eslint-disable @typescript-eslint/no-type-alias */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable @typescript-eslint/array-type */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/method-signature-style */
declare module 'vue-cal' {
  import Vue from 'vue';

  export type FormattedDate = string; // eg (e.g. 2020-09-18)
  export type View = 'years' | 'year' | 'month' | 'week' | 'day';
  export type WeekDays = 1 | 2 | 3 | 4 | 5 | 6 | 7;

  export interface SplitDaysAttributes {
    id: string | number;
    class: string;
    label: string;
    hide: boolean;
  }

  export interface EditableEvents {
    title: boolean;
    drag: boolean;
    resize: boolean;
    delete: boolean;
    create: boolean;
  }

  export interface Event {
    _eid?: string;
    start: string | Date;
    end: string | Date;
    title?: string;
    content?: string;
    contentFull?: string;
    class?: string;
    background?: boolean;
    split?: number | string;
    allDay?: boolean;
    deletable?: boolean;
    resizable?: boolean;
    startTimeMinutes?: number;
    endTimeMinutes?: number;
  }

  export interface Event {
    created_at?: string | Date;
    updated_at?: string | Date;
    created_by_id?: number;
    id?: number;
  }

  export type OnEventClick = (event: Event, e: MouseEvent) => void;

  export interface EventReadyChanged {
    view: string;
    startDate: Date;
    endDate: Date;
    firstCellDate: Date;
    lastCellDate: Date;
    outOfScopeEvents: Array<Event>;
    events: Array<Event>;
    week: number;
  }

  export interface EventChange {
    event: Event;
    originalEvent: Event;
  }

  export interface EventTitleChange {
    event: Event;
    oldTitle: string;
  }

  export interface EventDurationChange extends EventChange {
    oldDate: Date;
  }

  export interface Events {
    ready: EventReadyChanged;
    'view-change': EventReadyChanged;
    'cell-click': Date;
    'cell-dblclick': Date;
    'cell-contextmenu': Date & { x: number; y: number };
    'cell-keypress-enter': Date;
    'cell-focus': Date;
    'event-focus': Event;
    'event-mouse-enter': Event;
    'event-mouse-leave': Event;
    'event-create': Event;
    'event-drag-create': Event;
    'event-delete': Event;
    'event-title-change': Event;
    'event-duration-change': EventDurationChange;
    'event-resizing': any;
    'event-drop': any;
    'event-change': EventChange;
  }

  export type EventListeners = {
    [A in keyof Events]: (value: Events[A]) => void;
  };

  export interface VueCalEvent extends Event {
    daysCount: number;
    deleting: boolean;
    draggable: boolean;
    dragging: boolean;
    draggingStatic: boolean;
    endTimeMinutes: number;
    focused: boolean;
    repeat: boolean;
    resizing: boolean;
    segments: any;
    titleEditable: boolean;
  }

  export interface VueCalView {
    id: string;
    title: string;
    startDate: any;
    endDate: any;
    firstCellDate: any;
    lastCellDate: any;
    selectedDate: any;
    events: VueCalEvent[];
  }

  export interface Props {
    activeView?: View;
    allDayBarHeight?: string | number;
    cellClickHold?: boolean;
    cellContextmenu?: boolean;
    clickToNavigate?: boolean;
    dblclickToNavigate?: boolean;
    disableDatePrototypes?: boolean;
    disableDays?: Array<FormattedDate>;
    disableViews?: Array<View>;
    dragToCreateEvent?: boolean;
    dragToCreateThreshold?: number;
    editableEvents?: boolean | EditableEvents;
    events?: Array<Event>;
    eventsCountOnYearView?: boolean;
    eventsOnMonthView?: boolean | string;
    hideBody?: boolean;
    hideTitleBar?: boolean;
    hideViewSelector?: boolean;
    hideWeekdays?: Array<WeekDays>;
    hideWeekends?: boolean;
    locale?: string;
    maxDate?: string | Date;
    minCellWidth?: number;
    minDate?: string | Date;
    minEventWidth?: number;
    minSplitWidth?: number;
    onEventClick?: Function;
    onEventCreate?: Function;
    onEventDblclick?: Function;
    overlapsPerTimeStep?: boolean;
    resizeX?: boolean;
    selectedDate?: string | Date;
    showAllDayEvents?: boolean | 'short';
    showWeekNumbers?: boolean | string;
    small?: boolean;
    snapToTime?: number;
    specialHours?: object;
    splitDays?: Array<any>;
    startWeekOnSunday?: boolean;
    stickySplitLabels?: boolean;
    time?: boolean;
    timeCellHeight?: number;
    timeFormat?: string;
    timeFrom?: number;
    timeStep?: number;
    timeTo?: number;
    todayButton?: boolean;
    transitions?: boolean;
    twelveHour?: boolean;
    xsmall?: boolean;
    watchRealTime?: boolean;
  }

  export namespace slots {
    export namespace event {
      export interface Props {
        view: View;
        event: VueCalEvent;
      }
    }
  }

  export interface VueCal extends Props {}

  export class VueCal extends Vue {
    $on<T extends keyof Events>(event: T, callback: EventListeners[T]) {
      return super.$on(event, callback);
    }

    ready: boolean;
    texts: any;
    utils: {
      date: any;
      cell: any;
      event: any;
    };
    modules: { dnd: null };

    minutesAtCursor(e: MouseEvent);

    view: VueCalView;
    eventIdIncrement: number;
    now: Date;
    timeTickerIds: [any, any];
    mutableEvents: any;
    transitionDirection: string;

    previous();
    next();

    /**
     * On click on previous or next arrow, update the calendar visible date range.
     *
     * @param {Boolean} next
     */
    previousNext(next = true);

    /**
     * On click/dblclick of a cell go to a narrower view if available.
     * E.g. Click on month cell takes you to week view if not hidden, otherwise on day view if not hidden.
     *
     * @param {String | Date} date A starting date for the view, if none, fallbacks to the selected date,
     *                             If also empty fallbacks to the current view start date.
     */
    switchToNarrowerView(date = null);

    /**
     * Switches to the specified view on view selector click, or programmatically form external call (via $refs).
     * If a date is given, it will be selected and if the view does not contain it, it will go to that date.
     *
     * @param {String} view the view to go to. Among `years`, `year`, `month`, `week`, `day`.
     * @param {String | Date} date A starting date for the view, if none, fallbacks to the selected date,
     *                             If also empty fallbacks to the current view start date.
     * @param {Boolean} fromViewSelector to know if the caller is the built-in view selector.
     */
    switchView(view: ViewEvents, date: Date = null, fromViewSelector: boolean = false);

    // The events source of truth.

    /**
     * Creates a new event in vue-cal memory (in the mutableEvents array) starting at the given date & time.
     * Proxy method to allow call from cell click & hold or external call (via $refs).
     * Notes: Event duration is by default 2 hours. You can override the event end through eventOptions.
     *
     * @param {String | Date} dateTime date & time at which the event will start.
     * @param {Number} duration the event duration in minutes.
     * @param {Object} eventOptions an object of options to override the event creation defaults.
     *                              (can be any key allowed in an event object)
     * @return {Object} the created event.
     */
    createEvent(dateTime: string | Date, duration: number, eventOptions: Events = {});

    /**
     * Only import locale on demand to keep a small library weight.
     *
     * @param {String|Object} locale the language user whishes to have on vue-cal.
     */
    loadLocale(locale);
  }

  export default VueCal;

  global {
    type VueCalDateTimeFormat =
      | (VueCalTimeFormat & string)
      | 'YYYY' // full year. E.g. `2019`
      | 'YY' //2 last digits of the year. E.g. `19`
      | 'MMMM' //month in full. E.g. `January`
      | 'MMM' // 3 first letters of the month. E.g. `Jan`
      | 'MM' // month number with leading zero. (01-12) E.g. `01`
      | 'M' // month number without leading zero. (1-12) E.g. `1`
      | 'DD' // date of the month with leading zero. (01-31) E.g. `01`
      | 'D' // date of the month without leading zero. (1-31) E.g. `1`
      | 'S' // (usually with surrounding `{ }`) only in English, will output `st`, `nd`, `rd` or `th`.
      | 'dddd' // day of the week in full. E.g. `Monday`
      | 'ddd' // 3 first letters of the day of the week. E.g. `Mon`
      | 'dd' // first letter of the day of the week. E.g. `M`
      | 'd'; // number of the day of the week. (1-7) E.g. `1` for Monday

    type VueCalTimeFormat =
      | string
      | 'HH' // Hours with leading zero, 24-hour format. (00-24)E.g. `20`
      | 'H' // Hours without leading zero, 24-hour format. (0-24)E.g. `20`
      | 'hh' // Hours with leading zero, 12-hour format. E.g. `08`
      | 'h' // Hours without leading zero, 12-hour format. E.g. `8`
      | 'mm' // Minutes with leading zero. E.g. `08`
      | 'm' // Minutes without leading zero. E.g. `8`
      | 'am'; // (usually with surrounding `{ }`) am or pm (also localized if any)

    interface Date {
      addDays(days: number): this;
      subtractDays(days: number): this;
      addHours(hours: number): this;
      subtractHours(hours: number): this;
      addMinutes(minutes: number): this;
      subtractMinutes(minutes: number): this;
      getWeek(): number;
      isToday(): boolean;
      isLeapYear(): boolean;
      format(format: VueCalDateTimeFormat): string;
      formatTime(format: VueCalTimeFormat): string;
    }
  }
}
