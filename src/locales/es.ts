export default {
  promptLabels: {
    actionRemove: "¿Está seguro de que quiere eliminar este evento?",
    actionExclude:
      "¿Esta seguro de que quiere eliminar esta repetición del evento?",
    actionCancel: "¿Está seguro de que quiere cancelar este evento?",
    actionUncancel: "¿Está seguro de que quiere restablecer este evento?",
    actionSetStart:
      "¿Esta seguro de que quiere que esta sea la primera repetición?",
    actionSetEnd:
      "Está seguro de que quiere que esta sea la última repetición?",
    actionMove: "¿Está seguro de que quiere mover este evento?",
    actionInclude:
      "¿Esta seguro de que quiere añadir una repetición de un evento?",
    move: "¿Está seguro de que quiere mover este evento?",
    toggleAllDay:
      "¿Está seguro de que quiere modificar que este evento tiene lugar todo el día?",
    removeExistingTime:
      "¿Esta seguro de que quiere eliminar todas las repeticiones del evento que tienen lugar a esta hora?"
  },
  placeholder: {
    noTitle: "(sin título)"
  },
  patterns: {
    lastDay: day => "Último día del mes",
    lastDayOfMonth: day => "Último día de " + day.format("MMMM"),
    lastWeekday: day =>
      "Último " + day.format("dddd") + " de " + day.format("MMMM")
  },
  colors: [
    { text: "Rojo" },
    { text: "Rosa" },
    { text: "Morado" },
    { text: "Morado oscuro" },
    { text: "Añil" },
    { text: "Azul" },
    { text: "Azul oscuro" },
    { text: "Azul claro" },
    { text: "Cian" },
    { text: "Verde azulado" },
    { text: "Verde" },
    { text: "Verde claro" },
    { text: "Verde lima" },
    { text: "Amarillo" },
    {
      text: "Ámbar"
    },
    { text: "Naranja" },
    { text: "Naranja oscuro" },
    { text: "Marrón" },
    { text: "Gris azulado" },
    { text: "Gris" },
    { text: "Negro" }
  ],
  icons: [
    { text: "Alarma" },
    { text: "Estrella" },
    { text: "Corazón" },
    { text: "Acción" },
    { text: "Tarea" },
    { text: "Advertencia" },
    { text: "Dinero" },
    { text: "Cobro" },
    { text: "Inicio" },
    { text: "Play" },
    { text: "Email" },
    { text: "Teléfono" },
    { text: "Gráfico" },
    { text: "Ciclista" },
    { text: "Viaje" }
  ],
  defaults: {
    dsDay: {
      formats: {
        month: "MMM"
      }
    },
    dsCalendarApp: {
      types: [
        { label: "Día" },
        { label: "Semana" },
        { label: "Mes" },
        { label: "Año" },
        { label: "Horario" },
        { label: "4 días" }
      ],
      formats: {
        today: "dddd, MMMM D",
        xs: "MMM"
      },
      labels: {
        next: type =>
          type ? "Siguiente " + type.label.toLowerCase() : "Siguiente",
        prev: type =>
          type ? "Anterior " + type.label.toLowerCase() : "Anterior",
        moveCancel: "Cancelar mover",
        moveSingleEvent: "Mover evento",
        moveOccurrence: "Mover solo esta repetición del evento",
        moveAll: "Mover todas las repeticiones del evento",
        moveDuplicate: "Añadir repetición del evento",
        promptConfirm: "Sí",
        promptCancel: "No",
        today: "HOY"
      }
    },
    dsAgendaEvent: {
      formats: {
        firstLine: "ddd",
        secondLine: "MMM Do",
        start: "dddd, MMMM D",
        time: "h:mm a"
      },
      labels: {
        allDay: "Todo el día",
        options: "Opciones",
        close: "Cerrar",
        day: ["día", "días"],
        days: ["día", "días"],
        minute: ["minuto", "minutos"],
        minutes: ["minuto", "minutos"],
        hour: ["hora", "horas"],
        hours: ["hora", "horas"],
        week: ["semana", "semanas"],
        weeks: ["semana", "semanas"],
        second: ["segundo", "segundos"],
        seconds: ["segundo", "segundos"],
        busy: "Ocupado",
        free: "Disponible"
      }
    },
    dsCalendarEventChip: {
      formats: {
        fullDay: "ddd MMM Do YYYY",
        timed: "ddd MMM Do YYYY"
      }
    },
    dsCalendarEventPopover: {
      formats: {
        start: "dddd, MMMM D",
        time: "h:mm a"
      },
      labels: {
        allDay: "Todo el día",
        options: "Opciones",
        close: "Cerrar",
        day: ["día", "días"],
        days: ["día", "días"],
        minute: ["minuto", "minutos"],
        minutes: ["minuto", "minutos"],
        hour: ["hora", "horas"],
        hours: ["hora", "horas"],
        week: ["semana", "semanas"],
        weeks: ["semana", "semanas"],
        second: ["segundo", "segundos"],
        seconds: ["segundo", "segundos"],
        busy: "Ocupado",
        free: "Disponible"
      }
    },
    dsCalendarEventCreatePopover: {
      formats: {
        start: "dddd, MMMM D",
        time: "h:mm a"
      },
      labels: {
        title: "Añadir título",
        allDay: "Todo el día",
        close: "Cerrar",
        save: "Guardar",
        day: ["día", "días"],
        days: ["día", "días"],
        minute: ["minuto", "minutos"],
        minutes: ["minuto", "minutos"],
        hour: ["hora", "horas"],
        hours: ["hora", "horas"],
        week: ["semana", "semanas"],
        weeks: ["semana", "semanas"],
        second: ["segundo", "segundos"],
        seconds: ["segundo", "segundos"],
        busy: "Ocupado",
        free: "Disponible",
        location: "Añadir ubicación",
        description: "Añadir descripción",
        calendar: "Calendario"
      },
      busyOptions: [{ text: "Ocupado" }, { text: "Disponible" }]
    },
    dsSchedule: {
      labels: {
        editCustom: "Editar"
      }
    },
    dsEvent: {
      labels: {
        moreActions: "Más acciones...",
        cancel: "Cancelar cambios en el evento",
        save: "Guardar",
        title: "Título",
        exclusions:
          "Evento o periodo de tiempo en el que un evento que se repite con normalidad es excluido del horario. Si se ha movido una repetición de un evento, ese evento no figurará aquí.",
        inclusions:
          "Evento o periodo de tiempo en el que se ha añadido un evento fuera del horario normal. Si se ha movido una repetición de un evento, ese evento se añadirá aquí.",
        cancelled:
          "Eventos o periodos de tiempo en el que un evento se ha cancelado.",
        edit: "Editar evento",
        add: "Añadir evento",
        location: "Añadir ubicación",
        description: "Añadir descripción",
        calendar: "Calendario",
        tabs: {
          details: "Detalles del evento",
          forecast: "Previsión",
          removed: "Eliminado",
          added: "Añadido",
          cancelled: "Cancelado"
        }
      },
      busyOptions: [{ text: "Ocupado" }, { text: "Disponible" }]
    },
    dsScheduleActions: {
      labels: {
        remove: "Eliminar este evento",
        exclude: "Eliminar esta repetición",
        cancel: "Cancelar esta repetición",
        uncancel: "Restablecer",
        move: "Mover esta repetición",
        include: "Añadir una nueva repetición",
        setStart: "Definir como primera repetición",
        setEnd: "Definir como última repetición",
        pickerOk: "OK",
        pickerCancel: "Cancelar"
      }
    },
    dsScheduleForecast: {
      labels: {
        prefix: "La previsión muestra el anterior y el siguiente",
        suffix: "Repeticiones de un evento a lo largo de un año."
      }
    },
    dsScheduleFrequencyDay: {
      labels: {
        type: "Días"
      },
      options: [
        { text: "Cualquier día" },
        { text: "Los próximos días..." },
        { text: "Cada _ días a partir de _" }
      ],
      types: [
        { text: "Día del mes" },
        { text: "Último día del mes" },
        { text: "Día del año" }
      ]
    },
    dsScheduleFrequencyDayOfWeek: {
      weekdays: [
        "Domingo",
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado"
      ],
      labels: {
        type: "Días de la semana"
      },
      options: [
        { text: "Cualquier día de la semana" },
        { text: "Los próximos días de la semana..." },
        { text: "Cada _ días a partir de _" },
        { text: "Fines de semana" },
        { text: "Días de diario" }
      ]
    },
    dsScheduleFrequencyMonth: {
      labels: {
        type: "Meses"
      },
      months: [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre"
      ],
      options: [
        { text: "Cualquier mes" },
        { text: "Los próximos meses..." },
        { text: "Cada _ meses a partir de _" }
      ]
    },

    dsScheduleFrequencyWeek: {
      labels: {
        type: "Semanas"
      },
      options: [
        { text: "Cualquier semana" },
        { text: "Las próximas semanas..." },
        { text: "Cada _ semanas a partir de _" }
      ],
      types: [
        { text: "Semana del mes (primera semana que tenga un jueves)" },
        { text: "Semana del mes (en la que cae el primer día del mes)" },
        {
          text:
            "Semana completa del mes (semana 0 = semana anterior a 1ª semana completa, si la hay)"
        },
        { text: "Última semana del mes (en la que cae el último día del mes)" },
        {
          text:
            "Última semana completa del mes (semana 0 = semana siguiente a última semana completa, si la hay)"
        },
        { text: "Semana del año (primera semana que tenga un jueves)" },
        { text: "Semana del año (en la que cae el primer día del año)" },
        {
          text:
            "Semana completa del año (semana 0 = semana anterior a 1ª semana completa, si la hay"
        },
        { text: "Última semana del año (en la que cae el último día del año)" },
        {
          text:
            "Última semana del año (semana 0 = semana siguiente a última semana completa, si la hay)"
        }
      ]
    },

    dsScheduleFrequencyYear: {
      labels: {
        type: "Años"
      },
      options: [
        { text: "Cualquier año" },
        { text: "Los siguientes años..." },
        { text: "Cada _ años a partir de _" }
      ]
    },

    dsScheduleSpan: {
      labels: {
        startless: "Principio de los tiempos",
        endless: "Final de los tiempos"
      },
      formats: {
        start: "MMMM Do, YYYY",
        end: "MMMM Do, YYYY"
      }
    },

    dsScheduleTime: {
      labels: {
        remove: "Eliminar hora",
        add: "Añadir hora"
      }
    },

    dsScheduleTimes: {
      labels: {
        all: "Todo el día",
        minute: "minuto",
        minutes: "minutos",
        hour: "hora",
        hours: "horas",
        day: "día",
        days: "días",
        week: "semana",
        weeks: "semanas",
        month: "mes",
        months: "meses",
        second: "segundo",
        seconds: "segundos"
      }
    },

    dsScheduleType: {
      formats: {
        date: "LL"
      }
    },

    dsScheduleTypeCustomDialog: {
      labels: {
        save: "Guardar",
        cancel: "Cancelar"
      }
    },

    dsWeekDayHeader: {
      formats: {
        weekday: "ddd"
      }
    },

    dsWeeksView: {
      weekdays: ["DO", "LU", "MA", "MI", "JU", "VI", "SA"]
    },

    dsDaysView: {
      hours: [
        "    ",
        "1am",
        "2am",
        "3am",
        "4am",
        "5am",
        "6am",
        "7am",
        "8am",
        "9am",
        "10am",
        "11am",
        "12pm",
        "1pm",
        "2pm",
        "3pm",
        "4pm",
        "5pm",
        "6pm",
        "7pm",
        "8pm",
        "9pm",
        "10pm",
        "11pm"
      ]
    },

    dsDayPicker: {
      weekdays: [
        "Domingo",
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado"
      ],
      labels: {
        prevMonth: "Mes anterior",
        nextMonth: "Mes siguiente"
      }
    }
  }
};
