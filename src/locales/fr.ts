
export default {
  promptLabels: {
    actionRemove:       'Êtes vous sûr de vouloir supprimer cet événement ?',
    actionExclude:      "Êtes-vous sûr de vouloir supprimer cette occurrence d'événement ?",
    actionCancel:       'Êtes-vous sûr de vouloir annuler cet événement ?',
    actionUncancel:     "Êtes-vous sûr de vouloir annuler l'annulation de cette événement",
    actionSetStart:     'Êtes-vous sûr de vouloir définir cette occurrence comme la première ?',
    actionSetEnd:       'Êtes-vous sûr de vouloir définir cette occurrence comme la dernière ?',
    actionMove:         'Êtes-vous sûr de vouloir déplacer cet événement ?',
    actionInclude:      "Êtes-vous sûr de vouloir ajouter une occurrence d'événement ?",
    move:               'Êtes-vous sûr de vouloir déplacer cet événement ?',
    toggleAllDay:       'Êtes-vous sûr de vouloir changer si cet événement se produit toute la journée ?',
    removeExistingTime: "Êtes-vous sûr de vouloir supprimer toutes les occurrences d'événements à ce stade ?"
  },
  placeholder: {
    noTitle: '(pas de titre)'
  },
  patterns: {
    lastDay:        (day) => 'Dernier jour du mois',
    lastDayOfMonth: (day) => 'Dernier jour de ' + day.format('MMMM'),
    lastWeekday:    (day) => 'Dernier ' + day.format('dddd') + ' de ' + day.format('MMMM')
  },
  colors: [
    { text: 'Rouge' },
    { text: 'Rose' },
    { text: 'Violet' },
    { text: 'Violet foncé' },
    { text: 'Bleu indigo' },
    { text: 'Bleu' },
    { text: 'Glue' },
    { text: 'Bleu clair' },
    { text: 'Cyan' },
    { text: 'Bleu canard' },
    { text: 'Vert' },
    { text: 'Vert clair' },
    { text: 'Citron vert' },
    { text: 'Jaune' },
    { text: 'Ambré' },
    { text: 'Orange' },
    { text: 'Orange foncé' },
    { text: 'Marron' },
    { text: 'Bleu-gris' },
    { text: 'Gris' },
    { text: 'Noir' }
  ],
  icons: [
    { text: 'Alarme' },
    { text: 'Étoile' },
    { text: 'Coeur' },
    { text: 'Action' },
    { text: 'Affectation' },
    { text: 'Dangé' },
    { text: 'Argent' },
    { text: 'Charge' },
    { text: 'Accueil' },
    { text: 'Play' },
    { text: 'Email' },
    { text: 'Téléphone' },
    { text: 'Graphique' },
    { text: 'Cycliste' },
    { text: 'Voyage' }
  ],
  defaults: {
    dsDay: {
      formats: {
        month:  'MMM'
      }
    },
    dsCalendarApp: {
      types: [
        { label: 'Jour' },
        { label: 'Semaine' },
        { label: 'Mois' },
        { label: 'Année' },
        { label: 'Planning' },
        { label: '4 jours' }
      ],
      formats: {
        today: 'dddd D MMMM',
        xs: 'MMM'
      },
      labels: {
        next: (type) => type ? 'Suivant ' + type.label.toLowerCase() : 'Suivant',
        prev: (type) => type ? 'Précédent ' + type.label.toLowerCase() : 'Précédent',
        moveCancel: 'Annuler le déplacement',
        moveSingleEvent: "Déplacer l'événement",
        moveOccurrence: "Déplacer uniquement cette occurrence d'événement",
        moveAll: "Déplacer toutes les occurrences d'événements",
        moveDuplicate: "Ajouter une occurrence d'événement",
        promptConfirm: 'Oui',
        promptCancel: 'Non',
        today: "AUJOURD'HUI"
      }
    },
    dsAgendaEvent: {
      formats: {
        firstLine:  'ddd',
        secondLine: 'MMM Do',
        start:      'dddd D MMMM',
        time:       'h:mm a'
      },
      labels: {
        allDay:   'Toute la journée',
        options:  'Options',
        close:    'Fermer',
        day:      ['jour', 'jours'],
        days:     ['jour', 'jours'],
        minute:   ['minute', 'minutes'],
        minutes:  ['minute', 'minutes'],
        hour:     ['heure', 'heures'],
        hours:    ['heure', 'heures'],
        week:     ['semaine', 'semaines'],
        weeks:    ['semaine', 'semaines'],
        second:   ['seconde', 'secondes'],
        seconds:  ['seconde', 'secondes'],
        busy:     'Occupé',
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
        start:    'dddd D MMMM',
        time:     'h:mm a'
      },
      labels: {
        allDay:   'Toute la journée',
        options:  'Options',
        close:    'Fermer',
        day:      ['jour', 'jours'],
        days:     ['jour', 'jours'],
        minute:   ['minute', 'minutes'],
        minutes:  ['minute', 'minutes'],
        hour:     ['heure', 'heures'],
        hours:    ['heure', 'heures'],
        week:     ['semaine', 'semaines'],
        weeks:    ['semaine', 'semaines'],
        second:   ['seconde', 'secondes'],
        seconds:  ['seconde', 'secondes'],
        busy:     'Occupé',
        free:     'Libre'
      }
    },
    dsCalendarEventCreatePopover: {
      formats: {
        start:    'dddd D MMMM',
        time:     'h:mm a'
      },
      labels: {
        title:    'Ajouter un titre',
        allDay:   'Toute la journée',
        close:    'Fermer',
        save:     'Sauvegarder',
        day:      ['jour', 'jours'],
        days:     ['jour', 'jours'],
        minute:   ['minute', 'minutes'],
        minutes:  ['minute', 'minutes'],
        hour:     ['heure', 'heures'],
        hours:    ['heure', 'heures'],
        week:     ['semaine', 'semaines'],
        weeks:    ['semaine', 'semaines'],
        second:   ['seconde', 'secondes'],
        seconds:  ['seconde', 'secondes'],
        busy:     'Occupé',
        free:     'Libre',
        location: 'Ajouter un emplacement',
        description: 'Ajouter une description',
        calendar: 'Calendrier',
      },
      busyOptions: [
        {text: 'Occupé'},
        {text: 'Libre'}
      ]
    },
    dsSchedule: {
      labels: {
        editCustom:   'Modifier'
      }
    },
    dsEvent: {
      labels: {
        moreActions:  'Autres actions',
        cancel:       "Annuler les changements d'événement",
        save:         'Sauvegarder',
        title:        'Titre',
        exclusions:   "Ce sont des événements ou des périodes de temps dans lesquels un événement normal a été exclu de la planification. Les événements sont exclus ici si une occurrence d'événement est déplacée.",
        inclusions:   "Ce sont des événements ou des périodes de temps qui ont été ajoutés en dehors du calendrier. Les événements sont ajoutés ici si une occurrence d'événement est déplacée.",
        cancelled:    'Ce sont des événements ou des périodes de temps qui ont été annulés.',
        edit:         "Modifier l'événement",
        add:          'Ajouter un événement',
        location:     'Ajouter un emplacement',
        description:  'Ajouter une description',
        calendar:     'Calendrier',
        tabs: {
          details:    "Détails de l'événement",
          forecast:   'Prévoir',
          removed:    'Enlevé',
          added:      'Ajouté',
          cancelled:  'Annulé'
        }
      },
      busyOptions: [
        {text: 'Occupé'},
        {text: 'Libre'}
      ]
    },
    dsScheduleActions: {
      labels: {
        remove:     'Supprimer cet événement',
        exclude:    'Supprimer cette occurrence',
        cancel:     'Annuler cette occurrence',
        uncancel:   "Annuler l'annulation",
        move:       'Déplacer cette occurrence',
        include:    'Ajouter une nouvelle occurrence',
        setStart:   'Définir comme première occurrence',
        setEnd:     'Définir comme dernière occurrence',
        pickerOk:   'OK',
        pickerCancel:'Annuler'
      }
    },
    dsScheduleForecast: {
      labels: {
        prefix:     'Afficher les',
        suffix:     "prochaines occurences de l'événement pour les années à venir"
      }
    },
    dsScheduleFrequencyDay: {
      labels: {
        type: 'Jours'
      },
      options: [
        { text: "N'importe quel jour" },
        { text: 'Les jours suivants...' },
        { text: 'Chaque _ jours à partir de _' }
      ],
      types: [
        { text: 'Jour du mois' },
        { text: 'Dernier jour du mois' },
        { text: "Jour de l'année" }
      ]
    },
    dsScheduleFrequencyDayOfWeek: {
      weekdays: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
      labels: {
        type: 'Jours de la semaine'
      },
      options: [
        { text: "N'importe quel jour de la semaine" },
        { text: 'Les jours suivants de la semaine...' },
        { text: 'Chaque _ semaine à partir du _' },
        { text: 'Weekends' },
        { text: 'Jours de la semaine' }
      ]
    },
    dsScheduleFrequencyMonth: {
      labels: {
        type: 'Mois'
      },
      months: [
        'Janvier',
        'Février',
        'Mars',
        'Avril',
        'Mai',
        'Juin',
        'Juillet',
        'Août',
        'Septembre',
        'Octobre',
        'Novembre',
        'Décembre'
      ],
      options: [
        { text: "N'importe quel mois" },
        { text: 'Les mois suivants...' },
        { text: 'Chaque _ mois à partir du _' }
      ]
    },

    dsScheduleFrequencyWeek: {
      labels: {
        type: 'Semaines'
      },
      options: [
        { text: 'Toutes les semaines' },
        { text: 'Les semaines suivantes...' },
        { text: 'Chaque _ semaines à partir du _' }
      ],
      types: [
        { text: 'Semaine du mois (la première semaine à avoir un jeudi)' },
        { text: 'Semaine du mois (commence le premier jour du mois)' },
        { text: "Semaine complète du mois (0ème = la semaine d'avant s'il y en a une)" },
        { text: 'Dernière semaine du mois (commence le dernier jour du mois)' },
        { text: "Dernière semaine complète du mois (0ème = la semaine d'après s'il y en a une)" },
        { text: "Semaine de l'année (la première semaine à avoir un jeudi)" },
        { text: "Semaine de l'année (commence le premier jour de l'année)" },
        { text: "Semaine complète de l'année (0ème = la semaine d'avant s'il y en a une)" },
        { text: "Dernière semaine de l'année (commence le dernier jour de l'année)" },
        { text: "Dernière semaine complète de l'année (0ème = la semaine d'après s'il y en a une)" }
      ]
    },

    dsScheduleFrequencyYear: {
      labels: {
        type: 'Années'
      },
      options: [
        { text: 'Tous les ans' },
        { text: 'Les années suivantes...' },
        { text: 'Chaque _ années à partir de _' }
      ]
    },

    dsScheduleSpan: {
      labels: {
        startless:  'Début des temps',
        endless:    'Fin des temps'
      },
      formats: {
        start:      'MMMM Do, YYYY',
        end:        'MMMM Do, YYYY'
      }
    },

    dsScheduleTime: {
      labels: {
        remove:     'Enlever le temps',
        add:        'Ajouter un temps'
      }
    },

    dsScheduleTimes: {
      labels: {
        all:        'Toute la journée',
        minute:     'minute',
        minutes:    'minutes',
        hour:       'heure',
        hours:      'heures',
        day:        'jour',
        days:       'jours',
        week:       'semaine',
        weeks:      'semaines',
        second:     'seconde',
        seconds:    'secondes',
        month:      'mois',
        months:     'mois'
      }
    },

    dsScheduleType: {
      formats: {
        date:       'LL'
      }
    },

    dsScheduleTypeCustomDialog: {
      labels: {
        save:     'Sauvegarder',
        cancel:   'Annuler'
      }
    },

    dsWeekDayHeader: {
      formats: {
        weekday:    'ddd'
      }
    },

    dsWeeksView: {
      weekdays: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']
    },

    dsDaysView: {
      hours: [
        '    ', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
        '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
      ]
    },

    dsDayPicker: {
      weekdays: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
      labels: {
        prevMonth: 'Mois précédent',
        nextMonth: 'Mois suivant'
      }
    }
  }
}
