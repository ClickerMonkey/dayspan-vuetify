
export default {
  promptLabels: {
    actionRemove:       'Estàs segur que vols suprimir aquest esdeveniment?',
    actionExclude:      'Estàs segur que vols suprimir aquesta repetició de l\'esdeveniment?',
    actionCancel:       'Estàs segur que vols cancel·lar aquest esdeveniment?',
    actionUncancel:     'Estàs segur que vols anul·lar la cancel·lació d\'aquest esdeveniment?',
    actionSetStart:     'Estàs segur que vols definir aquesta repetició com la primera?',
    actionSetEnd:       'Estàs segur que vols definir aquesta repetició com la última?',
    actionMove:         'Estàs segur que vols moure aquest esdeveniment?',
    actionInclude:      'Estàs segur que vols afegir una repetició de l\'esdeveniment?',
    move:               'Estàs segur que vols moure aquest esdeveniment?',
    toggleAllDay:       'Estàs segur que vols canviar la duració d\'aquest esdeveniment a tot el dia?',
    removeExistingTime: 'Estàs segur que vols eliminar totes les repeticions en aquest moment?'
  },
  placeholder: {
    noTitle: '(sense títol)'
  },
  patterns: {
    lastDay:        (day) => 'Últim dia del mes',
    lastDayOfMonth: (day) => 'Últim dia de ' + day.format('MMMM'),
    lastWeekday:    (day) => 'Últim ' + day.format('dddd') + ' en ' + day.format('MMMM')
  },
  colors: [
    { text: 'Vermell' },
    { text: 'Rosa' },
    { text: 'Lila' },
    { text: 'Lila fosc' },
    { text: 'Indi' },
    { text: 'Blau fosc' },
    { text: 'Blau' },
    { text: 'Blau clar' },
    { text: 'Cian' },
    { text: 'Xarxet' },
    { text: 'Verd' },
    { text: 'Verd clar' },
    { text: 'Llima' },
    { text: 'Groc' },
    { text: 'Ambre' },
    { text: 'Taronja' },
    { text: 'Taronja fosc' },
    { text: 'Marró' },
    { text: 'Gris blavós' },
    { text: 'Gris' },
    { text: 'Negre' }
  ],
  icons: [
    { text: 'Alarma' },
    { text: 'Estrella' },
    { text: 'Cor' },
    { text: 'Acció' },
    { text: 'Tasca' },
    { text: 'Alerta' },
    { text: 'Diners' },
    { text: 'Càrrec' },
    { text: 'Casa' },
    { text: 'Play' },
    { text: 'Correu electrónic' },
    { text: 'Telèfon' },
    { text: 'Gràfica' },
    { text: 'Bicicleta' },
    { text: 'Viatge' }
  ],
  defaults: {
    dsDay: {
      formats: {
        month:  'MMM'
      }
    },
    dsCalendarApp: {
      types: [
        { label: 'Día' },
        { label: 'Setmana' },
        { label: 'Mes' },
        { label: 'Any' },
        { label: 'Horari' },
        { label: '4 dies' }
      ],
      formats: {
        today: 'dddd, MMMM D',
        xs: 'MMM'
      },
      labels: {
        next: (type) => type ? 'Següent ' + type.label.toLowerCase() : 'Següent',
        prev: (type) => type ? 'Anterior ' + type.label.toLowerCase() : 'Anterior',
        moveCancel: 'Cancel·lar moviment',
        moveSingleEvent: 'Moure esdeveniment',
        moveOccurrence: 'Moure només aquesta repetició de l\'esdeveniment',
        moveAll: 'Moure totes les repeticions de l\'esdeveniment',
        moveDuplicate: 'Afegir repetició',
        promptConfirm: 'Si',
        promptCancel: 'No',
        today: 'AVUI'
      }
    },
    dsAgendaEvent: {
      formats: {
        firstLine:  'ddd',
        secondLine: 'MMM Do',
        start:      'dddd, MMMM D',
        time:       'h:mm a'
      },
      labels: {
        allDay:   'Tot el dia',
        options:  'Opcions',
        close:    'Tancar',
        day:      ['dia', 'dies'],
        days:     ['dia', 'dies'],
        minute:   ['minut', 'minuts'],
        minutes:  ['minut', 'minuts'],
        hour:     ['hora', 'hores'],
        hours:    ['hora', 'hores'],
        week:     ['setmana', 'setmanes'],
        weeks:    ['setmana', 'setmanes'],
        second:   ['segon', 'segons'],
        seconds:  ['segon', 'segons'],
        busy:     'Ocupat',
        free:     'Lliure'
      }
    },
    dsCalendarEventChip: {
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
        allDay:   'Tot el dia',
        options:  'Opcions',
        close:    'Tancar',
        day:      ['dia', 'dies'],
        days:     ['dia', 'dies'],
        minute:   ['minut', 'minuts'],
        minutes:  ['minut', 'minuts'],
        hour:     ['hora', 'hores'],
        hours:    ['hora', 'hores'],
        week:     ['setmana', 'setmanes'],
        weeks:    ['setmana', 'setmanes'],
        second:   ['segon', 'segons'],
        seconds:  ['segon', 'segons'],
        busy:     'Ocupat',
        free:     'Lliure'
      }
    },
    dsCalendarEventCreatePopover: {
      formats: {
        start:    'dddd, MMMM D',
        time:     'h:mm a'
      },
      labels: {
        title:    'Afegir títol',
        allDay:   'Tot el dia',
        close:    'Tancar',
        save:     'Guardar',
        day:      ['dia', 'dies'],
        days:     ['dia', 'dies'],
        minute:   ['minut', 'minuts'],
        minutes:  ['minut', 'minuts'],
        hour:     ['hora', 'hores'],
        hours:    ['hora', 'hores'],
        week:     ['setmana', 'setmanes'],
        weeks:    ['setmana', 'setmanes'],
        second:   ['segon', 'segons'],
        seconds:  ['segon', 'segons'],
        busy:     'Ocupat',
        free:     'Lliure',
        location: 'Afegir ubicació',
        description: 'Afegir descripció',
        calendar: 'Calendari',
      },
      busyOptions: [
        {text: 'Ocupat'},
        {text: 'Lliure'}
      ]
    },
    dsSchedule: {
      labels: {
        editCustom:   'Editar'
      }
    },
    dsEvent: {
      labels: {
        moreActions:  'Més accions ...',
        cancel:       'Cancel·lar canvis de l\'esdeveniment',
        save:         'Guardar',
        title:        'Títol',
        exclusions:   'Aquests són esdeveniments o períodes de temps on un esdeveniment que es dóna normalment es va excloure de la programació. Els esdeveniments s\'exclouen aquí si es mou una repetició d\'esdeveniment.',
        inclusions:   'Aquests són esdeveniments o períodes de temps on es van afegir esdeveniments fora de l\'horari habitual. Els esdeveniments s\'afegiran aquí si es mou una repetició d\'esdeveniment.',
        cancelled:    'Aquests són esdeveniments o períodes de temps on es van cancel·lar els esdeveniments.',
        edit:         'Editar esdeveniment',
        add:          'Afegir esdeveniment',
        location:     'Afegir ubicació',
        description:  'Afegir descripció',
        calendar:     'Calendari',
        tabs: {
          details:    'Detalls de l\'esdeveniment',
          forecast:   'Previsió',
          removed:    'Eliminat',
          added:      'Afegit',
          cancelled:  'Cancel·lat'
        }
      },
      busyOptions: [
        {text: 'Ocupat'},
        {text: 'Lliure'}
      ]
    },
    dsScheduleActions: {
      labels: {
        remove:     'Eliminar aquest esdeveniment',
        exclude:    'Eliminar aquesta repetició',
        cancel:     'Cancel·lar aquesta repetició',
        uncancel:   'Desfer cancel·lació',
        move:       'Moure aquesta repetició',
        include:    'Afegir nova repetició',
        setStart:   'Definir com a primera repetició',
        setEnd:     'Definir com a última repetició',
        pickerOk:   'OK',
        pickerCancel:'Cancel·lar'
      }
    },
    dsScheduleForecast: {
      labels: {
        prefix:     'La previsió mostra anteriors i següents',
        suffix:     'repeticions dins del temps d\'un any.'
      }
    },
    dsScheduleFrequencyDay: {
      labels: {
        type: 'Dies'
      },
      options: [
        { text: 'Qualsevol dia' },
        { text: 'Els següents dies...' },
        { text: 'Cada _ dies a partir de _' }
      ],
      types: [
        { text: 'Dia del mes' },
        { text: 'Última dia del mes' },
        { text: 'Dia de l\'any' }
      ]
    },
    dsScheduleFrequencyDayOfWeek: {
      weekdays: ['Diumenge', 'Dilluns', 'Dimarts', 'Dimecres', 'Dijous', 'Divendres', 'Dissabte'],
      labels: {
        type: 'Dies de la setmana'
      },
      options: [
        { text: 'Qualsevol dia de la setmana' },
        { text: 'Els següents dies de la setmana...' },
        { text: 'Cada _ dia laborable a partir de _' },
        { text: 'Caps de setmana' },
        { text: 'Dies laborables' }
      ]
    },
    dsScheduleFrequencyMonth: {
      labels: {
        type: 'Mesos'
      },
      months: [
        'Gener',
        'Febrer',
        'Març',
        'Abril',
        'Maig',
        'Juny',
        'Juliol',
        'Augost',
        'Setembre',
        'Octubre',
        'Novembre',
        'Desembre'
      ],
      options: [
        { text: 'Qualsevol mes' },
        { text: 'Els següents mesos...' },
        { text: 'Cada _ mesos a partir de _' }
      ]
    },

    dsScheduleFrequencyWeek: {
      labels: {
        type: 'Setmanes'
      },
      options: [
        { text: 'Qualsevol setmana' },
        { text: 'De les següents setmanes...' },
        { text: 'Cada _ setmana a partir de _' }
      ],
      types: [
        { text: 'Setmana del mes (la primera setmana amb un dimarts)' },
        { text: 'Setmana del mes (comença en el primer dia del mes)' },
        { text: 'Setmana completa del mes(0th = la setmana anterior si hi ha)' },
        { text: 'Última setmana del mes (comença l\'últim dia del mes)' },
        { text: 'Última setmana completa del mes (0th = la setmana després si hi ha)' },
        { text: 'Setmana de l\'any (la primera setmana amb un dimarts)' },
        { text: 'Setmana de l\'any (comença el primer dia de l\'any)' },
        { text: 'Setmana completa de l\'any (0th = la setmana anterior si hi ha)' },
        { text: 'Última setmana de l\'any (comença l\'última dia de l\'any)' },
        { text: 'Última setmana completa de l\'any (0th = la setmana després si hi ha)' }
      ]
    },

    dsScheduleFrequencyYear: {
      labels: {
        type: 'Anys'
      },
      options: [
        { text: 'Qualsevol any' },
        { text: 'En els següents anys...' },
        { text: 'Cada _ anys a partir de _' }
      ]
    },

    dsScheduleSpan: {
      labels: {
        startless:  'Principi del Temps',
        endless:    'Final del Temps'
      },
      formats: {
        start:      'MMMM Do, YYYY',
        end:        'MMMM Do, YYYY'
      }
    },

    dsScheduleTime: {
      labels: {
        remove:     'Eliminar temps',
        add:        'Afegir temps'
      }
    },

    dsScheduleTimes: {
      labels: {
        all:        'Tot el dia',
        minute:     'minut',
        minutes:    'minuts',
        hour:       'hora',
        hours:      'hores',
        day:        'dia',
        days:       'dies',
        week:       'setmana',
        weeks:      'setmanes',
        month:      'mes',
        months:     'mesos',
        second:     'segon',
        seconds:    'segons'
      }
    },

    dsScheduleType: {
      formats: {
        date:       'LL'
      }
    },

    dsScheduleTypeCustomDialog: {
      labels: {
        save:     'Guardar',
        cancel:   'Cancel·lar'
      }
    },

    dsWeekDayHeader: {
      formats: {
        weekday:    'ddd'
      }
    },

    dsWeeksView: {
      weekdays: ['Dg', 'Dl', 'Dm', 'Dc', 'Dj', 'Dv', 'Ds']
    },

    dsDaysView: {
      hours: [
        '    ', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am',
        '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm'
      ]
    },

    dsDayPicker: {
      weekdays: ['Diumenge', 'Dilluns', 'Dimarts', 'Dimecres', 'Dijous', 'Divendres', 'Dissabte'],
      labels: {
        prevMonth: 'Mes anterior',
        nextMonth: 'Mes següent'
      }
    }
  }
}
