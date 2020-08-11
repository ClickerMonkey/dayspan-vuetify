export default {
  promptLabels: {
    actionRemove:       'Sei sicuro di voler rimuovere questo evento?',
    actionExclude:      "Sei sicuro di voler rimuovere l'occorrenza di questo evento?",
    actionCancel:       'Sei sicuro di voler cancellare questo evento?',
    actionUncancel:     'Sei sicuro di voler annullare la cancellazione di questo evento?',
    actionSetStart:     'Sei sicuro di voler configurare questa occorrenza come la prima?',
    actionSetEnd:       "Sei sicuro di voler configurare questa occorrenza come l'ultima?",
    actionMove:         'Sei sicuro di voler posticipare questo evento?',
    actionInclude:      "Sei sicuro di voler aggiungere un'occorrenza a questo evento?", /* probabilmente dal contesto, potrebbe essere più corretto: "aggiungere un'occorrenza" senza specificare l'evento*/
    move:               'Sei sicuro di voler posticipare questo evento?',
    toggleAllDay:       'Sei sicuro di voler cambiare questo evento anche se si verifica tutto il giorno?',
    removeExistingTime: "Sei sicuro di voler eliminare tutte le occorrenze dell'evento in questo momento?"
  },
  placeholder: {
    noTitle: '(no title)'
  },
  patterns: {
    lastDay:        (day) => 'Ultimo giorno del mese',
    lastDayOfMonth: (day) => 'Ultimo giorno di ' + day.format('MMMM'),
    lastWeekday:    (day) => 'Ultimo ' + day.format('dddd') + ' di ' + day.format('MMMM')
  },
  colors: [
    { text: 'Rosso' },
    { text: 'Rosa' },
    { text: 'Viola' },
    { text: 'Viola Intenso' },
    { text: 'Indaco' },
    { text: 'Blue' },
    { text: 'Colla' },
    { text: 'Blu Chiaro' },
    { text: 'Ciano' },
    { text: 'Foglia di Tè' },
    { text: 'Verde' },
    { text: 'Verde Chiaro' },
    { text: 'Lime' },
    { text: 'Giallo' },
    { text: 'Ambra' },
    { text: 'Arancione' },
    { text: 'Arancione Intenso' },
    { text: 'Marrone' },
    { text: 'Grigio Blu' },
    { text: 'Grigio' },
    { text: 'Nero' }
  ],
  icons: [
    { text: 'Allarme' },
    { text: 'Stella' },
    { text: 'Cuore' },
    { text: 'Azione' },
    { text: 'Incarico' },
    { text: 'Attenzione' },
    { text: 'Soldi' },
    { text: 'Carico' },
    { text: 'Casa' },
    { text: 'Gioco' },
    { text: 'Email' },
    { text: 'Telefono' },
    { text: 'Grafico' },
    { text: 'Bicicletta' },
    { text: 'Viaggio' }
  ],
  defaults: {
    dsDay: {
      formats: {
        month:  'MMM'
      }
    },
    dsCalendarApp: {
      types: [
        { label: 'Giorno' },
        { label: 'Settimana' },
        { label: 'Mese' },
        { label: 'Anno' },
        { label: 'Programma' },
        { label: '4 giorni' }
      ],
      formats: {
        today: 'dddd, MMMM D',
        xs: 'MMM'
      },
      labels: {
        next: (type) => type ? 'Prossimo ' + type.label.toLowerCase() : 'Prossimo',
        prev: (type) => type ? 'Precedente ' + type.label.toLowerCase() : 'Precedente',
        moveCancel: 'Annulla spostamento',
        moveSingleEvent: "Rinvia l'evento",
        moveOccurrence: "Sposta solo questa occorrenza dell'evento",
        moveAll: "Sposta tutte le occorrenze dell'evento",
        moveDuplicate: "Aggiungi una nuova occorrenza all'evento",
        promptConfirm: 'Si',
        promptCancel: 'No',
        today: 'Oggi'
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
        second:   ['second', 'seconds'],
        seconds:  ['second', 'seconds'],
        busy:     'Busy',
        free:     'Free'
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
        allDay:   'Tutto il giorno',
        options:  'Opzioni',
        close:    'Chiudi',
        day:      ['giorno', 'giorni'],
        days:     ['giorno', 'giorni'],
        minute:   ['minuto', 'minuti'],
        minutes:  ['minuto', 'minuti'],
        hour:     ['ora', 'ore'],
        hours:    ['ora', 'ore'],
        week:     ['settimana', 'settimane'],
        weeks:    ['settimana', 'settimane'],
        second:   ['secondo', 'secondi'],
        seconds:  ['secondo', 'secondi'],
        busy:     'Occupato',
        free:     'Disponibile'
      }
    },
    dsCalendarEventCreatePopover: {
      formats: {
        start:    'dddd, MMMM D',
        time:     'h:mm a'
      },
      labels: {
        title:    'Aggiungi titolo',
        allDay:   'Tutto il giorno',
        close:    'Chiudi',
        save:     'Salva',
        day:      ['giorno', 'giorni'],
        days:     ['giorno', 'giorni'],
        minute:   ['minuto', 'minuti'],
        minutes:  ['minuto', 'minuti'],
        hour:     ['ora', 'ore'],
        hours:    ['ora', 'ore'],
        week:     ['settimana', 'settimane'],
        weeks:    ['settimana', 'settimane'],
        second:   ['secondo', 'secondi'],
        seconds:  ['secondo', 'secondi'],
        busy:     'Occupato',
        free:     'Disponibile',
        location: 'Aggiungi luogo',
        description: 'Aggiungi descrizione',
        calendar: 'Calendario',
      },
      busyOptions: [
        {text: 'Occupato'},
        {text: 'Disponibile'}
      ]
    },
    dsSchedule: {
      labels: {
        editCustom:   'Modifica'
      }
    },
    dsEvent: {
      labels: {
        moreActions:  'Più azioni...',
        cancel:       'Annulla modifiche',
        save:         'Salva',
        title:        'Titolo',
        /* al posto di "dal/del programma" si può sostituire "dalla/della pianificazione" */
        exclusions:   'Questi sono eventi o intervalli di tempo dove un evento che si è verificato normalmente è stato escluso dal programma. Gli eventi che sono stati posticipati sono esclusi.',
        inclusions:   'Questi sono eventi o intervalli di tempo dove gli eventi sono stati aggiunti al di fuori del programma che si verifica normalmente. Gli eventi posticipati vengono mostrati qui.',
        cancelled:    'Questi sono eventi o intervalli di tempo dove gli eventi sono stati cancellati.',
        edit:         'Modifica evento',
        add:          'Aggiungi evento',
        location:     'Aggiungi luogo',
        description:  'Aggiungi descrizione',
        calendar:     'Calendario',
        tabs: {
          details:    'Dettagli Evento',
          forecast:   'Anteprima',
          removed:    'Rimosso',
          added:      'Aggiunto',
          cancelled:  'Cancellato'
        }
      },
      busyOptions: [
        {text: 'Occupato'},
        {text: 'Disponibile'}
      ]
    },
    dsScheduleActions: {
      labels: {
        remove:     'Rimuovi questo evento',
        exclude:    'Rimuovi questa occorrenza',
        cancel:     'Annulla questa occorrenza',
        uncancel:   'Annulla la cancellazione',
        move:       'Sposta questa occorrenza',
        include:    'Aggiungi una nuova occorrenza',
        setStart:   'Imposta come prima occorrenza',
        setEnd:     'Imposta come ultima occorrenza',
        pickerOk:   'OK',
        pickerCancel:'Annulla'
      }
    },
    dsScheduleForecast: {
      labels: {
        prefix:     "L'anteprima mostra prima & dopo",
        suffix:     'eventi che si verificano entro un anno'
      }
    },
    dsScheduleFrequencyDay: {
      labels: {
        type: 'Giorni'
      },
      options: [
        { text: 'Ogni giorno' },
        { text: 'Nei giorni seguenti...' },
        { text: 'Ogni _ giorno a partire dal _' }
      ],
      types: [
        { text: 'Giorno del mese' },
        { text: 'Ultimo giorno del mese' },
        { text: "Giorno dell'anno" }
      ]
    },
    dsScheduleFrequencyDayOfWeek: {
      weekdays: ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'],
      labels: {
        type: 'Giorni della settimana'
      },
      options: [
        { text: 'Ogni giorno della settimana' },
        { text: 'Nei giorni seguenti della settimana...' },
        { text: 'Ogni _ giorno della settimana a partire dal _' },
        { text: 'Fine settimana' },
        { text: 'Giorni della settimana' }
      ]
    },
    dsScheduleFrequencyMonth: {
      labels: {
        type: 'Mesi'
      },
      months: [
        'Gennaio',
        'Febbraio',
        'Marzo',
        'Aprile',
        'Maggio',
        'Giugno',
        'Luglio',
        'Agosto',
        'Settembre',
        'Ottobre',
        'Novembre',
        'Dicembre'
      ],
      options: [
        { text: 'Ogni mese' },
        { text: 'Nei mesi seguenti...' },
        { text: 'Ogni _ mese a partire dal _' }
      ]
    },

    dsScheduleFrequencyWeek: {
      labels: {
        type: 'Settimane'
      },
      options: [
        { text: 'Ogni settimana' },
        { text: 'Nelle settimane seguenti...' },
        { text: 'Ogni _ settimana a partire dal _' }
      ],
      types: [
        { text: 'Settimana del mese (la prima settimana ha un Giovedì)' },
        { text: 'Intervallo settimanale del mese (inizia il primo giorno del mese)' },
        { text: 'Settimana completa del mese (0º = la settimana prima se presente)' },
        { text: "L'ultimo intervallo settimanale del mese (inizia l'ultimo giorno del mese)" },
        { text: 'Ultima settimana completa del mese (0º = la settimana dopo se presente)' },
        { text: "Settimana dell'anno (la prima settimana ha un Giovedì)" },
        { text: "Intervallo settimanale dell'anno (inizia il primo giorno dell'anno)" },
        { text: "Settimana completa dell'anno (0º = la settimana prima se presente)" },
        { text: "L'ultimo intervallo settimanale dell'anno (inizia l'ultimo giorno dell'anno)" },
        { text: "Ultima settimana completa dell'anno (0º = la settimana dopo se presente)" }
      ]
    },

    dsScheduleFrequencyYear: {
      labels: {
        type: 'Anni'
      },
      options: [
        { text: 'Ogni anno' },
        { text: 'Negli anni seguenti...' },
        { text: 'Ogni _ anno a partire dal _' }
      ]
    },

    dsScheduleSpan: {
      labels: {
        startless:  'Inizio',
        endless:    'Fine'
      },
      formats: {
        start:      'MMMM Do, YYYY',
        end:        'MMMM Do, YYYY'
      }
    },

    dsScheduleTime: {
      labels: {
        remove:     'Rimuovi tempo',
        add:        'Aggiungi tempo'
      }
    },

    dsScheduleTimes: {
      labels: {
        all:        'Tutto il giorno',
        minute:     'minuto',
        minutes:    'minuti',
        hour:       'ora',
        hours:      'ore',
        day:        'giorno',
        days:       'giorni',
        week:       'settimana',
        weeks:      'settimane',
        month:      'mese',
        months:     'mesi',
        second:     'secondo',
        seconds:    'secondi'
      }
    },

    dsScheduleType: {
      formats: {
        date:       'LL'
      }
    },

    dsScheduleTypeCustomDialog: {
      labels: {
        save:     'Salva',
        cancel:   'Annulla'
      }
    },

    dsWeekDayHeader: {
      formats: {
        weekday:    'ddd'
      }
    },

    dsWeeksView: {
      weekdays: ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab']
    },

    dsDaysView: {
      hours: [
        '    ', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
        '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
      ]
    },

    dsDayPicker: {
      weekdays: ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'],
      labels: {
        prevMonth: 'Mese precedente',
        nextMonth: 'Prossimo mese'
      }
    }
  }
}