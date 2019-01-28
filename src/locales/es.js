export default {
  promptLabels: {
    actionRemove:       '¿Está seguro que quiere eliminar este evento?',
    actionExclude:      '¿Está seguro que quiere eliminar esta ocurrencia del evento?',
    actionCancel:       '¿Está seguro que quiere cancelar este evento?',
    actionUncancel:     '¿Está seguro que quiere anular la cancelación de este evento?',
    actionSetStart:     '¿Está seguro que quiere definir esta ocurrencia como la primera?',
    actionSetEnd:       '¿Está seguro que quiere definir esta ocurrencia como la última?',
    actionMove:         '¿Está seguro que quiere mover este evento?',
    actionInclude:      '¿Está seguro que quiere agregar una ocurrencia del evento?',
    move:               '¿Está seguro que quiere mover este evento?',
    toggleAllDay:       '¿Está seguro que quiere cambiar la duración de este evento a Todo el Día?',
    removeExistingTime: '¿Está seguro que quiere eliminar todas las ocurrencias en este momento?'
  },
  placeholder: {
    noTitle: '(Sin Título)'
  },
  patterns: {
    lastDay:        (day) => 'Último día del Mes',
    lastDayOfMonth: (day) => 'Último día de ' + day.format('MMMM'),
    lastWeekday:    (day) => 'Último ' + day.format('dddd') + ' de ' + day.format('MMMM')
  },
  colors: [
    { text: 'Rojo' },
    { text: 'Rosado' },
    { text: 'Púrpura' },
    { text: 'Púrpura Oscuro' },
    { text: 'Índigo' },
    { text: 'Azul Oscuro' },
    { text: 'Azul' },
    { text: 'Azul Claro' },
    { text: 'Cyan' },
    { text: 'Verde Azulado' },
    { text: 'Verde' },
    { text: 'Verde Claro' },
    { text: 'Lima' },
    { text: 'Amarillo' },
    { text: 'Ambar' },
    { text: 'Naranja' },
    { text: 'Naranja Oscuro' },
    { text: 'Café' },
    { text: 'Gris Azulado' },
    { text: 'Gris' },
    { text: 'Negro' }
  ],
  icons: [
    { text: 'Alarma' },
    { text: 'Estrella' },
    { text: 'Corazón' },
    { text: 'Accion' },
    { text: 'Tarea' },
    { text: 'Advertencia' },
    { text: 'Dinero' },
    { text: 'Carga' },
    { text: 'Inicio' },
    { text: 'Reproducir' },
    { text: 'Email' },
    { text: 'Teléfono' },
    { text: 'Gráfica' },
    { text: 'Ciclismo' },
    { text: 'Viaje' }
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
        { label: 'Semana' },
        { label: 'Mes' },
        { label: 'Año' },
        { label: 'Horario' },
        { label: '4 días' }
      ],
      formats: {
        today: 'dddd, MMMM D',
        xs: 'MMM'
      },
      labels: {
        next: (type) => type ? 'Siguiente ' + type.label.toLowerCase() : 'Siguiente',
        prev: (type) => type ? 'Anterior ' + type.label.toLowerCase() : 'Anterior',
        moveCancel: 'Cancelar movimiento',
        moveSingleEvent: 'Mover evento',
        moveOccurrence: 'Mover solo esta ocurrencia del evento',
        moveAll: 'Mover todas las ocurrencias del evento',
        moveDuplicate: 'Agregar ocurrencia del evento',
        promptConfirm: 'Si',
        promptCancel: 'No',
        today: 'HOY'
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
        allDay:   'Todo el día',
        options:  'Opciones',
        close:    'Cerrar',
        day:      ['día', 'días'],
        days:     ['día', 'días'],
        minute:   ['minuto', 'minutos'],
        minutes:  ['minuto', 'minutos'],
        hour:     ['hora', 'horas'],
        hours:    ['hora', 'horas'],
        week:     ['semana', 'semanas'],
        weeks:    ['semana', 'semanas'],
        second:   ['segundo', 'segundos'],
        seconds:  ['segundo', 'segundos'],
        busy:     'Ocupado',
        free:     'Libre'
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
        allDay:   'Todo el día',
        options:  'Opciones',
        close:    'Cerrar',
        day:      ['día', 'días'],
        days:     ['día', 'días'],
        minute:   ['minuto', 'minutos'],
        minutes:  ['minuto', 'minutos'],
        hour:     ['hora', 'horas'],
        hours:    ['hora', 'horas'],
        week:     ['semana', 'semanas'],
        weeks:    ['semana', 'semanas'],
        second:   ['segundo', 'segundos'],
        seconds:  ['segundo', 'segundos'],
        busy:     'Ocupado',
        free:     'Libre'
      }
    },
    dsCalendarEventCreatePopover: {
      formats: {
        start:    'dddd, MMMM D',
        time:     'h:mm a'
      },
      labels: {
        title:    'Agregar Título',
        allDay:   'Todo el día',
        close:    'Cerrar',
        save:     'Guardar',
        day:      ['día', 'días'],
        days:     ['día', 'días'],
        minute:   ['minuto', 'minutos'],
        minutes:  ['minuto', 'minutos'],
        hour:     ['hora', 'horas'],
        hours:    ['hora', 'horas'],
        week:     ['semana', 'semanas'],
        weeks:    ['semana', 'semanas'],
        second:   ['segundo', 'segundos'],
        seconds:  ['segundo', 'segundos'],
        busy:     'Ocupado',
        free:     'Libre',
        location: 'Agregar Ubicación',
        description: 'Agregar Descripción',
        calendar: 'Calendario',
      },
      busyOptions: [
        {text: 'Ocupado'},
        {text: 'Libre'}
      ]
    },
    dsSchedule: {
      labels: {
        editCustom:   'Editar'
      }
    },
    dsEvent: {
      labels: {
        moreActions:  'Más acciones...',
        cancel:       'Cancelar cambios del evento',
        save:         'Guardar',
        title:        'Título',
        exclusions:   'Estos son eventos o periodos de tiempo donde un evento que ocurre normalmente fue excluido de la programación. Los eventos son excluidos aquí si se mueve una ocurrencia de evento.',
        inclusions:   'Estos son eventos o periodos de tiempo donde se agregaron eventos fuera de la programación habitual. Los eventos son agregados aquí si se mueve una ocurrencia de evento.',
        cancelled:    'Estos son eventos o periodos de tiempo donde otros eventos fueron cancelados.',
        edit:         'Editar evento',
        add:          'Agregar evento',
        location:     'Agregar ubicación',
        description:  'Agregar descripción',
        calendar:     'Calendario',
        tabs: {
          details:    'Detalles del Evento',
          forecast:   'Pronóstico',
          removed:    'Eliminado',
          added:      'Agregado',
          cancelled:  'Cancelado'
        }
      },
      busyOptions: [
        {text: 'Ocupado'},
        {text: 'Libre'}
      ]
    },
    dsScheduleActions: {
      labels: {
        remove:     'Eliminar este evento',
        exclude:    'Eliminar esta occurrencia',
        cancel:     'Cancelar esta occurrencia',
        uncancel:   'Anular cancelación',
        move:       'Mover esta occurrencia',
        include:    'Agregar nueva ocurrencia',
        setStart:   'Definir como primer ocurrencia',
        setEnd:     'Definir como última ocurrencia',
        pickerOk:   'De Acuerdo',
        pickerCancel:'Cancelar'
      }
    },
    dsScheduleForecast: {
      labels: {
        prefix:     'El pronóstico muestra anterior y siguiente',
        suffix:     'ocurrencias de evento dentro de un año.'
      }
    },
    dsScheduleFrequencyDay: {
      labels: {
        type: 'Días'
      },
      options: [
        { text: 'Cualquier día' },
        { text: 'On the following days...' },
        { text: 'Every _ days starting on _' }
      ],
      types: [
        { text: 'Day of the month' },
        { text: 'Último día del Mes' },
        { text: 'Day of the year' }
      ]
    },
    dsScheduleFrequencyDayOfWeek: {
      weekdays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
      labels: {
        type: 'Días de la semana'
      },
      options: [
        { text: 'Cualquier día de la semana' },
        { text: 'En los próximos días de la semana...' },
        { text: 'Cada _ días de la semana empezando en _' },
        { text: 'Fines de semana' },
        { text: 'Días de la semana' }
      ]
    },
    dsScheduleFrequencyMonth: {
      labels: {
        type: 'Meses'
      },
      months: [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre'
      ],
      options: [
        { text: 'Cualquier mes' },
        { text: 'En los próximos meses...' },
        { text: 'Cada _ meses empezando en _' }
      ]
    },

    dsScheduleFrequencyWeek: {
      labels: {
        type: 'Semanas'
      },
      options: [
        { text: 'Cualquier semana' },
        { text: 'En las próximas semanas...' },
        { text: 'Cada _ semanas empezando en _' }
      ],
      types: [
        { text: 'Semana del mes (primer semana tiene un Jueves)' },
        { text: 'Período de semana del mes (comienza el primer día del mes)' },
        { text: 'Semana completa del mes (0° = la semana anterior si la hubiera)' },
        { text: 'Último intervalo de semana del mes (comienza el último día del mes)' },
        { text: 'La última semana completa del mes (0° = la semana anterior si la hubiera)' },
        { text: 'Semana del año (primer semana tiene un Jueves)' },
        { text: 'Intervalo de semana del año (comienza el primer día del año)' },
        { text: 'Semana completa del año (0th = the week before if any)' },
        { text: 'Último intervalo de semana del año (comienza el último día del año)' },
        { text: 'Última semana completa del año (0° = la semana anterior si la hubiera)' }
      ]
    },

    dsScheduleFrequencyYear: {
      labels: {
        type: 'Años'
      },
      options: [
        { text: 'Cualquier año' },
        { text: 'En los próximos años...' },
        { text: 'Cada _ años empezando en _' }
      ]
    },

    dsScheduleSpan: {
      labels: {
        startless:  'Principio de los tiempos',
        endless:    'Fin de los tiempos'
      },
      formats: {
        start:      'MMMM Do, YYYY',
        end:        'MMMM Do, YYYY'
      }
    },

    dsScheduleTime: {
      labels: {
        remove:     'Eliminar Hora',
        add:        'Agregar Hora'
      }
    },

    dsScheduleTimes: {
      labels: {
        all:        'Todo el día',
        minute:     'minuto',
        minutes:    'minutos',
        hour:       'hora',
        hours:      'horas',
        day:        'día',
        days:       'días',
        week:       'semana',
        weeks:      'semanas',
        month:      'mes',
        months:     'meses',
        second:     'segundo',
        seconds:    'segundos'
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
        cancel:   'Cancelar'
      }
    },

    dsWeekDayHeader: {
      formats: {
        weekday:    'ddd'
      }
    },

    dsWeeksView: {
      weekdays: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']
    },

    dsDaysView: {
      hours: [
        '    ', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am',
        '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm'
      ]
    },

    dsDayPicker: {
      weekdays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
      labels: {
        prevMonth: 'Mes Anterior',
        nextMonth: 'Mes Siguiente'
      }
    }
  }
}
