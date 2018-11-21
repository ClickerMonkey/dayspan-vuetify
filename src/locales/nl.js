var suffix = (value, prepend) => (prepend ? value : '') + 'e';

export default {
  event: 'evenement',
  promptLabels: {
    actionRemove:       'Weet je zeker dat je dit evenement wilt verwijderen?',
    actionExclude:      'Weet je zeker dat je deze instantie van het evenement wilt verwijderen?',
    actionCancel:       'Weet je zeker dat je dit evenement wilt annuleren?',
    actionUncancel:     'Weet je zeker dat je de annulering van dit evenement ongedaan wilt maken?',
    actionSetStart:     'Weet je zeker dat je deze instantie als de eerste wilt kenmerken?',
    actionSetEnd:       'Weet je zeker dat je deze instantie als de laatste wilt kenmerken?',
    actionMove:         'Weet je zeker dat je dit evenement wilt verplaatsen?',
    actionInclude:      'Weet je zeker dat je een instantie van dit evenement wilt toevoegen?',
    move:               'Weet je zeker dat je dit evement wilt verplaatsen?',
    toggleAllDay:       'Weet je zeker dat je wilt schakelen tussen hele dag en moment?',
    removeExistingTime: 'Weet je zeker dat je alle instanties van dit evenement die op het geselecteerde moment plaatsvinden wilt verwijderen?'
  },
  placeholder: {
    noTitle: '(geen titel)'
  },
  patterns: {
    lastDay:        (day) => 'Laatste dag van de maand',
    lastDayOfMonth: (day) => 'Laaste dag van ' + day.toMoment().locale('nl').format('MMMM'),
    lastWeekday:    (day) => 'Laatste ' + day.toMoment().locale('nl').format('dddd') + ' in ' + day.toMoment().locale('nl').format('MMMM'),
    none: () => 'Geen herhaling',
    daily: () => 'Dagelijks',
    weekly: (day) => 'Wekelijks op ' + day.toMoment().locale('nl').format('dddd'),
    monthlyWeek: (day) => 'Maandelijks op de ' + suffix(day.weekspanOfMonth + 1, true) + ' ' + day.toMoment().locale('nl').format('dddd'),
    annually: (day) => 'Jaalijks op ' + day.format('D MMMM'),
    annuallyMonthWeek: (day) => 'Jaarlijks op de ' + suffix(day.weekspanOfMonth + 1, true) + ' ' + day.toMoment().locale('nl').format('dddd') + ' van ' + day.toMoment().locale('nl').format('MMMM'),
    weekday: (day) => 'Iedere werkdag (maandag tot vrijdag)',
    monthly: (day) => 'Maandelijks op de ' + day.toMoment().locale('nl').format('Do') + ' dag',
    custom: () => 'Aangepast..'
  },
  schedule: {
    cancels: 'met annulering op',
    duration: 'gedurende',
    exclude: 'exclusief',
    including: 'inclusief',
    months: ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'],
    range: 'Van op {:start} tot {:end}',
    rangeNoEnd: 'Vanaf {:start}',
    rangeNoStart: 'Tot {:end}',
    ruleDayOfWeek: 'dag van de week',
    ruleLastDayOfMonth: 'laatste dag van de maand',
    ruleDayOfMonth: 'dag van de maand',
    ruleDayOfYear: 'dag van het jaar',
    ruleYear: 'jaar',
    ruleMonth: 'maand',
    ruleWeekOfYear: 'week van het jaar',
    ruleWeekspanOfYear: 'weekspanne van het jaar',
    ruleFullWeekOfYear: 'volledige week van het jaar',
    ruleLastWeekspanOfYear: 'laatste weekspanne van het jaar',
    ruleLastFullWeekOfYear: 'laatste volledige week van het jaar',
    ruleWeekOfMonth: 'week van de maand',
    ruleFullWeekOfMonth: 'volledige week van de maand',
    ruleWeekspanOfMonth: 'weekspanne van de maand',
    ruleLastFullWeekOfMonth: 'laatste volledige week van de maand',
    ruleLastWeekspanOfMonth: 'laatste weekspanne van de maand',
    ruleAnd: 'en',
    ruleAny: 'een',
    ruleEvery: 'iedere',
    ruleIn: 'in',
    ruleOn: 'op',
    ruleStarts: 'vanaf',
    ruleThe: 'de',
    summaryFormat: '{:range}het {:thing} vindt plaats{:rules}{:times}{:duration}{:excludes}{:includes}{:cancels}',
    times: 'om',
    weekdays: ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'],
  },
  formats: {
    day: (short, dayOfWeek, year) => (dayOfWeek ? (short ? 'ddd ' : 'dddd ') : '') + 'D ' + (short ? 'MMM ' : 'MMMM ') + (year ? ' YYYY' : ''),
    week: (short, dayOfWeek, year) => (dayOfWeek ? (short ? 'ddd ' : 'dddd ') : '') + 'D ' + (short ? 'MMM ' : 'MMMM ') + (year ? ' YYYY' : ''),
    month: (short, dayOfWeek, year) => (short ? 'MMM' : 'MMMM') + (year ? ' YYYY' : ''),
    year: (short, dayOfWeek, year) => (year ? 'YYYY' : ''),
    timeShort: 'H:mm'
  },
  suffix,
  colors: [
    { text: 'Rood' },
    { text: 'Roze' },
    { text: 'Paars' },
    { text: 'Donkerpaars' },
    { text: 'Donkerblauw' },
    { text: 'Blauw' },
    { text: 'Indigo' },
    { text: 'Lichtblauw' },
    { text: 'Cyaan' },
    { text: 'Zeegroen' },
    { text: 'Groen' },
    { text: 'Lichtgroen' },
    { text: 'Felgroen' },
    { text: 'Geel' },
    { text: 'Amber' },
    { text: 'Oranje' },
    { text: 'Donkeroranje' },
    { text: 'Bruin' },
    { text: 'Blauwgrijs' },
    { text: 'Grijs' },
    { text: 'Zwart' }
  ],
  icons: [
    { text: 'Alarm' },
    { text: 'Star' },
    { text: 'Love' },
    { text: 'Action' },
    { text: 'Assignment' },
    { text: 'Warning' },
    { text: 'Money' },
    { text: 'Charge' },
    { text: 'Home' },
    { text: 'Play' },
    { text: 'Email' },
    { text: 'Phone' },
    { text: 'Chart' },
    { text: 'Biking' },
    { text: 'Travel' }
  ],
  defaults: {
    dsDay: {
      formats: {
        month:  'MMM'
      }
    },
    dsCalendarApp: {
      types: [
        { label: 'Dag' },
        { label: 'Week' },
        { label: 'Maand' },
        { label: 'Jaar' },
        { label: 'Schema' },
        { label: '4 dagen' }
      ],
      formats: {
        today: 'dddd D MMMM',
        xs: 'MMM'
      },
      labels: {
        next: (type) => type ? 'Volgend(e) ' + type.label.toLowerCase() : 'Volgende',
        prev: (type) => type ? 'Vorig(e) ' + type.label.toLowerCase() : 'Vorig',
        moveCancel: 'Verplaatsen annuleren',
        moveSingleEvent: 'Evenement verplaatsen',
        moveOccurrence: 'Verplaats alleen deze instantie van dit evenement',
        moveAll: 'Verplaats alle instanties van dit evenement',
        moveDuplicate: 'Instantie toevoegen',
        promptConfirm: 'Ja',
        promptCancel: 'Nee',
        today: 'VANDAAG'
      }
    },
    dsAgendaEvent: {
      formats: {
        firstLine:  'ddd',
        secondLine: 'D MMM',
        start:      'dddd D MMMM',
        time:       'H:mm'
      },
      labels: {
        allDay:   'Hele dag',
        options:  'Opties',
        close:    'Sluiten',
        day:      ['dag', 'dagen'],
        days:     ['dag', 'dagen'],
        minute:   ['minuut', 'minuten'],
        minutes:  ['minuut', 'minuten'],
        hour:     ['uur', 'uur'],
        hours:    ['uur', 'uur'],
        week:     ['week', 'weken'],
        weeks:    ['week', 'weken'],
        busy:     'Bezet',
        free:     'Beschikbaar'
      }
    },
    dsCalendarEventChip: {
      formats: {
        fullDay:          'ddd D MMM YYYY',
        timed:            'ddd D MMM YYYY'
      }
    },
    dsCalendarEventPopover: {
      formats: {
        start:    'dddd D MMMM',
        time:     'H:mm'
      },
      labels: {
        allDay:   'Hele dag',
        options:  'Opties',
        close:    'Sluiten',
        day:      ['dag', 'dagen'],
        days:     ['dag', 'dagen'],
        minute:   ['minuut', 'minuten'],
        minutes:  ['minuut', 'minuten'],
        hour:     ['uur', 'uur'],
        hours:    ['uur', 'uur'],
        week:     ['week', 'weken'],
        weeks:    ['week', 'weken'],
        busy:     'Bezet',
        free:     'Beschikbaar'
      }
    },
    dsCalendarEventCreatePopover: {
      formats: {
        start:    'dddd D MMMM',
        time:     'H:mm'
      },
      labels: {
        title:    'Titel',
        allDay:   'Hele dag',
        close:    'Sluiten',
        save:     'Opslaan',
        day:      ['dag', 'dagen'],
        days:     ['dag', 'dagen'],
        minute:   ['minuut', 'minuten'],
        minutes:  ['minuut', 'minuten'],
        hour:     ['uur', 'uur'],
        hours:    ['uur', 'uur'],
        week:     ['week', 'weken'],
        weeks:    ['week', 'weken'],
        busy:     'Bezet',
        free:     'Beschikbaar',
        location: 'Voeg een locatie toe',
        description: 'Voeg een beschrijving toe',
        calendar: 'Categorie',
      },
      busyOptions: [
        {text: 'Bezet'},
        {text: 'Beschikbaar'}
      ]
    },
    dsSchedule: {
      labels: {
        editCustom:   'Aanpassen'
      }
    },
    dsEvent: {
      labels: {
        moreActions:  'Meer acties...',
        cancel:       'Wijzigingen annuleren',
        save:         'Opslaan',
        title:        'Titel',
        exclusions:   'Dit zijn evenementen of tijdspannes waarbij een normaliter voorkomend evenement uit het schema verwijderd is. Evenementen die verplaatst zijn verschijnen hier.',
        inclusions:   'Dit zijn evenementen of tijdspannes waarbij een evenement is toegevoegd aan het schema. Evenementen die verplaatst zijn verschijnen hier.',
        cancelled:    'Dit zijn evenementen of tijdspannes die geannulleerd zijn uit het schema.',
        edit:         'Evenement bewerken',
        add:          'Evenement toevoegen',
        location:     'Voeg een locatie toe',
        description:  'Voeg een beschrijving toe',
        calendar:     'Categorie',
        tabs: {
          details:    'Evenement',
          forecast:   'Vooruitblik',
          removed:    'Verwijderd',
          added:      'Toegevoegd',
          cancelled:  'Geannuleerd'
        }
      },
      busyOptions: [
        {text: 'Bezet'},
        {text: 'Beschikbaar'}
      ]
    },
    dsScheduleActions: {
      labels: {
        remove:     'Dit evenement verwijderen',
        exclude:    'Alleen dit evenement verwijderen',
        cancel:     'Dit evenement annuleren',
        uncancel:   'Annuleren ongedaaan maken',
        move:       'Dit evenement verplaatsen',
        include:    'Voeg een nieuw evenement toe',
        setStart:   'Instellen als begin van herhaling',
        setEnd:     'Instellen als eind van herhaling',
        pickerOk:   'OK',
        pickerCancel:'Annuleren'
      }
    },
    dsScheduleForecast: {
      labels: {
        prefix:     'De vooruitblik toont alle vorige en volgende',
        suffix:     'evenementen binnen een jaar.'
      }
    },
    dsScheduleFrequencyDay: {
      labels: {
        type: 'Dagen'
      },
      options: [
        { text: 'Iedere dag' },
        { text: 'Op de volgende dagen...' },
        { text: 'Om de _ dagen beginnende op _' }
      ],
      types: [
        { text: 'Dag van de maand' },
        { text: 'Laatste dag van de maand' },
        { text: 'Dag van het jaar' }
      ]
    },
    dsScheduleFrequencyDayOfWeek: {
      weekdays: ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'],
      labels: {
        type: 'Dagen van de week'
      },
      options: [
        { text: 'Iedere dag van de week' },
        { text: 'Op de volgende dagen...' },
        { text: 'Iedere _ dag van de week beginnende op _' },
        { text: 'Weekenden' },
        { text: 'Werkdagen' }
      ]
    },
    dsScheduleFrequencyMonth: {
      labels: {
        type: 'Maanden'
      },
      months: [
        'Januari',
        'Februari',
        'Maart',
        'April',
        'Mei',
        'Juni',
        'Juli',
        'Augustus',
        'September',
        'Oktober',
        'November',
        'December'
      ],
      options: [
        { text: 'Iedere maand' },
        { text: 'In de volgende maanden ..' },
        { text: 'Iedere _ maanden beginnenden op de _' }
      ]
    },

    dsScheduleFrequencyWeek: {
      labels: {
        type: 'Weken'
      },
      options: [
        { text: 'Iedere week' },
        { text: 'In de volgende weken..' },
        { text: 'iedere _ weken beginnende op de _' }
      ],
      types: [
        { text: 'Week van de maand (eerste week heeft een donderdag)' },
        { text: 'Weekspanne van de maand (begint op de eerste dag van de maand)' },
        { text: 'Volledige week van de maand (0de = de week voorafgaande ivt)' },
        { text: 'Laatste weekspanne van de maand (begint op de laatste dag van de maand)' },
        { text: 'Laatste volledige week van de maand (0de = de volgende week (ivt))' },
        { text: 'Week van het jaar (eerste week heeft een donderdag)' },
        { text: 'Weekspanne van het jaar (begint op de eerste dag van het jaar)' },
        { text: 'Volledige week van het jaar (0de = de voorafgaande week (ivt))' },
        { text: 'Laatste weekspanne van het jaar (begint op de laatste dag van het jaar)' },
        { text: 'Laatste volledige week van het jaar (0de = de volgende week (ivt))' }
      ]
    },

    dsScheduleFrequencyYear: {
      labels: {
        type: 'Jaren'
      },
      options: [
        { text: 'Ieder jaar' },
        { text: 'In de volgende jaren...' },
        { text: 'Iedere _ jaar beginnende in _' }
      ]
    },

    dsScheduleSpan: {
      labels: {
        startless:  'Begin der tijden',
        endless:    'Einde der tijden',
        to: 'tot'
      },
      formats: {
        start:      'D MMMM YYYY',
        end:        'D MMMM YYYY'
      },
      suffix
    },

    dsScheduleTime: {
      labels: {
        remove:     'Moment verwijderen',
        add:        'Moment toevoegen'
      }
    },

    dsScheduleTimes: {
      labels: {
        all:        'Hele dag',
        minute:     'minuut',
        minutes:    'minuten',
        hour:       'uur',
        hours:      'uur',
        day:        'dag',
        days:       'dagen',
        week:       'week',
        weeks:      'weken',
        month:      'maand',
        months:     'maanden'
      }
    },

    dsScheduleType: {
      formats: {
        date:       'LL'
      }
    },

    dsScheduleTypeCustomDialog: {
      labels: {
        save:     'Opslaan',
        cancel:   'Annuleren'
      }
    },

    dsWeekDayHeader: {
      formats: {
        weekday:    'ddd'
      }
    },

    dsWeeksView: {
      weekdays: ['Zo', 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za']
    },

    dsDagenView: {
      hours: [
        '0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00',
        '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
      ]
    },

    dsDayPicker: {
      weekdays: ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'],
      labels: {
        prevMonth: 'Vorige maand',
        nextMonth: 'Volgende maand'
      }
    }
  }
}

