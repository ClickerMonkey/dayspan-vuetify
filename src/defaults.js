
import { Units } from 'dayspan';
import * as moment from 'moment';


export default {

  dsCalendar: {
    handleAdd: true,
    handleMove: true
  },

  dsDay: {
    formats: {
      month:  'MMM'
    }
  },

  dsCalendarApp: {
    allowsAddToday: true,
    types: [
      {id: 'D', label: 'Day',     shortcut: 'D', type: Units.DAY,   size: 1},
      {id: 'W', label: 'Week',    shortcut: 'W', type: Units.WEEK,  size: 1},
      {id: 'M', label: 'Month ',  shortcut: 'M', type: Units.MONTH, size: 1},
      {id: 'Y', label: 'Year',    shortcut: 'Y', type: Units.YEAR,  size: 1},
      {id: 'X', label: '4 days',  shortcut: 'X', type: Units.DAY,   size: 4}
    ],
    formats: {
      today: 'dddd, MMMM D',
      xs: 'MMM'
    },
    labels: {
      next: (type) => type ? 'Next ' + type.label.toLowerCase() : 'Next',
      prev: (type) => type ? 'Previous ' + type.label.toLowerCase() : 'Previous',
      moveCancel: 'Cancel move',
      moveSingleEvent: 'Move event',
      moveOccurrence: 'Move just this event occurrence',
      moveAll: 'Move all event occurrences',
      moveDuplicate: 'Add event occurrence',
      promptConfirm: 'Yes',
      promptCancel: 'No',
      today: 'TODAY',
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
      fullDay:          'ddd MMM Do YYYY',
      timed:            'ddd MMM Do YYYY'
    }
  },

  dsCalendarEventPopover: {
    formats: {
      start:    'dddd, MMMM D',
      time:     'h:mm a'
    },
    labels: {
      allDay:   'All day',
      options:  'Options',
      close:    'Close',
      day:      ['day', 'days'],
      days:     ['day', 'days'],
      minute:   ['minute', 'minutes'],
      minutes:  ['minute', 'minutes'],
      hour:     ['hour', 'hours'],
      hours:    ['hour', 'hours'],
      week:     ['week', 'weeks'],
      weeks:    ['week', 'weeks'],
      busy:     'Busy',
      free:     'Free'
    }
  },

  dsCalendarEventCreatePopover: {
    prompts: {
      description:  true,
      color:        true,
      location:     true,
      calendar:     true,
      busy:         true,
      guests:       false
    },
    formats: {
      start:    'dddd, MMMM D',
      time:     'h:mm a'
    },
    icons: {
      save:     'save',
      close:    'close',
      edit:     'edit'
    },
    labels: {
      title:    'Add title',
      allDay:   'All day',
      close:    'Close',
      save:     'Save',
      day:      ['day', 'days'],
      days:     ['day', 'days'],
      minute:   ['minute', 'minutes'],
      minutes:  ['minute', 'minutes'],
      hour:     ['hour', 'hours'],
      hours:    ['hour', 'hours'],
      week:     ['week', 'weeks'],
      weeks:    ['week', 'weeks'],
      busy:     'Busy',
      free:     'Free',
      location: 'Add location',
      description: 'Add description',
      calendar: 'Calendar',
    },
    busyOptions: [
      {value: true, text: 'Busy'},
      {value: false, text: 'Free'}
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
      editCustom:   'Edit'
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
      cancel:       'Cancel event changes',
      save:         'Save',
      title:        'Title',
      exclusions:   'These are events or spans of time where a normally occurring event was excluded from the schedule. Events are excluded here if an event occurrence is moved.',
      inclusions:   'These are events or spans of time where events were added outside the normally occurring schedule. Events are added here if an event occurrence is moved.',
      cancelled:    'These are events or spans of time where events were cancelled.',
      edit:         'Edit event',
      add:          'Add event',
      location:     'Add location',
      description:  'Add description',
      calendar:     'Calendar',
      tabs: {
        details:    'Event Details',
        forecast:   'Forecast',
        removed:    'Removed',
        added:      'Added',
        cancelled:  'Cancelled'
      }
    },
    busyOptions: [
      {value: true, text: 'Busy'},
      {value: false, text: 'Free'}
    ]
  },

  dsScheduleActions: {
    allowRemove: true,
    allowExclude: true,
    allowCancel: true,
    allowUncancel: true,
    allowMove: true,
    allowInclude: true,
    labels: {
      remove:     'Remove this event',
      exclude:    'Remove this occurrence',
      cancel:     'Cancel this occurrence',
      uncancel:   'Undo cancellation',
      move:       'Move this occurrence',
      include:    'Add new occurrence'
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
      prefix:     'The forecast shows previous & next',
      suffix:     'event occurrences within a years time.'
    }
  },

  dsScheduleFrequencyDay: {
    options: [
      { text: 'Any day', value: 'any'},
      { text: 'On the following days...', value: 'oneof'},
      { text: 'Every _ days starting on _', value: 'every'}
    ],
    types: [
      { text: 'Day of the month', property: 'dayOfMonth', max: 32, min: 1 },
      { text: 'Last day of the month', property: 'lastDayOfMonth', max: 32, min: 1 },
      { text: 'Day of the year', property: 'dayOfYear', max: 367, min: 1, offset: -1 }
    ]
  },

  dsScheduleFrequencyDayOfWeek: {
    options: [
      { text: 'Any day of the week', value: 'any'},
      { text: 'On the following days of the week...', value: 'oneof'},
      { text: 'Every _ weekday starting on _', value: 'every'},
      { text: 'Weekends', value: 'weekend'},
      { text: 'Weekdays', value: 'weekday'}
    ]
  },

  dsScheduleFrequencyMonth: {
    options: [
      { text: 'Any month', value: 'any'},
      { text: 'On the following months...', value: 'oneof'},
      { text: 'Every _ months starting on _', value: 'every'}
    ]
  },

  dsScheduleFrequencyWeek: {
    options: [
      { text: 'Any week', value: 'any'},
      { text: 'On the following weeks...', value: 'oneof'},
      { text: 'Every _ weeks starting on _', value: 'every'}
    ],
    types: [
      { text: 'Week of the month (first week has a Thursday)', property: 'weekOfMonth', max: 6 },
      { text: 'Weekspan of the month (starts on first day of month)', property: 'weekspanOfMonth', max: 7, min: 1, offset: -1 },
      { text: 'Full week of the month (0th = the week before if any)', property: 'fullWeekOfMonth', max: 6 },
      { text: 'Last weekspan of the month (starts on last day of month)', property: 'lastWeekspanOfMonth', max: 7, min: 1, offset: -1 },
      { text: 'Last full week of the month (0th = the week after if any)', property: 'lastFullWeekOfMonth', max: 6 },
      { text: 'Week of the year (first week has a Thursday)', property: 'weekOfYear', max: 54 },
      { text: 'Weekspan of the year (starts on first day of year)', property: 'weekspanOfYear', max: 53, min: 1, offset: -1 },
      { text: 'Full week of the year (0th = the week before if any)', property: 'fullWeekOfYear', max: 54 },
      { text: 'Last weekspan of the year (starts on last day of year)', property: 'lastWeekspanOfYear', max: 53, min: 1, offset: -1 },
      { text: 'Last full week of the year (0th = the week after if any)', property: 'lastFullWeekOfYear', max: 54 }
    ]
  },

  dsScheduleFrequencyYear: {
    lookback: 5,
    lookahead: 20,
    options: [
      { text: 'Any year', value: 'any'},
      { text: 'On the following years...', value: 'oneof'},
      { text: 'Every _ years starting on _', value: 'every'}
    ]
  },

  dsScheduleModifier: {
    canRemove: true,
    description: ''
  },

  dsScheduleSpan: {
    labels: {
      startless:  'Beginning of Time',
      endless:    'End of Time'
    },
    formats: {
      start:      'MMMM Do, YYYY',
      end:        'MMMM Do, YYYY'
    }
  },

  dsScheduleTime: {
    index: -1,
    mutate: true,
    showAdd: false,
    showRemove: false,
    labels: {
      remove:     'Remove time',
      add:        'Add time'
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
      all:        'All day',
      minute:     'minute',
      minutes:    'minutes',
      hour:       'hour',
      hours:      'hours',
      day:        'day',
      days:       'days',
      week:       'week',
      weeks:      'weeks',
      month:      'month',
      months:     'months'
    }
  },

  dsScheduleTypeCustomDialog: {
    dialogProps: {
      maxWidth: '600px',
      persistent: true,
      lazy: true
    },
    labels: {
      save:     'Save',
      cancel:   'Cancel'
    }
  },

  dsWeekDayHeader: {
    formats: {
      weekday:    'ddd'
    }
  },

  dsWeeksView: {
    weekdays: moment.weekdaysShort()
  },

  dsGestures: {
    minDistance: 50,
    maxDistance: 200,
    maxWander: 0.1
  }

};
