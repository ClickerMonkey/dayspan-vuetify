
import { Units } from 'dayspan';

const LOCALE_ENTRY = 0;

export default {

  dsCalendar: {
    handleAdd: true,
    handleMove: true
  },

  dsDay: {
    formats: {
      month: LOCALE_ENTRY
    }
  },

  dsCalendarApp: {
    allowsAddToday: true,
    types: [
      {id: 'D', label: LOCALE_ENTRY, shortcut: 'D', type: Units.DAY,   size: 1,  focus: 0.4999, repeat: true,  listTimes: true,  updateRows: true,  schedule: false },
      {id: 'W', label: LOCALE_ENTRY, shortcut: 'W', type: Units.WEEK,  size: 1,  focus: 0.4999, repeat: true,  listTimes: true,  updateRows: true,  schedule: false },
      {id: 'M', label: LOCALE_ENTRY, shortcut: 'M', type: Units.MONTH, size: 1,  focus: 0.4999, repeat: true,  listTimes: false, updateRows: true,  schedule: false },
      {id: 'Y', label: LOCALE_ENTRY, shortcut: 'Y', type: Units.YEAR,  size: 1,  focus: 0.4999, repeat: true,  listTimes: false, updateRows: true,  schedule: false },
      {id: 'S', label: LOCALE_ENTRY, shortcut: 'S', type: Units.DAY,   size: 92, focus: 0.0000, repeat: false, listTimes: false, updateRows: false, schedule: true },
      {id: 'X', label: LOCALE_ENTRY, shortcut: 'X', type: Units.DAY,   size: 4,  focus: 0.4999, repeat: true,  listTimes: true,  updateRows: true,  schedule: false }
    ],
    formats: {
      today: LOCALE_ENTRY,
      xs: LOCALE_ENTRY
    },
    labels: {
      next: LOCALE_ENTRY,
      prev: LOCALE_ENTRY,
      moveCancel: LOCALE_ENTRY,
      moveSingleEvent: LOCALE_ENTRY,
      moveOccurrence: LOCALE_ENTRY,
      moveAll: LOCALE_ENTRY,
      moveDuplicate: LOCALE_ENTRY,
      promptConfirm: LOCALE_ENTRY,
      promptCancel: LOCALE_ENTRY,
      today: LOCALE_ENTRY,
      todayIcon: 'today'
    },
    styles: {
      toolbar: {
        small: { width: 'auto' },
        large: { width: '300px' }
      }
    },
    optionsDialog: {
      maxWidth: '300px',
      persistent: true
    },
    promptDialog: {
      maxWidth: '300px',
      persistent: true
    }
  },

  dsAgenda: {

  },

  dsAgendaDay: {

  },

  dsAgendaEvent: {
    popoverProps: {
      closeOnContentClick: false,
      offsetOverflow: true,
      offsetY: true,
      maxWidth: 500
    },
    formats: {
      firstLine:  LOCALE_ENTRY,
      secondLine: LOCALE_ENTRY,
      start:      LOCALE_ENTRY,
      time:       LOCALE_ENTRY
    },
    labels: {
      allDay:   LOCALE_ENTRY,
      options:  LOCALE_ENTRY,
      close:    LOCALE_ENTRY,
      day:      [LOCALE_ENTRY, LOCALE_ENTRY],
      days:     [LOCALE_ENTRY, LOCALE_ENTRY],
      minute:   [LOCALE_ENTRY, LOCALE_ENTRY],
      minutes:  [LOCALE_ENTRY, LOCALE_ENTRY],
      hour:     [LOCALE_ENTRY, LOCALE_ENTRY],
      hours:    [LOCALE_ENTRY, LOCALE_ENTRY],
      week:     [LOCALE_ENTRY, LOCALE_ENTRY],
      weeks:    [LOCALE_ENTRY, LOCALE_ENTRY],
      second:   [LOCALE_ENTRY, LOCALE_ENTRY],
      seconds:  [LOCALE_ENTRY, LOCALE_ENTRY],
      busy:     LOCALE_ENTRY,
      free:     LOCALE_ENTRY
    }
  },

  dsCalendarEvent: {
    index: 0,
    popoverProps: {
      nudgeWidth: 200,
      closeOnContentClick: false,
      offsetOverflow: true,
      offsetX: true,
      maxWidth: 500
    }
  },

  dsCalendarEventChip: {
    canExclude: true,
    colors: {
      sameForeground:   'white',
      sameBackground:   'primary'
    },
    formats: {
      fullDay:          LOCALE_ENTRY,
      timed:            LOCALE_ENTRY
    }
  },

  dsCalendarEventPopover: {
    allowEditOnReadOnly: true,
    formats: {
      start:    LOCALE_ENTRY,
      time:     LOCALE_ENTRY
    },
    labels: {
      allDay:   LOCALE_ENTRY,
      options:  LOCALE_ENTRY,
      close:    LOCALE_ENTRY,
      day:      [LOCALE_ENTRY, LOCALE_ENTRY],
      days:     [LOCALE_ENTRY, LOCALE_ENTRY],
      minute:   [LOCALE_ENTRY, LOCALE_ENTRY],
      minutes:  [LOCALE_ENTRY, LOCALE_ENTRY],
      hour:     [LOCALE_ENTRY, LOCALE_ENTRY],
      hours:    [LOCALE_ENTRY, LOCALE_ENTRY],
      week:     [LOCALE_ENTRY, LOCALE_ENTRY],
      weeks:    [LOCALE_ENTRY, LOCALE_ENTRY],
      second:   [LOCALE_ENTRY, LOCALE_ENTRY],
      seconds:  [LOCALE_ENTRY, LOCALE_ENTRY],
      busy:     LOCALE_ENTRY,
      free:     LOCALE_ENTRY
    }
  },

  dsCalendarEventCreatePopover: {
    prompts: {
      description:  true,
      color:        true,
      location:     true,
      calendar:     true,
      busy:         true,
      icon:         true,
      guests:       false
    },
    formats: {
      start:    LOCALE_ENTRY,
      time:     LOCALE_ENTRY
    },
    icons: {
      save:     'save',
      close:    'close',
      edit:     'edit'
    },
    labels: {
      title:    LOCALE_ENTRY,
      allDay:   LOCALE_ENTRY,
      close:    LOCALE_ENTRY,
      save:     LOCALE_ENTRY,
      day:      [LOCALE_ENTRY, LOCALE_ENTRY],
      days:     [LOCALE_ENTRY, LOCALE_ENTRY],
      minute:   [LOCALE_ENTRY, LOCALE_ENTRY],
      minutes:  [LOCALE_ENTRY, LOCALE_ENTRY],
      hour:     [LOCALE_ENTRY, LOCALE_ENTRY],
      hours:    [LOCALE_ENTRY, LOCALE_ENTRY],
      week:     [LOCALE_ENTRY, LOCALE_ENTRY],
      weeks:    [LOCALE_ENTRY, LOCALE_ENTRY],
      second:   [LOCALE_ENTRY, LOCALE_ENTRY],
      seconds:  [LOCALE_ENTRY, LOCALE_ENTRY],
      busy:     LOCALE_ENTRY,
      free:     LOCALE_ENTRY,
      location: LOCALE_ENTRY,
      description: LOCALE_ENTRY,
      calendar: LOCALE_ENTRY,
    },
    busyOptions: [
      {value: true, text: LOCALE_ENTRY},
      {value: false, text: LOCALE_ENTRY}
    ]
  },

  dsCalendarEventPlaceholder: {
    popoverProps: {
      nudgeWidth: 200,
      closeOnContentClick: false,
      closeOnClick: true,
      offsetOverflow: true,
      offsetX: true,
      maxWidth: 500
    }
  },

  dsCalendarEventTimePlaceholder: {
    popoverProps: {
      nudgeWidth: 200,
      closeOnContentClick: false,
      closeOnClick: true,
      offsetOverflow: true,
      offsetX: true,
      maxWidth: 500
    }
  },

  dsCalendarEventTime: {
    placeholderStyle: false,
    disabled: false,
    popoverProps: {
      nudgeWidth: 200,
      closeOnContentClick: false,
      offsetOverflow: true,
      offsetX: true,
      maxWidth: 500
    }
  },

  dsIdentifierChip: {
    description: '',
    short: true,
    canRemove: true
  },

  dsSchedule: {
    allowsRange: true,
    labels: {
      editCustom:   LOCALE_ENTRY
    }
  },

  dsEvent: {
    hasTitle: true,
    hasCancel: true,
    hasSave: true,
    canSave: true,
    hasTabs: true,
    hasDetails: true,
    hasForecast: true,
    hasExclusions: true,
    hasInclusions: true,
    hasCancelled: true,
    labels: {
      moreActions:  LOCALE_ENTRY,
      cancel:       LOCALE_ENTRY,
      save:         LOCALE_ENTRY,
      title:        LOCALE_ENTRY,
      exclusions:   LOCALE_ENTRY,
      inclusions:   LOCALE_ENTRY,
      cancelled:    LOCALE_ENTRY,
      edit:         LOCALE_ENTRY,
      add:          LOCALE_ENTRY,
      location:     LOCALE_ENTRY,
      description:  LOCALE_ENTRY,
      calendar:     LOCALE_ENTRY,
      tabs: {
        details:    LOCALE_ENTRY,
        forecast:   LOCALE_ENTRY,
        removed:    LOCALE_ENTRY,
        added:      LOCALE_ENTRY,
        cancelled:  LOCALE_ENTRY
      }
    },
    busyOptions: [
      {value: true, text: LOCALE_ENTRY},
      {value: false, text: LOCALE_ENTRY}
    ]
  },

  dsScheduleActions: {
    allowRemove: true,
    allowExclude: true,
    allowCancel: true,
    allowUncancel: true,
    allowMove: true,
    allowInclude: true,
    allowSetStart: true,
    allowSetEnd: true,
    labels: {
      remove:     LOCALE_ENTRY,
      exclude:    LOCALE_ENTRY,
      cancel:     LOCALE_ENTRY,
      uncancel:   LOCALE_ENTRY,
      move:       LOCALE_ENTRY,
      include:    LOCALE_ENTRY,
      setStart:   LOCALE_ENTRY,
      setEnd:     LOCALE_ENTRY
    }
  },

  dsEventDialog: {
    dialogProps: {
      persistent: true,
      lazy: true,
      maxWidth: '800px'
    }
  },

  dsScheduleForecast: {
    canExclude: true,
    hasDescription: true,
    defaultSize: 5,
    sizeMax: 100,
    labels: {
      prefix:     LOCALE_ENTRY,
      suffix:     LOCALE_ENTRY
    }
  },

  dsScheduleFrequencyDay: {
    labels: {
      type: LOCALE_ENTRY
    },
    options: [
      { text: LOCALE_ENTRY, value: 'any'},
      { text: LOCALE_ENTRY, value: 'oneof'},
      { text: LOCALE_ENTRY, value: 'every'}
    ],
    types: [
      { text: LOCALE_ENTRY, property: 'dayOfMonth', max: 32, min: 1 },
      { text: LOCALE_ENTRY, property: 'lastDayOfMonth', max: 32, min: 1 },
      { text: LOCALE_ENTRY, property: 'dayOfYear', max: 367, min: 1, offset: -1 }
    ]
  },

  dsScheduleFrequencyDayOfWeek: {
    weekdays: [LOCALE_ENTRY, LOCALE_ENTRY, LOCALE_ENTRY, LOCALE_ENTRY, LOCALE_ENTRY, LOCALE_ENTRY, LOCALE_ENTRY],
    labels: {
      type: LOCALE_ENTRY
    },
    options: [
      { text: LOCALE_ENTRY, value: 'any'},
      { text: LOCALE_ENTRY, value: 'oneof'},
      { text: LOCALE_ENTRY, value: 'every'},
      { text: LOCALE_ENTRY, value: 'weekend'},
      { text: LOCALE_ENTRY, value: 'weekday'}
    ]
  },

  dsScheduleFrequencyMonth: {
    months: [LOCALE_ENTRY, LOCALE_ENTRY, LOCALE_ENTRY, LOCALE_ENTRY, LOCALE_ENTRY, LOCALE_ENTRY, LOCALE_ENTRY, LOCALE_ENTRY, LOCALE_ENTRY, LOCALE_ENTRY, LOCALE_ENTRY, LOCALE_ENTRY],
    labels: {
      type: LOCALE_ENTRY
    },
    options: [
      { text: LOCALE_ENTRY, value: 'any'},
      { text: LOCALE_ENTRY, value: 'oneof'},
      { text: LOCALE_ENTRY, value: 'every'}
    ]
  },

  dsScheduleFrequencyWeek: {
    labels: {
      type: LOCALE_ENTRY
    },
    options: [
      { text: LOCALE_ENTRY, value: 'any'},
      { text: LOCALE_ENTRY, value: 'oneof'},
      { text: LOCALE_ENTRY, value: 'every'}
    ],
    types: [
      { text: LOCALE_ENTRY, property: 'weekOfMonth', max: 6 },
      { text: LOCALE_ENTRY, property: 'weekspanOfMonth', max: 7, min: 1, offset: -1 },
      { text: LOCALE_ENTRY, property: 'fullWeekOfMonth', max: 6 },
      { text: LOCALE_ENTRY, property: 'lastWeekspanOfMonth', max: 7, min: 1, offset: -1 },
      { text: LOCALE_ENTRY, property: 'lastFullWeekOfMonth', max: 6 },
      { text: LOCALE_ENTRY, property: 'weekOfYear', max: 54 },
      { text: LOCALE_ENTRY, property: 'weekspanOfYear', max: 53, min: 1, offset: -1 },
      { text: LOCALE_ENTRY, property: 'fullWeekOfYear', max: 54 },
      { text: LOCALE_ENTRY, property: 'lastWeekspanOfYear', max: 53, min: 1, offset: -1 },
      { text: LOCALE_ENTRY, property: 'lastFullWeekOfYear', max: 54 }
    ]
  },

  dsScheduleFrequencyYear: {
    lookback: 5,
    lookahead: 20,
    labels: {
      type: LOCALE_ENTRY
    },
    options: [
      { text: LOCALE_ENTRY, value: 'any'},
      { text: LOCALE_ENTRY, value: 'oneof'},
      { text: LOCALE_ENTRY, value: 'every'}
    ]
  },

  dsScheduleModifier: {
    canRemove: true,
    description: ''
  },

  dsScheduleSpan: {
    labels: {
      startless:  LOCALE_ENTRY,
      endless:    LOCALE_ENTRY
    },
    formats: {
      start:      LOCALE_ENTRY,
      end:        LOCALE_ENTRY
    }
  },

  dsScheduleTime: {
    index: -1,
    mutate: true,
    showAdd: false,
    showRemove: false,
    labels: {
      remove:     LOCALE_ENTRY,
      add:        LOCALE_ENTRY
    },
    colors: {
      add:        'secondary',
      remove:     'secondary'
    },
    icons: {
      add:        'add',
      remove:     'remove'
    }
  },

  dsScheduleTimes: {
    defaultTime: '08:00',
    labels: {
      all:        LOCALE_ENTRY,
      minute:     LOCALE_ENTRY,
      minutes:    LOCALE_ENTRY,
      hour:       LOCALE_ENTRY,
      hours:      LOCALE_ENTRY,
      day:        LOCALE_ENTRY,
      days:       LOCALE_ENTRY,
      week:       LOCALE_ENTRY,
      weeks:      LOCALE_ENTRY,
      month:      LOCALE_ENTRY,
      months:     LOCALE_ENTRY,
      second:     LOCALE_ENTRY,
      seconds:    LOCALE_ENTRY
    }
  },

  dsScheduleType: {
    formats: {
      date:       LOCALE_ENTRY
    }
  },

  dsScheduleTypeCustomDialog: {
    dialogProps: {
      maxWidth: '600px',
      persistent: true,
      lazy: true
    },
    labels: {
      save:     LOCALE_ENTRY,
      cancel:   LOCALE_ENTRY
    }
  },

  dsDayPicker: {
    weekdays: [LOCALE_ENTRY, LOCALE_ENTRY, LOCALE_ENTRY, LOCALE_ENTRY, LOCALE_ENTRY, LOCALE_ENTRY, LOCALE_ENTRY],
    labels: {
      prevMonth: LOCALE_ENTRY,
      nextMonth: LOCALE_ENTRY
    }
  },

  dsWeekDayHeader: {
    formats: {
      weekday:    LOCALE_ENTRY
    }
  },

  dsWeeksView: {
    weekdays: [LOCALE_ENTRY, LOCALE_ENTRY, LOCALE_ENTRY, LOCALE_ENTRY, LOCALE_ENTRY, LOCALE_ENTRY, LOCALE_ENTRY]
  },

  dsDaysView: {
    scrollToFirst: true,
    scrollBuffer: 60,
    hours: [
      LOCALE_ENTRY, LOCALE_ENTRY, LOCALE_ENTRY, LOCALE_ENTRY, LOCALE_ENTRY, LOCALE_ENTRY, LOCALE_ENTRY, LOCALE_ENTRY, LOCALE_ENTRY, LOCALE_ENTRY, LOCALE_ENTRY, LOCALE_ENTRY,
      LOCALE_ENTRY, LOCALE_ENTRY, LOCALE_ENTRY, LOCALE_ENTRY, LOCALE_ENTRY, LOCALE_ENTRY, LOCALE_ENTRY, LOCALE_ENTRY, LOCALE_ENTRY, LOCALE_ENTRY, LOCALE_ENTRY, LOCALE_ENTRY
    ]
  },

  dsGestures: {
    minDistance: 50,
    maxDistance: 200,
    maxWander: 0.1
  }

};
