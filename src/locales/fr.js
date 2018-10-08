
export default {
  promptLabels: {
    actionRemove:       '�tes vous s�r de vouloir supprimer cet ev�nement ?',
    actionExclude:      "�tes-vous s�r de vouloir supprimer cette occurrence d'�v�nement ?",
    actionCancel:       '�tes-vous s�r de vouloir annuler cet ev�nement ?',
    actionUncancel:     "�tes-vous s�r de vouloir annuler l'annulation de cette �v�nement",
    actionSetStart:     '�tes-vous s�r de vouloir d�finir cette occurrence comme la premi�re ?',
    actionSetEnd:       '�tes-vous s�r de vouloir d�finir cette occurrence comme la derni�re ?',
    actionMove:         '�tes-vous s�r de vouloir d�placer cet �v�nement ?',
    actionInclude:      "�tes-vous s�r de vouloir ajouter une occurrence d'�v�nement ?",
    move:               '�tes-vous s�r de vouloir d�placer cet �v�nement ?',
    toggleAllDay:       '�tes-vous s�r de vouloir changer si cet �v�nement se produit toute la journ�e ?',
    removeExistingTime: "�tes-vous s�r de vouloir supprimer toutes les occurrences d'�v�nements � ce stade ?"
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
    { text: 'Violet fonc�' },
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
    { text: 'Ambr�' },
    { text: 'Orange' },
    { text: 'Orange fonc�' },
    { text: 'Marron' },
    { text: 'Bleu-gris' },
    { text: 'Gris' },
    { text: 'Noir' }
  ],
  icons: [
    { text: 'Alarme' },
    { text: '�toile' },
    { text: 'Coeur' },
    { text: 'Action' },
    { text: 'Affectation' },
    { text: 'Dang�' },
    { text: 'Argent' },
    { text: 'Charge' },
    { text: 'Accueil' },
    { text: 'Play' },
    { text: 'Email' },
    { text: 'T�l�phone' },
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
        { label: 'Ann�e' },
        {�label: 'Planning' },
        { label: '4 jours' }
      ],
      formats: {
        today: 'dddd, MMMM D',
        xs: 'MMM'
      },
      labels: {
        next: (type) => type ? 'Suivant ' + type.label.toLowerCase() : 'Suivant',
        prev: (type) => type ? 'Pr�c�dent ' + type.label.toLowerCase() : 'Pr�c�dent',
        moveCancel: 'Annuler le d�placement',
        moveSingleEvent: "D�placer l'�v�nement",
        moveOccurrence: "D�placer uniquement cette occurrence d'�v�nement",
        moveAll: "D�placer toutes les occurrences d'�v�nements",
        moveDuplicate: "Ajouter une occurrence d'�v�nement",
        promptConfirm: 'Oui',
        promptCancel: 'Non',
        today: "AUJOURD'HUI"
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
        allDay:   'Toute la journ�e',
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
        busy:     'Occup�',
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
        allDay:   'Toute la journ�e',
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
        busy:     'Occup�',
        free:     'Libre'
      }
    },
    dsCalendarEventCreatePopover: {
      formats: {
        start:    'dddd, MMMM D',
        time:     'h:mm a'
      },
      labels: {
        title:    'Ajouter un titre',
        allDay:   'Toute la journ�e',
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
        busy:     'Occup�',
        free:     'Libre',
        location: 'Ajouter un emplacement',
        description: 'Ajouter une description',
        calendar: 'Calendrier',
      },
      busyOptions: [
        {text: 'Occup�'},
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
        cancel:       "Annuler les changements d'�v�nement",
        save:         'Sauvegarder',
        title:        'Titre',
        exclusions:   "Ce sont des �v�nements ou des p�riodes de temps dans lesquels un �v�nement normal a �t� exclu de la planification. Les �v�nements sont exclus ici si une occurrence d'�v�nement est d�plac�e.",
        inclusions:   "Ce sont des �v�nements ou des p�riodes de temps qui ont �t� ajout�s en dehors du calendrier. Les �v�nements sont ajout�s ici si une occurrence d'�v�nement est d�plac�e.",
        cancelled:    'Ce sont des �v�nements ou des p�riodes de temps qui ont �t� annul�s.',
        edit:         "Modifier l'�v�nement",
        add:          'Ajouter un �v�nement',
        location:     'Ajouter un emplacement',
        description:  'Ajouter une description',
        calendar:     'Calendrier',
        tabs: {
          details:    "D�tails de l'�v�nement",
          forecast:   'Pr�voir',
          removed:    'Enlev�',
          added:      'Ajout�e',
          cancelled:  'Annul�'
        }
      },
      busyOptions: [
        {text: 'Occup�'},
        {text: 'Libre'}
      ]
    },
    dsScheduleActions: {
      labels: {
        remove:     'Supprimer cet �v�nement',
        exclude:    'Supprimer cette occurrence',
        cancel:     'Annuler cette occurrence',
        uncancel:   "Annuler l'annulation",
        move:       'D�placer cette occurrence',
        include:    'Ajouter une nouvelle occurrence',
        setStart:   'D�finir comme premi�re occurrence',
        setEnd:     'D�finir comme derni�re occurrence',
        pickerOk:   'OK',
        pickerCancel:'Annuler'
      }
    },
    dsScheduleForecast: {
      labels: {
        prefix:     'Afficher les pr�isions pr�c�dent et suivant',
        suffix:     "�v�nements se produisent au cours d'une ann�e"
      }
    },
    dsScheduleFrequencyDay: {
      labels: {
        type: 'Jours'
      },
      options: [
        { text: "N'importe quel jour" },
        { text: 'Les jours suivants...' },
        { text: 'Chaque _ jours � partir de _' }
      ],
      types: [
        { text: 'Jour du mois' },
        { text: 'Dernier jour du mois' },
        { text: "Jour de l'ann�e" }
      ]
    },
    dsScheduleFrequencyDayOfWeek: {
      weekdays: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
      labels: {
        type: 'Jours de la semaine'
      },
      options: [
        { text: "n'importe quel jour de la semaine" },
        { text: 'Les jours suivants de la semaine...' },
        { text: 'Chaque _ semaine � partir du _' },
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
        'F�vrier',
        'Mars',
        'Avril',
        'Mai',
        'Juin',
        'Juillet',
        'Ao�t',
        'Septembre',
        'Octobre',
        'Novembre',
        'Decembre'
      ],
      options: [
        { text: "N'importe quel mois" },
        { text: 'Les mois suivants...' },
        { text: 'Chaque _ mois � partir du _' }
      ]
    },

    dsScheduleFrequencyWeek: {
      labels: {
        type: 'Semaines'
      },
      options: [
        { text: 'Toutes les semaines' },
        { text: 'Les semaines suivantes...' },
        { text: 'chaque _ semaines � partir du _' }
      ],
      types: [
        { text: 'Semaine du mois (la premi�re semaine � avoir un jeudi)' },
        { text: 'Semaine du mois (commence le premier jour du mois)' },
        { text: "Semaine compl�te du mois (0�me = la semaine d'avant s'il y en a une)" },
        { text: 'Derni�re semaine du mois (commence le dernier jour du mois)' },
        { text: "Derni�re semaine compl�te du mois (0�me = la semaine d'apr�s s'il y en a une)" },
        { text: "Semaine de l'ann�e (la premi�re semaine � avoir un jeudi)" },
        { text: "Semaine de l'ann�e (commence le premier jour de l'ann�e)" },
        { text: "Semaine compl�te de l'ann�e (0�me = la semaine d'avant s'il y en a une)" },
        { text: "Derni�re semaine de l'ann�e (commence le dernier jour de l'ann�e)" },
        { text: "Derni�re semaine compl�te de l'ann�e (0�me = la semaine d'apr�s s'il y en a une)" }
      ]
    },

    dsScheduleFrequencyYear: {
      labels: {
        type: 'Ann�es'
      },
      options: [
        { text: 'Toutes les ann�es' },
        { text: 'Les ann�es suivantes...' },
        { text: 'chaque _ ann�es � partir de _' }
      ]
    },

    dsScheduleSpan: {
      labels: {
        startless:  'D�buts des temps',
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
        all:        'Toute la journ�e',
        minute:     'minute',
        minutes:    'minutes',
        hour:       'heure',
        hours:      'heures',
        day:        'jour',
        days:       'jours',
        week:       'semaine',
        weeks:      'semaines',
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
        prevMonth: 'Mois pr�c�dent',
        nextMonth: 'Mois suivant'
      }
    }
  }
}