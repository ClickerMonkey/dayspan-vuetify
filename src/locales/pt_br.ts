
export default {
  promptLabels: {
    actionRemove:       'Tem certeza de que deseja remover este evento ?',
    actionExclude:      'Tem certeza de que deseja remover esta ocorrência de evento ?',
    actionCancel:       'Você tem certeza que quer cancelar este evento ?',
    actionUncancel:     'Tem certeza de que deseja cancelar este evento ?',
    actionSetStart:     'Tem certeza de que deseja definir essa ocorrência como a primeira ?',
    actionSetEnd:       'Tem certeza de que deseja definir essa ocorrência como a última ?',
    actionMove:         'Tem certeza de que deseja mover este evento ?',
    actionInclude:      'Tem certeza de que deseja adicionar uma ocorrência de evento ?',
    move:               'Tem certeza de que deseja mover este evento ?',
    toggleAllDay:       'Tem certeza de que deseja alterar se esse evento ocorre o dia todo ?',
    removeExistingTime: 'Tem certeza de que deseja remover todas as ocorrências do evento neste momento ?'
  },
  placeholder: {
    noTitle: '(Sem título)'
  },
  patterns: {
    lastDay:        (day) => 'Último dia do mês',
    lastDayOfMonth: (day) => 'Último dia de' + day.format('MMMM'),
    lastWeekday:    (day) => 'Último ' + day.format('dddd') + ' em ' + day.format('MMMM')
  },
  colors: [
    { text: 'Vermelho' },
    { text: 'Rosa' },
    { text: 'Roxo' },
    { text: 'Roxo Profundo' },
    { text: 'Indigo' },
    { text: 'Azul' },
    { text: 'Cola' },
    { text: 'Azul Claro' },
    { text: 'Ciano' },
    { text: 'Cerceta' },
    { text: 'Verde' },
    { text: 'Verde Claro' },
    { text: 'Lima' },
    { text: 'Amarelo' },
    { text: 'Âmbar' },
    { text: 'Laranja' },
    { text: 'Laranja Claro' },
    { text: 'Marrom' },
    { text: 'Cinza Claro' },
    { text: 'Cinza' },
    { text: 'Preto' }
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
        { label: 'Dia' },
        { label: 'Semana' },
        { label: 'Mês' },
        { label: 'Ano' },
        { label: 'Agenda' },
        { label: '4 Dias' }
      ],
      formats: {
        today: 'dddd, MMMM D',
        xs: 'MMM'
      },
      labels: {
        next: (type) => type ? 'Próximo ' + type.label.toLowerCase() : 'Próximo',
        prev: (type) => type ? 'Anterior ' + type.label.toLowerCase() : 'Anterior',
        moveCancel: 'Cancelar movimento',
        moveSingleEvent: 'Mover evento',
        moveOccurrence: 'Mover apenas esta ocorrência do evento',
        moveAll: 'Mover todas as ocorrências do evento',
        moveDuplicate: 'Adicionar ocorrência de evento',
        promptConfirm: 'Sim',
        promptCancel: 'Não',
        today: 'Hoje'
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
        allDay:   'Dia inteiro',
        options:  'Opções',
        close:    'Fechar',
        day:      ['dia', 'dias'],
        days:     ['dia', 'dias'],
        minute:   ['minuto', 'minutos'],
        minutes:  ['minuto', 'minutos'],
        hour:     ['hora', 'horas'],
        hours:    ['hora', 'horas'],
        week:     ['semana', 'semanas'],
        weeks:    ['semana', 'semanas'],
        second:   ['segundo', 'segundos'],
        seconds:  ['segundo', 'segundos'],
        busy:     'Ocupado',
        free:     'Livre'
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
        allDay:   'Dia inteiro',
        options:  'Opções',
        close:    'Fechar',
        day:      ['dia', 'dias'],
        days:     ['dia', 'dias'],
        minute:   ['minuto', 'minutos'],
        minutes:  ['minuto', 'minutos'],
        hour:     ['hora', 'horas'],
        hours:    ['hora', 'horas'],
        week:     ['semana', 'semanas'],
        weeks:    ['semana', 'semanas'],
        second:   ['segundo', 'segundos'],
        seconds:  ['segundo', 'segundos'],
        busy:     'Ocupado',
        free:     'Livre'
      }
    },
    dsCalendarEventCreatePopover: {
      formats: {
        start:    'dddd, MMMM D',
        time:     'h:mm a'
      },
      labels: {
        title:    'Adicionar título',
        allDay:   'Dia inteiro',
        close:    'Fechar',
        save:     'Salvar',
        day:      ['dia', 'dias'],
        days:     ['dia', 'dias'],
        minute:   ['minuto', 'minutos'],
        minutes:  ['minuto', 'minutos'],
        hour:     ['hora', 'horas'],
        hours:    ['hora', 'horas'],
        week:     ['semana', 'semanas'],
        weeks:    ['semana', 'semanas'],
        second:   ['segundo', 'segundos'],
        seconds:  ['segundo', 'segundos'],
        busy:     'Ocupado',
        free:     'Livre',
        location: 'Adicionar localização',
        description: 'Adicionar descrição',
        calendar: 'Calendário',
      },
      busyOptions: [
        {text: 'Ocupado'},
        {text: 'Livre'}
      ]
    },
    dsSchedule: {
      labels: {
        editCustom:   'Editar'
      }
    },
    dsEvent: {
      labels: {
        moreActions:  'Mais ações...',
        cancel:       'Cancelar alterações de evento',
        save:         'Salvar',
        title:        'Título',
        exclusions:   'Estes são eventos ou períodos de tempo em que um evento que ocorre normalmente foi excluído do planejamento. Os eventos são excluídos aqui se uma ocorrência de evento for movida.',
        inclusions:   'Estes são eventos ou intervalos de tempo em que os eventos foram adicionados fora do cronograma que ocorre normalmente. Eventos são adicionados aqui se uma ocorrência de evento for movida.',
        cancelled:    'Estes são eventos ou períodos de tempo em que os eventos foram cancelados.',
        edit:         'Edit event',
        add:          'Adicionar evento',
        location:     'Adicionar localização',
        description:  'Adicionar descrição',
        calendar:     'Calendar',
        tabs: {
          details:    'Detalhes do evento',
          forecast:   'Previsão',
          removed:    'Removido',
          added:      'Adicionado',
          cancelled:  'Cancelado'
        }
      },
      busyOptions: [
        {text: 'Ocupado'},
        {text: 'Livre'}
      ]
    },
    dsScheduleActions: {
      labels: {
        remove:     'Remover este evento',
        exclude:    'Remover esta ocorrência',
        cancel:     'Cancelar esta ocorrência',
        uncancel:   'Anular o cancelamento',
        move:       'Mova esta ocorrência',
        include:    'Adicionar nova ocorrência',
        setStart:   'Definir como primeira ocorrência',
        setEnd:     'Definir como última ocorrência',
        pickerOk:   'OK',
        pickerCancel:'Cancelar'
      }
    },
    dsScheduleForecast: {
      labels: {
        prefix:     'A previsão mostra anterior e próxima',
        suffix:     'ocorrências de eventos dentro de um período de anos.'
      }
    },
    dsScheduleFrequencyDay: {
      labels: {
        type: 'Dias'
      },
      options: [
        { text: 'Qualquer dia' },
        { text: 'Nos dias seguintes ...' },
        { text: 'TOdos _ dias que começam em _' }
      ],
      types: [
        { text: 'Dia do mês' },
        { text: 'Último dia do mês' },
        { text: 'Dia do ano' }
      ]
    },
    dsScheduleFrequencyDayOfWeek: {
      weekdays: ['Domingo','Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      labels: {
        type: 'Dias da semana'
      },
      options: [
        { text: 'Qualquer dia da semana' },
        { text: 'Nos dias seguintes da semana ...' },
        { text: 'Cada _ dia da semana começando em _ ' },
        { text: 'Finais de semana' },
        { text: 'Dias úteis' }
      ]
    },
    dsScheduleFrequencyMonth: {
      labels: {
        type: 'Mêses'
      },
      months: [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro'
      ],
      options: [
        { text: 'Qualquer mês' },
        { text: 'Nos mêses seguintes...' },
        { text: 'Todos _ mêses iniciando em _' }
      ]
    },

    dsScheduleFrequencyWeek: {
      labels: {
        type: 'Semanas'
      },
      options: [
        { text: 'Qualquer semana' },
        { text: 'Nas semanas seguintes ...' },
        { text: 'Todos _ iniciando em _' }
      ],
      types: [
        { text: 'Semana do mês (primeira semana tem quinta-feira)' },
        { text: 'Período de semana do mês (começa no primeiro dia do mês)' },
        { text: 'Semana inteira do mês (0 = a semana anterior, se houver)' },
        { text: 'Última semana do mês (começa no último dia do mês)' },
        { text: 'Última semana completa do mês (0 = a semana seguinte, se houver)' },
        { text: 'Semana do ano (primeira semana tem quinta-feira)' },
        { text: 'Período de semana do ano (começa no primeiro dia do ano)' },
        { text: 'Semana inteira do ano (0 = a semana anterior, se houver)' },
        { text: 'Última semana do ano (começa no último dia do ano)' },
        { text: 'Última semana completa do ano (0 = a semana seguinte, se houver)' }
      ]
    },

    dsScheduleFrequencyYear: {
      labels: {
        type: 'Anos'
      },
      options: [
        { text: 'Qualquer ano' },
        { text: 'Nos anos seguintes ...' },
        { text: 'Todos _ anos iniciando em _' }
      ]
    },

    dsScheduleSpan: {
      labels: {
        startless:  'Início do tempo',
        endless:    'Fim do tempo'
      },
      formats: {
        start:      'MMMM Do, YYYY',
        end:        'MMMM Do, YYYY'
      }
    },

    dsScheduleTime: {
      labels: {
        remove:     'Remover tempo',
        add:        'Adicionar tempo'
      }
    },

    dsScheduleTimes: {
      labels: {
        all:        'Dia inteiro',
        minute:     'minuto',
        minutes:    'minutos',
        hour:       'hora',
        hours:      'horas',
        day:        'dia',
        days:       'dias',
        week:       'semana',
        weeks:      'semanas',
        month:      'mês',
        months:     'mêses',
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
        save:     'Salvar',
        cancel:   'Cancelar'
      }
    },

    dsWeekDayHeader: {
      formats: {
        weekday:    'ddd'
      }
    },

    dsWeeksView: {
      weekdays: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
    },

    dsDaysView: {
      hours: [
        '    ', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am',
        '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm'
      ]
    },

    dsDayPicker: {
      weekdays: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      labels: {
        prevMonth: 'Mês anterior',
        nextMonth: 'Próximo mês'
      }
    }
  }
}
