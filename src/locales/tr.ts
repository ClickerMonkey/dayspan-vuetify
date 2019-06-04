export default {
  promptLabels: {
    actionRemove: "Bu etkinliği silmek istediğinize emin misiniz?",
    actionExclude: "Are you sure you want to remove this event occurrence?",
    actionCancel: "Bu etkinliği iptal etmek istediğinize emin misiniz?",
    actionUncancel: "Bu etkinliği iptal etmek istediğinize emin misiniz?",
    actionSetStart: "Bu olayı ilk olarak tanımlamak istediğinize emin misiniz?",
    actionSetEnd: "Bu olayı son olarak tanımlamak istediğinize emin misiniz?",
    actionMove: "Bu etkinliği taşımak istediğinize emin misiniz?",
    actionInclude: "Bu etkinliği tekrarlamak istediğinize emin misiniz?",
    move: "Bu etkinliği taşımak istediğinize emin misiniz?",
    toggleAllDay: "Bu etkinliği tüm güne çevirmek istediğinize emin misiniz?",
    removeExistingTime:
      "Bu aralıkta tanımlanan tüm etkinlikleri silmek istediğinize emin misiniz?"
  },
  placeholder: {
    noTitle: "(başlık eklenmemiş)"
  },
  patterns: {
    lastDay: day => "Ayın son günü",
    lastDayOfMonth: day => "Ayın son günü " + day.format("MMMM"),
    lastWeekday: day =>
      "Son " + day.format("dddd") + " in " + day.format("MMMM")
  },
  colors: [
    { text: "Red" },
    { text: "Pink" },
    { text: "Purple" },
    { text: "Deep Purple" },
    { text: "Indigo" },
    { text: "Blue" },
    { text: "Glue" },
    { text: "Light Blue" },
    { text: "Cyan" },
    { text: "Teal" },
    { text: "Green" },
    { text: "Light Green" },
    { text: "Lime" },
    { text: "Yellow" },
    { text: "Amber" },
    { text: "Orange" },
    { text: "Deep Orange" },
    { text: "Brown" },
    { text: "Blue Gray" },
    { text: "Gray" },
    { text: "Black" }
  ],
  icons: [
    { text: "Alarm" },
    { text: "Star" },
    { text: "Love" },
    { text: "Action" },
    { text: "Assignment" },
    { text: "Warning" },
    { text: "Money" },
    { text: "Charge" },
    { text: "Home" },
    { text: "Play" },
    { text: "Email" },
    { text: "Phone" },
    { text: "Chart" },
    { text: "Biking" },
    { text: "Travel" }
  ],
  defaults: {
    dsDay: {
      formats: {
        month: "MMM"
      }
    },
    dsCalendarApp: {
      types: [
        { label: "Gün" },
        { label: "Hafta" },
        { label: "Ay" },
        { label: "Yıl" },
        { label: "Plan" },
        { label: "4 Gün" }
      ],
      formats: {
        today: "dddd, MMMM D",
        xs: "MMM"
      },
      labels: {
        next: type => (type ? "Next " + type.label.toLowerCase() : "Next"),
        prev: type => (type ? "Önceki " + type.label.toLowerCase() : "Önceki"),
        moveCancel: "Taşıma iptal",
        moveSingleEvent: "Etkinliği Taşı",
        moveOccurrence: "Sadece bu tekrarı taşı",
        moveAll: "Tekrarlayan tüm etkinlikleri taşı",
        moveDuplicate: "Tekrarlayan etkinlik ekle",
        promptConfirm: "Evet",
        promptCancel: "Hayır",
        today: "BUGÜN"
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
        allDay: "Tüm gün",
        options: "Ayarlar",
        close: "Kapat",
        day: ["gün", "gün"],
        days: ["gün", "gün"],
        minute: ["dakika", "dakika"],
        minutes: ["dakika", "dakika"],
        hour: ["saat", "saat"],
        hours: ["saat", "saat"],
        week: ["hafta", "hafta"],
        weeks: ["hafta", "hafta"],
        second: ["saniye", "saniye"],
        seconds: ["saniye", "saniye"],
        busy: "Meşgul",
        free: "Uygun"
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
        allDay: "Tüm gün",
        options: "Ayarlar",
        close: "Kapat",
        day: ["gün", "gün"],
        days: ["gün", "gün"],
        minute: ["dakika", "dakika"],
        minutes: ["dakika", "dakika"],
        hour: ["saat", "saat"],
        hours: ["saat", "saat"],
        week: ["hafta", "hafta"],
        weeks: ["hafta", "hafta"],
        second: ["saniye", "saniye"],
        seconds: ["saniye", "saniye"],
        busy: "Meşgul",
        free: "Uygun"
      }
    },
    dsCalendarEventCreatePopover: {
      formats: {
        start: "dddd, MMMM D",
        time: "h:mm a"
      },
      labels: {
        allDay: "Tüm gün",
        options: "Ayarlar",
        close: "Kapat",
        day: ["gün", "gün"],
        days: ["gün", "gün"],
        minute: ["dakika", "dakika"],
        minutes: ["dakika", "dakika"],
        hour: ["saat", "saat"],
        hours: ["saat", "saat"],
        week: ["hafta", "hafta"],
        weeks: ["hafta", "hafta"],
        second: ["saniye", "saniye"],
        seconds: ["saniye", "saniye"],
        busy: "Meşgul",
        free: "Uygun",
        location: "Konum Ekle",
        description: "Açıklama Ekle",
        calendar: "Takvim"
      },
      busyOptions: [{ text: "Meşgul" }, { text: "Uygun" }]
    },
    dsSchedule: {
      labels: {
        editCustom: "Düzenle"
      }
    },
    dsEvent: {
      labels: {
        moreActions: "Daha fazla...",
        cancel: "Etkinlik değişiklikleri iptal",
        save: "Kaydet",
        title: "Başlık",
        exclusions:
          "These are events or spans of time where a normally occurring event was excluded from the schedule. Events are excluded here if an event occurrence is moved.",
        inclusions:
          "These are events or spans of time where events were added outside the normally occurring schedule. Events are added here if an event occurrence is moved.",
        cancelled:
          "These are events or spans of time where events were cancelled.",
        edit: "Etkinliği Düzenle",
        add: "Etkinlik Ekle",
        location: "Konum Ekle",
        description: "Açıklama Ekle",
        calendar: "Takvim",
        tabs: {
          details: "Etkinlik Detayları",
          forecast: "Tahmin",
          removed: "Silinen",
          added: "Eklenen",
          cancelled: "İptaller"
        }
      },
      busyOptions: [{ text: "Meşgul" }, { text: "Ücretsiz" }]
    },
    dsScheduleActions: {
      labels: {
        remove: "Bu etkinliği sil",
        exclude: "Bu olayı kaldır",
        cancel: "Bu olayı iptal et",
        uncancel: "İptal etmekten vazgeç",
        move: "Bu olayı taşı",
        include: "Yeni olay ekle",
        setStart: "Ilk olay olarak ekle",
        setEnd: "Son olay olarak ekle",
        pickerOk: "TAMAM",
        pickerCancel: "İptal"
      }
    },
    dsScheduleForecast: {
      labels: {
        prefix: "The forecast shows previous & next",
        suffix: "event occurrences within a years time."
      }
    },
    dsScheduleFrequencyDay: {
      labels: {
        type: "Günler"
      },
      options: [
        { text: "Any day" },
        { text: "On the following days..." },
        { text: "Every _ days starting on _" }
      ],
      types: [
        { text: "Day of the month" },
        { text: "Last day of the month" },
        { text: "Day of the year" }
      ]
    },
    dsScheduleFrequencyDayOfWeek: {
      weekdays: [
        "Pazar",
        "Pazartesi",
        "Salı",
        "Çarşamba",
        "Perşembe",
        "Cuma",
        "Cumartesi"
      ],
      labels: {
        type: "Haftanın günleri"
      },
      options: [
        { text: "Haftanın herhangi bir günü" },
        { text: "Haftanın takip eden günleri.." },
        { text: "Every _ weekday starting on _" },
        { text: "Haftaiçi" },
        { text: "Haftasonu" }
      ]
    },
    dsScheduleFrequencyMonth: {
      labels: {
        type: "Aylar"
      },
      months: [
        "Ocak",
        "Şubat",
        "Mart",
        "Nisan",
        "Mayıs",
        "Haziran",
        "Temmuz",
        "Ağustos",
        "Eylül",
        "Ekim",
        "Kasım",
        "Aralık"
      ],
      options: [
        { text: "Herhangi ay" },
        { text: "Ayın herhangi bir günü" },
        { text: "Every _ months starting on _" }
      ]
    },

    dsScheduleFrequencyWeek: {
      labels: {
        type: "Weeks"
      },
      options: [
        { text: "Any week" },
        { text: "On the following weeks..." },
        { text: "Every _ weeks starting on _" }
      ],
      types: [
        { text: "Week of the month (first week has a Thursday)" },
        { text: "Weekspan of the month (starts on first day of month)" },
        { text: "Full week of the month (0th = the week before if any)" },
        { text: "Last weekspan of the month (starts on last day of month)" },
        { text: "Last full week of the month (0th = the week after if any)" },
        { text: "Week of the year (first week has a Thursday)" },
        { text: "Weekspan of the year (starts on first day of year)" },
        { text: "Full week of the year (0th = the week before if any)" },
        { text: "Last weekspan of the year (starts on last day of year)" },
        { text: "Last full week of the year (0th = the week after if any)" }
      ]
    },

    dsScheduleFrequencyYear: {
      labels: {
        type: "Years"
      },
      options: [
        { text: "Any year" },
        { text: "On the following years..." },
        { text: "Every _ years starting on _" }
      ]
    },

    dsScheduleSpan: {
      labels: {
        startless: "Beginning of Time",
        endless: "End of Time"
      },
      formats: {
        start: "MMMM Do, YYYY",
        end: "MMMM Do, YYYY"
      }
    },

    dsScheduleTime: {
      labels: {
        remove: "Remove time",
        add: "Add time"
      }
    },

    dsScheduleTimes: {
      labels: {
        all: "All day",
        minute: "minute",
        minutes: "minutes",
        hour: "hour",
        hours: "hours",
        day: "day",
        days: "days",
        week: "week",
        weeks: "weeks",
        month: "month",
        months: "months",
        second: "second",
        seconds: "seconds"
      }
    },

    dsScheduleType: {
      formats: {
        date: "LL"
      }
    },

    dsScheduleTypeCustomDialog: {
      labels: {
        save: "Save",
        cancel: "Cancel"
      }
    },

    dsWeekDayHeader: {
      formats: {
        weekday: "ddd"
      }
    },

    dsWeeksView: {
      weekdays: ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cts"]
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
        "Pazar",
        "Pazartesi",
        "Salı",
        "Çarşamba",
        "Perşembe",
        "Cuma",
        "Cumartesi"
      ],
      labels: {
        prevMonth: "Önceki ay",
        nextMonth: "Sonraki ay"
      }
    }
  }
};
