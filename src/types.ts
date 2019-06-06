
import { Calendar, CalendarDay, CalendarEvent, DaySpan, CalendarInput, Day, Event, Schedule, Units } from 'dayspan';
import Vue from 'vue';
import { Unit } from 'dayspan/typings/DayFunctions';


export interface VDetails
{
  title: string;
  description?: string;
  location?: string;
  color?: string;
  forecolor?: string;
  calendar?: string;
  busy?: boolean;
  icon?: string;
}

export type VMeta = any;

export type VEvent = Event<VDetails, VMeta>;

export type VCalendar = Calendar<VDetails, VMeta>;

export type VCalendarDay = CalendarDay<VDetails, VMeta>;

export type VCalendarEvent = CalendarEvent<VDetails, VMeta>;

export type VCalendarInput = CalendarInput<VDetails, VMeta>;

export type VSchedule = Schedule<VMeta>;

export interface VComponentEvent
{
  type: string;
  mouseEvent?: VComponentEvent;
  calendarEvent?: VCalendarEvent;
  calendar: VCalendar;
  span?: DaySpan;
  details: VDetails;
  
  left?: boolean;

  right?: boolean;
  placeholder?: VCalendarEvent;
  clearPlaceholder?: () => void;

  handled: boolean;

  $event: any; // DOM Event

  $vm: Vue;

  $element: HTMLElement;
}

export type VLocaleEntry = string | 0;

export type VColor = { r: number, g: number, b: number };

export interface VColorOption {
  text: VLocaleEntry;
  value: string;
}

export interface VIconOption { 
  text: VLocaleEntry;
  value: string;
}

export type VLocaleFilter<T> = T extends object 
  ? { [K in keyof T]: T[K] extends VLocaleEntry 
      ? VLocaleEntry 
      : T[K] extends object 
        ? VLocaleFilter<T[K]>
        : never;
    } 
  : never;

export type VLocaleOptions = VLocaleFilter<VPluginOptions>;

export type VLocaleInput<T = VPluginOptions> = T extends object
  ? { [K in keyof T]?: T[K] extends object
      ? VLocaleInput<T[K]>
      : T[K]
    }
  : never;

export type VPluginData<T = VPluginOptions> = {
  [P in keyof T]: T[P] extends Function 
    ? (T[P] extends null ? T[P] : null)
    : T[P];
};

export type VPluginMethods<T = VPluginOptions> = {
  [P in keyof T]: T[P] extends Function 
    ? (T[P] extends null ? never : T[P])
    : never;
};

export type VPlugin = VPluginOptions & Vue;

export type VPromptTypes = 
  'actionRemove' |
  'actionExclude' |
  'actionCancel' |
  'actionUncancel' |
  'actionMove' |
  'actionInclude' |
  'actionSetStart' |
  'actionSetEnd' |
  'move' |
  'toggleAllDay' |
  'removeExistingTime';

export interface VCalendarType
{
  id: string;
  label: VLocaleEntry;
  shortcut: string;
  type: Units;
  size: number;
  focus: number;
  repeat: boolean;
  listTimes: boolean;
  updateRows: boolean;
  schedule: boolean;
}

export interface VPluginOptions
{
  version: string;
  readOnly: boolean;
  today: Day;
  tomorrow: Day;
  now: Day;
  timeout: null | number;
  refreshInterval: number;
  dayPadding: number;
  dayHeight: number;
  columnOffset: number;
  eventHeight: number;
  hourHeight: number;
  inactiveBlendTarget: VColor;
  inactiveBlendAmount: number;
  placeholderBlendAmount: number;
  placeholderBlendTarget: VColor;
  rounding: {
    move:           number;
    add:            number;
    drag:           number;
  };
  supports: {
    title:          boolean;
    description:    boolean;
    color:          boolean;
    location:       boolean;
    calendar:       boolean;
    busy:           boolean;
    icon:           boolean;
    guests:         boolean;
  };
  features: {
    exclude:        boolean;
    include:        boolean;
    cancel:         boolean;
    move:           boolean;
    moveDuplicate:  boolean;
    moveInstance:   boolean;
    moveAll:        boolean;
    drag:           boolean;
    forecast:       boolean;
    addDay:         boolean;
    addTime:        boolean;
    hideOnMove:     boolean;
  };
  prompt: {
    [P in VPromptTypes]: boolean;
  };
  promptOpen: null | ((question: string, callback: (yes: boolean) => any) => any),
  promptLabels: {
    [P in VPromptTypes]: VLocaleEntry;
  };
  placeholder: {
    noTitle:            VLocaleEntry
  };
  colors: VColorOption[];
  icons: VIconOption[];
  defaults: VComponentDefaults,
  locales: {
    [locale: string]: VLocaleInput
  };
  currentLocale: string;
  fullscreenPopovers: boolean;
  fullscreenDialogs: boolean;
  normalizeLocaleName(this: VPlugin, name: string): string;
  getLocale(this: VPlugin, name: string): VLocaleInput
  setLocale(this: VPlugin, name: string, strict: boolean): void;
  addLocale(this: VPlugin, name: string, locale: VLocaleInput): void;
  addLocales(this: VPlugin, names: string[], locale: VLocaleInput): void;
  updateLocale(this: VPlugin, name: string, update: VLocaleInput, strict: boolean): void;  
  init(this: VPlugin): void;
  setEventDetails(this: VPlugin, details: VDetails, data: VDetails, event: VEvent, calendarEvent: VCalendarEvent): void;
  copyEventDetails(this: VPlugin, details: VDetails): VDetails;
  createEventData(this: VPlugin, details: VDetails, schedule: VSchedule): VDetails;
  createEvent(this: VPlugin, details: VDetails, schedule: VSchedule, forPlaceholder: boolean): VEvent;
  getDefaultEventDetails(this: VPlugin): VDetails;
  getDefaultEventColor(this: VPlugin): string;
  isValidEvent(this: VPlugin, details: VDetails, schedule: VSchedule, calendarEvent: VCalendarEvent): boolean;
  requiresPermission(this: VPlugin, type: VPromptTypes): boolean;
  getPermission(this: VPlugin, type: VPromptTypes, granted: (granted: boolean) => any, denied: () => any): void;
  getPrefix(this: VPlugin, calendarEvent: VCalendarEvent, sameDay: DaySpan[]): string;
  getScheduleDescription(this: VPlugin, schedule: VSchedule): string;
  getEventOccurrence(this: VPlugin, schedule: VSchedule, start: Day, labels: { [key: string]: string }, formats: { [key: string]: string }): string;
  getEventAgendaWhen(this: VPlugin, calendarEvent: VCalendarEvent, labels: { [key: string]: string }, formats: { [key: string]: string }): string;
  getEventDuration(this: VPlugin, schedule: VSchedule, labels: { [P in Unit]?: string }): string;
  getPlaceholderEventDetails(this: VPlugin): VDetails;
  getPlaceholderEventForAdd(this: VPlugin, time: Day): VCalendarEvent;
  getPlaceholderEventForMove(this: VPlugin, original: VCalendarEvent): VCalendarEvent;
  getStyleFull(this: VPlugin, details: VDetails, calendarEvent: VCalendarEvent, index: number): object;
  getStyleTimed(this: VPlugin, details: VDetails, calendarEvent: VCalendarEvent): object;
  getStylePopover(this: VPlugin, details: VDetails, calendarEvent: VCalendarEvent): object;
  getStyleNowBorder(this: VPlugin): string;
  getStyleNow(this: VPlugin): object;
  getStyleColor(this: VPlugin, details: VDetails, calendarEvent: VCalendarEvent, past?: boolean, cancelled?: boolean): string;
  getStylePlaceholderTimed(this: VPlugin, details: VDetails, placeholder: VCalendarEvent, forDay: Day): object;
  getStylePlaceholderFull(this: VPlugin, details: VDetails, calendarEvent: VCalendarEvent, index: number, forDay: Day): object;
  parseColor(this: VPlugin, color: VColor | string): VColor;
  clampComponent(this: VPlugin, c: number): number;
  clampColor(this: VPlugin, color: VColor, out?: VColor): VColor;
  formatComponent(this: VPlugin, c: number): string;
  formatColor(this: VPlugin, color: VColor): string;
  blend(this: VPlugin, from: VColor | string, delta: number, to: VColor | string): string;
  roundTime(this: VPlugin, day: Day, millis: number, up: boolean): Day;
  startRefreshTimes(this: VPlugin): void;
  stopRefreshTimes(this: VPlugin): void;
  refreshTimes(this: VPlugin, force?: boolean): void;
}

export interface VComponentDefaults {
  dsCalendar: {
    handleAdd: boolean;
    handleMove: boolean;
  };
  dsDay: {
    formats: {
      month: VLocaleEntry
    }
  };
  dsCalendarApp: {
    allowsAddToday: boolean;
    types: VCalendarType[];
    formats: {
      today: VLocaleEntry;
      xs: VLocaleEntry;
    };
    labels: {
      next: (type: VCalendarType) => VLocaleEntry;
      prev: (type: VCalendarType) => VLocaleEntry;
      moveCancel: VLocaleEntry;
      moveSingleEvent: VLocaleEntry;
      moveOccurrence: VLocaleEntry;
      moveAll: VLocaleEntry;
      moveDuplicate: VLocaleEntry;
      promptConfirm: VLocaleEntry;
      promptCancel: VLocaleEntry;
      today: VLocaleEntry;
      todayIcon: string;
    },
    styles: {
      toolbar: {
        small: object;
        large: object;
      }
    },
    optionsDialog: {
      maxWidth: string;
      persistent: boolean;
    },
    promptDialog: {
      maxWidth: string;
      persistent: boolean;
    }
  },

  dsAgenda: {

  },

  dsAgendaDay: {

  },

  dsAgendaEvent: {
    popoverProps: {
      closeOnContentClick: boolean;
      offsetOverflow: boolean;
      offsetY: boolean;
      maxWidth: number;
    },
    formats: {
      firstLine:  VLocaleEntry;
      secondLine: VLocaleEntry;
      start:      VLocaleEntry;
      time:       VLocaleEntry;
    },
    labels: {
      allDay:   VLocaleEntry;
      options:  VLocaleEntry;
      close:    VLocaleEntry;
      day:      [VLocaleEntry, VLocaleEntry],
      days:     [VLocaleEntry, VLocaleEntry],
      minute:   [VLocaleEntry, VLocaleEntry],
      minutes:  [VLocaleEntry, VLocaleEntry],
      hour:     [VLocaleEntry, VLocaleEntry],
      hours:    [VLocaleEntry, VLocaleEntry],
      week:     [VLocaleEntry, VLocaleEntry],
      weeks:    [VLocaleEntry, VLocaleEntry],
      second:   [VLocaleEntry, VLocaleEntry],
      seconds:  [VLocaleEntry, VLocaleEntry],
      busy:     VLocaleEntry;
      free:     VLocaleEntry;
    }
  },

  dsCalendarEvent: {
    index: number;
    popoverProps: {
      nudgeWidth: number;
      closeOnContentClick: boolean;
      offsetOverflow: boolean;
      offsetX: boolean;
      maxWidth: number;
    }
  },

  dsCalendarEventChip: {
    canExclude: boolean;
    colors: {
      sameForeground:   string;
      sameBackground:   string;
    };
    formats: {
      fullDay:          VLocaleEntry;
      timed:            VLocaleEntry;
    }
  },

  dsCalendarEventPopover: {
    allowEditOnReadOnly: boolean;
    formats: {
      start:    VLocaleEntry;
      time:     VLocaleEntry;
    },
    labels: {
      allDay:   VLocaleEntry;
      options:  VLocaleEntry;
      close:    VLocaleEntry;
      day:      [VLocaleEntry, VLocaleEntry],
      days:     [VLocaleEntry, VLocaleEntry],
      minute:   [VLocaleEntry, VLocaleEntry],
      minutes:  [VLocaleEntry, VLocaleEntry],
      hour:     [VLocaleEntry, VLocaleEntry],
      hours:    [VLocaleEntry, VLocaleEntry],
      week:     [VLocaleEntry, VLocaleEntry],
      weeks:    [VLocaleEntry, VLocaleEntry],
      second:   [VLocaleEntry, VLocaleEntry],
      seconds:  [VLocaleEntry, VLocaleEntry],
      busy:     VLocaleEntry;
      free:     VLocaleEntry;
    }
  },

  dsCalendarEventCreatePopover: {
    prompts: {
      description:  boolean;
      color:        boolean;
      location:     boolean;
      calendar:     boolean;
      busy:         boolean;
      icon:         boolean;
      guests:       boolean;
    },
    formats: {
      start:    VLocaleEntry;
      time:     VLocaleEntry;
    },
    icons: {
      save:     string;
      close:    string;
      edit:     string;
    },
    labels: {
      title:    VLocaleEntry;
      allDay:   VLocaleEntry;
      close:    VLocaleEntry;
      save:     VLocaleEntry;
      day:      [VLocaleEntry, VLocaleEntry],
      days:     [VLocaleEntry, VLocaleEntry],
      minute:   [VLocaleEntry, VLocaleEntry],
      minutes:  [VLocaleEntry, VLocaleEntry],
      hour:     [VLocaleEntry, VLocaleEntry],
      hours:    [VLocaleEntry, VLocaleEntry],
      week:     [VLocaleEntry, VLocaleEntry],
      weeks:    [VLocaleEntry, VLocaleEntry],
      second:   [VLocaleEntry, VLocaleEntry],
      seconds:  [VLocaleEntry, VLocaleEntry],
      busy:     VLocaleEntry;
      free:     VLocaleEntry;
      location: VLocaleEntry;
      description: VLocaleEntry;
      calendar: VLocaleEntry;
    },
    busyOptions: {
      value: boolean; 
      text: VLocaleEntry
    }[]
  },

  dsCalendarEventPlaceholder: {
    popoverProps: {
      nudgeWidth: number;
      closeOnContentClick: boolean;
      closeOnClick: boolean;
      offsetOverflow: boolean;
      offsetX: boolean;
      maxWidth: number;
    }
  },

  dsCalendarEventTimePlaceholder: {
    popoverProps: {
      nudgeWidth: number;
      closeOnContentClick: boolean;
      closeOnClick: boolean;
      offsetOverflow: boolean;
      offsetX: boolean;
      maxWidth: number;
    }
  },

  dsCalendarEventTime: {
    placeholderStyle: boolean;
    disabled: boolean;
    popoverProps: {
      nudgeWidth: number;
      closeOnContentClick: boolean;
      offsetOverflow: boolean;
      offsetX: boolean;
      maxWidth: number;
    }
  },

  dsIdentifierChip: {
    description: string;
    short: boolean;
    canRemove: boolean;
  },

  dsSchedule: {
    allowsRange: boolean;
    labels: {
      editCustom:   VLocaleEntry;
    }
  },

  dsEvent: {
    hasTitle: boolean;
    hasCancel: boolean;
    hasSave: boolean;
    canSave: boolean;
    hasTabs: boolean;
    hasDetails: boolean;
    hasForecast: boolean;
    hasExclusions: boolean;
    hasInclusions: boolean;
    hasCancelled: boolean;
    labels: {
      moreActions:  VLocaleEntry;
      cancel:       VLocaleEntry;
      save:         VLocaleEntry;
      title:        VLocaleEntry;
      exclusions:   VLocaleEntry;
      inclusions:   VLocaleEntry;
      cancelled:    VLocaleEntry;
      edit:         VLocaleEntry;
      add:          VLocaleEntry;
      location:     VLocaleEntry;
      description:  VLocaleEntry;
      calendar:     VLocaleEntry;
      tabs: {
        details:    VLocaleEntry;
        forecast:   VLocaleEntry;
        removed:    VLocaleEntry;
        added:      VLocaleEntry;
        cancelled:  VLocaleEntry;
      }
    },
    busyOptions: {
      value: boolean; 
      text: VLocaleEntry;
    }[];
  },

  dsScheduleActions: {
    allowRemove: boolean;
    allowExclude: boolean;
    allowCancel: boolean;
    allowUncancel: boolean;
    allowMove: boolean;
    allowInclude: boolean;
    allowSetStart: boolean;
    allowSetEnd: boolean;
    labels: {
      remove:     VLocaleEntry;
      exclude:    VLocaleEntry;
      cancel:     VLocaleEntry;
      uncancel:   VLocaleEntry;
      move:       VLocaleEntry;
      include:    VLocaleEntry;
      setStart:   VLocaleEntry;
      setEnd:     VLocaleEntry;
    }
  },

  dsEventDialog: {
    dialogProps: {
      persistent: boolean;
      lazy: boolean;
      maxWidth: string;
    }
  },

  dsScheduleForecast: {
    canExclude: boolean;
    hasDescription: boolean;
    defaultSize: number;
    sizeMax: number;
    labels: {
      prefix:     VLocaleEntry;
      suffix:     VLocaleEntry;
    }
  },

  dsScheduleFrequencyDay: {
    labels: {
      type: VLocaleEntry;
    },
    options: [
      { text: VLocaleEntry, value: 'any'},
      { text: VLocaleEntry, value: 'oneof'},
      { text: VLocaleEntry, value: 'every'}
    ],
    types: [
      { text: VLocaleEntry, property: 'dayOfMonth', max: 32, min: 1 },
      { text: VLocaleEntry, property: 'lastDayOfMonth', max: 32, min: 1 },
      { text: VLocaleEntry, property: 'dayOfYear', max: 367, min: 1, offset: -1 }
    ]
  },

  dsScheduleFrequencyDayOfWeek: {
    weekdays: [VLocaleEntry, VLocaleEntry, VLocaleEntry, VLocaleEntry, VLocaleEntry, VLocaleEntry, VLocaleEntry],
    labels: {
      type: VLocaleEntry;
    },
    options: [
      { text: VLocaleEntry, value: 'any'},
      { text: VLocaleEntry, value: 'oneof'},
      { text: VLocaleEntry, value: 'every'},
      { text: VLocaleEntry, value: 'weekend'},
      { text: VLocaleEntry, value: 'weekday'}
    ]
  },

  dsScheduleFrequencyMonth: {
    months: [VLocaleEntry, VLocaleEntry, VLocaleEntry, VLocaleEntry, VLocaleEntry, VLocaleEntry, VLocaleEntry, VLocaleEntry, VLocaleEntry, VLocaleEntry, VLocaleEntry, VLocaleEntry],
    labels: {
      type: VLocaleEntry;
    },
    options: [
      { text: VLocaleEntry, value: 'any'},
      { text: VLocaleEntry, value: 'oneof'},
      { text: VLocaleEntry, value: 'every'}
    ]
  },

  dsScheduleFrequencyWeek: {
    labels: {
      type: VLocaleEntry;
    },
    options: [
      { text: VLocaleEntry, value: 'any'},
      { text: VLocaleEntry, value: 'oneof'},
      { text: VLocaleEntry, value: 'every'}
    ],
    types: [
      { text: VLocaleEntry, property: 'weekOfMonth', max: 6 },
      { text: VLocaleEntry, property: 'weekspanOfMonth', max: 7, min: 1, offset: -1 },
      { text: VLocaleEntry, property: 'fullWeekOfMonth', max: 6 },
      { text: VLocaleEntry, property: 'lastWeekspanOfMonth', max: 7, min: 1, offset: -1 },
      { text: VLocaleEntry, property: 'lastFullWeekOfMonth', max: 6 },
      { text: VLocaleEntry, property: 'weekOfYear', max: 54 },
      { text: VLocaleEntry, property: 'weekspanOfYear', max: 53, min: 1, offset: -1 },
      { text: VLocaleEntry, property: 'fullWeekOfYear', max: 54 },
      { text: VLocaleEntry, property: 'lastWeekspanOfYear', max: 53, min: 1, offset: -1 },
      { text: VLocaleEntry, property: 'lastFullWeekOfYear', max: 54 }
    ]
  },

  dsScheduleFrequencyYear: {
    lookback: number;
    lookahead: number;
    labels: {
      type: VLocaleEntry;
    },
    options: [
      { text: VLocaleEntry, value: 'any'},
      { text: VLocaleEntry, value: 'oneof'},
      { text: VLocaleEntry, value: 'every'}
    ]
  },

  dsScheduleModifier: {
    canRemove: boolean;
    description: string;
  },

  dsScheduleSpan: {
    labels: {
      startless:  VLocaleEntry,
      endless:    VLocaleEntry;
    },
    formats: {
      start:      VLocaleEntry,
      end:        VLocaleEntry;
    }
  },

  dsScheduleTime: {
    index: number;
    mutate: boolean;
    showAdd: boolean;
    showRemove: boolean;
    labels: {
      remove:     VLocaleEntry;
      add:        VLocaleEntry;
    },
    colors: {
      add:        string;
      remove:     string;
    },
    icons: {
      add:        string;
      remove:     string;
    }
  },

  dsScheduleTimes: {
    defaultTime:  string;
    labels: {
      all:        VLocaleEntry;
      minute:     VLocaleEntry;
      minutes:    VLocaleEntry;
      hour:       VLocaleEntry;
      hours:      VLocaleEntry;
      day:        VLocaleEntry;
      days:       VLocaleEntry;
      week:       VLocaleEntry;
      weeks:      VLocaleEntry;
      month:      VLocaleEntry;
      months:     VLocaleEntry;
      second:     VLocaleEntry;
      seconds:    VLocaleEntry;
    };
  },

  dsScheduleType: {
    formats: {
      date:       VLocaleEntry;
    }
  },

  dsScheduleTypeCustomDialog: {
    dialogProps: {
      maxWidth: string;
      persistent: boolean;
      lazy: boolean;
    },
    labels: {
      save:     VLocaleEntry;
      cancel:   VLocaleEntry;
    }
  },

  dsDayPicker: {
    weekdays: [VLocaleEntry, VLocaleEntry, VLocaleEntry, VLocaleEntry, VLocaleEntry, VLocaleEntry, VLocaleEntry];
    labels: {
      prevMonth: VLocaleEntry;
      nextMonth: VLocaleEntry;
    }
  },

  dsWeekDayHeader: {
    formats: {
      weekday:    VLocaleEntry;
    }
  },

  dsWeeksView: {
    weekdays: [VLocaleEntry, VLocaleEntry, VLocaleEntry, VLocaleEntry, VLocaleEntry, VLocaleEntry, VLocaleEntry]
  },

  dsDaysView: {
    scrollToFirst: boolean;
    scrollBuffer: number;
    hours: [
      VLocaleEntry, VLocaleEntry, VLocaleEntry, VLocaleEntry, VLocaleEntry, VLocaleEntry, VLocaleEntry, VLocaleEntry, VLocaleEntry, VLocaleEntry, VLocaleEntry, VLocaleEntry,
      VLocaleEntry, VLocaleEntry, VLocaleEntry, VLocaleEntry, VLocaleEntry, VLocaleEntry, VLocaleEntry, VLocaleEntry, VLocaleEntry, VLocaleEntry, VLocaleEntry, VLocaleEntry
    ]
  },

  dsGestures: {
    minDistance: number;
    maxDistance: number;
    maxWander: number;
  }

}