
export default {
  promptLabels: {
    actionRemove:       'Möchtest du dieses Event wirklich löschen?',
    actionExclude:      'Möchtest du dieses Vorkommen eines Events wirklich löschen?',
    actionCancel:       'Möchtest du dieses Event wirklich abbrechen?',
    actionUncancel:     'Möchtest du das Abbrechen dieses Events wirklich rückgängig machen?',
    actionSetStart:     'Möchtest du dieses Vorkommen wirklich als erstes des Events setzen?',
    actionSetEnd:       'Möchtest du dieses Vorkommen wirklich als letztes des Events setzen?',
    actionMove:         'Möchtest du dieses Event wirklich verschieben?',
    actionInclude:      'Möchtest du diesem Event wirklich ein Vorkommen hinzufügen?',
    move:               'Möchtest du dieses Event wirklich verschieben?',
    toggleAllDay:       'Möchtest du wirklich ändern, ob diese Event Ganztägig ist?',
    removeExistingTime: 'Möchtest du wirklich alle Vorkommen des Events zu dieser Zeit löschen?'
  },
  placeholder: {
    noTitle: '(Keine Überschrift)'
  },
  patterns: {
    lastDay:        (day) => 'Letzter Tag des Monats',
    lastDayOfMonth: (day) => 'Letzter Tag im ' + day.format('MMMM'),
    lastWeekday:    (day) => 'Letzter ' + day.format('dddd') + ' im ' + day.format('MMMM')
  },
  colors: [
    { text: 'Rot' },
    { text: 'Pink' },
    { text: 'Violet' },
    { text: 'dunkles Violet' },
    { text: 'Indigo' },
    { text: 'Blau' },
    { text: 'Gesättigtes Blau' },
    { text: 'Helles Blau' },
    { text: 'Cyan' },
    { text: 'Blaugrün' },
    { text: 'Grün' },
    { text: 'Hellgrün' },
    { text: 'Limettengrün' },
    { text: 'Gelb' },
    { text: 'Bernsteingelb' },
    { text: 'Orange' },
    { text: 'dunkles Orange' },
    { text: 'Braun' },
    { text: 'Blaugrau' },
    { text: 'Grau' },
    { text: 'Schwarz' }
  ],
  icons: [
    { text: 'Alarm' },
    { text: 'Stern' },
    { text: 'Liebe' },
    { text: 'Action' },
    { text: 'Aufgabe' },
    { text: 'Warnung' },
    { text: 'Geld' },
    { text: 'Berechnung' },
    { text: 'Zuhause' },
    { text: 'Spielen' },
    { text: 'E-Mail' },
    { text: 'Telefon' },
    { text: 'Diagramm' },
    { text: 'Fahrrad fahren' },
    { text: 'Reisen' }
  ],
  defaults: {
    dsDay: {
      formats: {
        month:  'MMM'
      }
    },
    dsCalendarApp: {
      types: [
        { label: 'Tag' },
        { label: 'Woche' },
        { label: 'Monat' },
        { label: 'Jahr' },
        { label: 'Zeitplan' },
        { label: '4 Tage' }
      ],
      formats: {
        today: 'd. MMMM y',
        xs: 'MMM'
      },
      labels: {
        next: (type) => type ? 'Nächster ' + type.label.toLowerCase() : 'Nächster',
        prev: (type) => type ? 'Vorheriger ' + type.label.toLowerCase() : 'Vorheriger',
        moveCancel: 'Verschieben abbrechen',
        moveSingleEvent: 'Event verschieben',
        moveOccurrence: 'Nur dieses Vorkommen des Events verschieben',
        moveAll: 'Alle Vorkommen des Events verschieben',
        moveDuplicate: 'Dem Event ein neues Vorkommen hinzufügen',
        promptConfirm: 'Ja',
        promptCancel: 'Nein',
        today: 'HEUTE'
      }
    },
    dsAgendaEvent: {
      formats: {
        firstLine:  'ddd',
        secondLine: 'd. MMM',
        start:      'd. MMMM y',
        time:       'hh:mm'
      },
      labels: {
        allDay:   'Ganztägig',
        options:  'Optionen',
        close:    'Schließen',
        day:      ['Tag', 'Tage'],
        days:     ['Tag', 'Tage'],
        minute:   ['Minute', 'Minuten'],
        minutes:  ['Minute', 'Minuten'],
        hour:     ['Stunde', 'Stunden'],
        hours:    ['Stunde', 'Stunden'],
        week:     ['Woche', 'Wochen'],
        weeks:    ['Woche', 'Wochen'],
        second:   ['Sekunde', 'Sekunden'],
        seconds:  ['Sekunde', 'Sekunden'],
        busy:     'Beschäftigt',
        free:     'Frei'
      }
    },
    dsCalendarEventChip: {
      formats: {
        fullDay:          'EEEE, d. MMMM y',
        timed:            'EEEE, d. MMMM y'
      }
    },
    dsCalendarEventPopover: {
      formats: {
        start:    'd. MMMM y',
        time:     'hh:mm'
      },
      labels: {
        allDay:   'Ganztägig',
        options:  'Optionen',
        close:    'Schließen',
        day:      ['Tag', 'Tage'],
        days:     ['Tag', 'Tage'],
        minute:   ['Minute', 'Minuten'],
        minutes:  ['Minute', 'Minuten'],
        hour:     ['Stunde', 'Stunden'],
        hours:    ['Stunde', 'Stunden'],
        week:     ['Woche', 'Wochen'],
        weeks:    ['Woche', 'Wochen'],
        second:   ['Sekunde', 'Sekunden'],
        seconds:  ['Sekunde', 'Sekunden'],
        busy:     'Beschäftigt',
        free:     'Frei'
      }
    },
    dsCalendarEventCreatePopover: {
      formats: {
        start:    'd. MMMM y',
        time:     'hh:mm'
      },
      labels: {
        title:    'Überschrift hinzufügen',
        allDay:   'Ganztägig',
        close:    'Schließen',
        save:     'Speichern',
        day:      ['Tag', 'Tage'],
        days:     ['Tag', 'Tage'],
        minute:   ['Minute', 'Minuten'],
        minutes:  ['Minute', 'Minuten'],
        hour:     ['Stunde', 'Stunden'],
        hours:    ['Stunde', 'Stunden'],
        week:     ['Woche', 'Wochen'],
        weeks:    ['Woche', 'Wochen'],
        second:   ['Sekunde', 'Sekunden'],
        seconds:  ['Sekunde', 'Sekunden'],
        busy:     'Beschäftigt',
        free:     'Frei',
        location: 'Ort hinzufügen',
        description: 'Beschreibung hinzufügen',
        calendar: 'Kalendar',
      },
      busyOptions: [
        {text: 'Beschäftigt'},
        {text: 'Frei'}
      ]
    },
    dsSchedule: {
      labels: {
        editCustom:   'Bearbeiten'
      }
    },
    dsEvent: {
      labels: {
        moreActions:  'Weitere Aktionen...',
        cancel:       'Änderungen verwerfen',
        save:         'Speichern',
        title:        'Überschrift',
        exclusions:   'Dies sind Events oder Zeitbereiche, wo ein wiedekehrendes Event aus dem Zeitplan genommen wurde. Events werden hiervon ausgeschlossen, wenn ein Eventvorkommen verschoben wurde.',
        inclusions:   'Dies sind Events oder Zeitbereiche, welche fernab des normalen Zeitplans hinzugefügt wurden. Events werden hier angezeigt, wenn ein Eventvorkommen verschoben wurde.',
        cancelled:    'Dies sind Events oder Zeitbereiche, bei welchen Events abgesagt wurden.',
        edit:         'Event bearbeiten',
        add:          'Event hinzufügen',
        location:     'Ort hinzufügen',
        description:  'Beschreibung hinzufügen',
        calendar:     'Kalendar',
        tabs: {
          details:    'Beschreibung',
          forecast:   'Vorschau',
          removed:    'Gelöscht',
          added:      'Hinzugefügt',
          cancelled:  'Abgesagt'
        }
      },
      busyOptions: [
        {text: 'Beschäftigt'},
        {text: 'Frei'}
      ]
    },
    dsScheduleActions: {
      labels: {
        remove:     'Dieses Event löschen',
        exclude:    'Dieses Eventvorkommen löschen',
        cancel:     'Dieses Eventvorkommen absagen',
        uncancel:   'Absagung rückgängig machen',
        move:       'Dieses Eventvorkommen verschieben',
        include:    'Neues Eventvorkommen hinzufügen',
        setStart:   'Als erstes Vorkommen setzen',
        setEnd:     'Als letztes Vorkommen setzen',
        pickerOk:   'OK',
        pickerCancel:'Abbrechen'
      }
    },
    dsScheduleForecast: {
      labels: {
        prefix:     'Die Vorschau zeigt vorherige und nächste',
        suffix:     'Eventvorkommen innerhalb eines Jahres an.'
      }
    },
    dsScheduleFrequencyDay: {
      labels: {
        type: 'Tage'
      },
      options: [
        { text: 'Jeden Tag' },
        { text: 'An folgenden Tagen...' },
        { text: 'Alle _ Tage, beginnend am _' }
      ],
      types: [
        { text: 'Tag des Monats' },
        { text: 'Letzten Tag im Monat' },
        { text: 'Tag des Jahres' }
      ]
    },
    dsScheduleFrequencyDayOfWeek: {
      weekdays: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
      labels: {
        type: 'Wochentag'
      },
      options: [
        { text: 'Jeden Wochentag' },
        { text: 'An folgenden Wochentagen...' },
        { text: 'Alle _ Wochentage, beginnend am _' },
        { text: 'Wochenends' },
        { text: 'Werktags' }
      ]
    },
    dsScheduleFrequencyMonth: {
      labels: {
        type: 'Monate'
      },
      months: [
        'Januar',
        'Februar',
        'März',
        'April',
        'Mai',
        'Juni',
        'Juli',
        'August',
        'September',
        'Oktober',
        'November',
        'Dezember'
      ],
      options: [
        { text: 'Jeden Monat' },
        { text: 'In folgenden Monaten...' },
        { text: 'Alle _ Monate, beginnend am _' }
      ]
    },

    dsScheduleFrequencyWeek: {
      labels: {
        type: 'Wochen'
      },
      options: [
        { text: 'Jede Woche' },
        { text: 'In folgenden Wochen...' },
        { text: 'Alle _ Wochen, beginnend am _' }
      ],
      types: [
        { text: 'Woche eines Monats (Erste Woche hat einen Donnerstag)' },
        { text: 'Wochenspanne eines Monats (Startet am ersten Tag des Monats)' },
        { text: 'volle Woche eines Monats (0te = Die Woche vor allen)' },
        { text: 'Letzte Wochenspanne eines Monats (Startet am letzten Tag des Monats)' },
        { text: 'Letzte volle Woche eines Monats (0te = Die Woche nach allen)' },
        { text: 'Woche eines Jahres (Erste Woche hat einen Donnerstag)' },
        { text: 'Wochenspanne eines Jahres (Startet am ersten Tag des Jahres)' },
        { text: 'volle Woche eines Monats (0te = Die Woche vor allen)' },
        { text: 'Letzte Wochenspanne eines Jahres (Startet am letzten Tag des Jahres)' },
        { text: 'Letzte volle Woche eines Jahres (0te = Die Woche nach allen)' }
      ]
    },

    dsScheduleFrequencyYear: {
      labels: {
        type: 'Jahre'
      },
      options: [
        { text: 'Jedes Jahr' },
        { text: 'In den folgenden Jahren...' },
        { text: 'Alle _ Jahre, beginnend mit _' }
      ]
    },

    dsScheduleSpan: {
      labels: {
        startless:  'Beginn',
        endless:    'Ende'
      },
      formats: {
        start:      'd. MMMM y',
        end:        'd. MMMM y'
      }
    },

    dsScheduleTime: {
      labels: {
        remove:     'Zeit entfernen',
        add:        'Zeit hinzufügen'
      }
    },

    dsScheduleTimes: {
      labels: {
        all:        'Ganztägig',
        minute:     'Minute',
        minutes:    'Minuten',
        hour:       'Stunde',
        hours:      'Stunden',
        day:        'Tag',
        days:       'Tage',
        week:       'Woche',
        weeks:      'Wochen',
        month:      'Monat',
        months:     'Monate',
        second:     'Sekunde',
        seconds:    'Sekunden'
      }
    },

    dsScheduleType: {
      formats: {
        date:       'LL'
      }
    },

    dsScheduleTypeCustomDialog: {
      labels: {
        save:     'Speichern',
        cancel:   'Abbrechen'
      }
    },

    dsWeekDayHeader: {
      formats: {
        weekday:    'ddd'
      }
    },

    dsWeeksView: {
      weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    },

    dsDaysView: {
      hours: [
        '    ', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
        '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
      ]
    },

    dsDayPicker: {
      weekdays: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
      labels: {
        prevMonth: 'Vorheriger Monat',
        nextMonth: 'Nächster Monat'
      }
    }
  }
}
