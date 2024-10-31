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
    start: string | Date; // '2018-11-19 12:00', // Required.
    end: string | Date; // '2018-11-19 14:00', // Required.
    title?: string; // Optional.
    content?: string; // Optional.
    contentFull?: string; // opens in a  d ialog
    class?: string; // Optional - space-separated css classes.
    background?: boolean; // Optional. (Event type not CSS property)
    split?: number | string; // Optional.
    allDay?: boolean; // Optional.
    deletable?: boolean; // optional - force undeletable when events are editable.
    resizable?: boolean; // optional - force unresizable when events are editable.
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
    startDate: Date; // View start - JS native Date object.
    endDate: Date; // View end - JS native Date object.
    firstCellDate: Date; // Month view only, in case cell is out of current month - JS native Date object.
    lastCellDate: Date; // Month view only, in case cell is out of current month - JS native Date object.
    outOfScopeEvents: Array<Event>; // Month view only, all the events that are out of the current month.
    events: Array<Event>; // All the events in the current view.
    week: number; // Week number. Only returned if view is 'week'.
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
    activeView?: View; //default?: 'week'
    allDayBarHeight?: string | number; //default?: '25px'
    cellClickHold?: boolean; //default?: true
    cellContextmenu?: boolean; //default?: false
    clickToNavigate?: boolean; //default?: false
    dblclickToNavigate?: boolean; //default?: true
    disableDatePrototypes?: boolean; //default?: false
    disableDays?: Array<FormattedDate>; //default?: []
    disableViews?: Array<View>; //default?: []
    dragToCreateEvent?: boolean; //default?: true
    dragToCreateThreshold?: number; //default?: 15
    editableEvents?: boolean | EditableEvents; //default?: false
    events?: Array<Event>; //default?: [
    eventsCountOnYearView?: boolean; //default?: false
    eventsOnMonthView?: boolean | string; //default?: false
    hideBody?: boolean; //default?: false
    hideTitleBar?: boolean; //default?: false
    hideViewSelector?: boolean; //default?: false
    hideWeekdays?: Array<WeekDays>; //default?: []
    hideWeekends?: boolean; //default?: false
    locale?: string; //default?: 'en'
    maxDate?: string | Date; //efault?: ''
    minCellWidth?: number; //default?: 0 // In pixels.
    minDate?: string | Date; //efault?: ''
    minEventWidth?: number; //default?: 0 // In percent.
    minSplitWidth?: number; //default?: 0 // In pixels.
    onEventClick?: Function; //default?: null
    onEventCreate?: Function; //default?: null
    onEventDblclick?: Function; //default?: null
    overlapsPerTimeStep?: boolean; //default?: false
    resizeX?: boolean; //default?: false
    selectedDate?: string | Date; //default?: ''
    showAllDayEvents?: boolean | 'short'; //default?: false
    showWeekNumbers?: boolean | string; //default?: false
    small?: boolean; //default?: false
    snapToTime?: number; //default?: null
    specialHours?: object; //default?: {}
    splitDays?: Array<any>; //default?: [
    startWeekOnSunday?: boolean; //default?: false
    stickySplitLabels?: boolean; //default?: false
    time?: boolean; //default?: true
    timeCellHeight?: number; //default?: 40 // In pixels.
    timeFormat?: string; //default?: ''
    timeFrom?: number; //default?: 0 // In minutes.
    timeStep?: number; //default?: 30 // In minutes.
    timeTo?: number; //default?: 24 * 60 // In minutes.
    todayButton?: boolean; //default?: false
    transitions?: boolean; //default?: true
    twelveHour?: boolean; //default?: false
    xsmall?: boolean; //default?: false
    watchRealTime?: boolean; //default: false
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

    ready: boolean; // Is vue-cal ready.
    texts: any;
    utils: {
      date: any;
      cell: any;
      event: any;
    };
    modules: { dnd: null };

    minutesAtCursor(e: MouseEvent);

    view: VueCalView;
    eventIdIncrement: number; // Internal unique id.
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
      addDays(days: number): this; // adds days to a Date object and returns it. The original Date stays untouched as a copy is made.
      subtractDays(days: number): this; // Subtracts days to a Date object and returns it. The original Date stays untouched as a copy is made.
      addHours(hours: number): this; //Adds hours to a Date object and returns it. The original Date stays untouched as a copy is made. `hours` is an integer.
      subtractHours(hours: number): this; // Subtracts hours to a Date object and returns it. The original Date stays untouched as a copy is made. `hours` is an integer.
      addMinutes(minutes: number): this; // Adds minutes to a Date object and returns it. The original Date stays untouched as a copy is made. `minutes` is an integer.
      subtractMinutes(minutes: number): this; //Subtracts minutes to a Date object and returns it. The original Date stays untouched as a copy is made. `minutes` is an integer.
      getWeek(): number; // Returns the week number (1 to 53) of a date.
      isToday(): boolean; // Returns true if the date is Today.
      isLeapYear(): boolean; //Returns true if the date is in a leap year.
      format(format: VueCalDateTimeFormat): string;
      formatTime(format: VueCalTimeFormat): string;
    }
  }
}
