
import { Day, Constants, Parse, Schedule, DaySpan, CalendarEvent, Pattern, Patterns, PatternMap, Functions as fn } from 'dayspan';
import { default as Defaults } from './defaults';
import { default as Colors } from './colors';
import { default as Icons } from './icons';
import { default as Locales, defaultLocale } from './locales'
import { dsMerge, dsMergeLocale } from './functions';
import Vue from 'vue';

const LOCALE_ENTRY = 0;

export default {

  data:
  {
    version:          '0.3.0',

    readOnly:         false,

    today:            Day.today(),
    tomorrow:         Day.tomorrow(),
    now:              Day.now(),
    timeout:          null,
    refreshInterval:  Constants.MILLIS_IN_MINUTE,

    dayPadding:       5,
    dayHeight:        960,
    columnOffset:     10,
    eventHeight:      21,
    hourHeight:       40,

    inactiveBlendTarget: { r: 255, g: 255, b: 255 },
    inactiveBlendAmount: 0.5,

    placeholderBlendAmount: 0.2,
    placeholderBlendTarget: { r: 255, g: 255, b: 255 },

    rounding: {
      move:           1,
      add:            Constants.MILLIS_IN_MINUTE * 15,
      drag:           Constants.MILLIS_IN_MINUTE * 15
    },

    supports: {
      title:          true,
      description:    true,
      color:          true,
      location:       true,
      calendar:       true,
      busy:           true,
      icon:           true,
      guests:         false
    },

    features: {
      exclude:        true,
      include:        true,
      cancel:         true,
      move:           true,
      moveDuplicate:  true,
      moveInstance:   true,
      moveAll:        true,
      drag:           true,
      forecast:       true,
      addDay:         true,
      addTime:        true,
      hideOnMove:     true
    },

    prompt: {
      actionRemove:       true,
      actionExclude:      true,
      actionCancel:       true,
      actionUncancel:     true,
      actionMove:         true,
      actionInclude:      true,
      actionSetStart:     true,
      actionSetEnd:       true,
      move:               true,
      toggleAllDay:       true,
      removeExistingTime: true
    },

    promptOpen: null,

    promptLabels: {
      actionRemove:       LOCALE_ENTRY,
      actionExclude:      LOCALE_ENTRY,
      actionCancel:       LOCALE_ENTRY,
      actionUncancel:     LOCALE_ENTRY,
      actionSetStart:     LOCALE_ENTRY,
      actionSetEnd:       LOCALE_ENTRY,
      actionMove:         LOCALE_ENTRY,
      actionInclude:      LOCALE_ENTRY,
      move:               LOCALE_ENTRY,
      toggleAllDay:       LOCALE_ENTRY,
      removeExistingTime: LOCALE_ENTRY
    },

    placeholder: {
      noTitle:            LOCALE_ENTRY
    },

    patterns: {
      lastDay:            LOCALE_ENTRY,
      lastDayOfMonth:     LOCALE_ENTRY,
      lastWeekday:        LOCALE_ENTRY
    },

    colors: Colors,

    icons: Icons,

    defaults: Defaults,

    locales: Locales,

    currentLocale: defaultLocale
  },

  computed:
  {
    fullscreenPopovers()
    {
      return this.$vuetify.breakpoint.xs;
    },

    fullscreenDialogs()
    {
      return this.$vuetify.breakpoint.xs;
    }
  },

  methods:
  {
    normalizeLocaleName(name)
    {
      return name.toLowerCase();
    },

    getLocale(name)
    {
      return this.locales[this.normalizeLocaleName(name)];
    },

    setLocale(name, strict)
    {
      const locale = this.getLocale(name);

      if (!locale && strict)
      {
        throw 'No locale exists with the name ' + name;
      }
      else if (locale)
      {
        dsMergeLocale(this, locale, name);

        this.currentLocale = name;
      }
    },

    addLocale(name, locale)
    {
      this.locales[this.normalizeLocaleName(name)] = locale;
    },

    addLocales(names, locale)
    {
      names.forEach(n => this.addLocale(n, locale));
    },

    updateLocale(name, update, strict = true)
    {
      const locale = this.getLocale(name);

      if (!locale)
      {
        throw 'No locale exists with the name ' + name;
      }

      dsMergeLocale(locale, update, '', strict);
    },

    init()
    {
      this.setLocale(this.currentLocale, true);
      this.startRefreshTimes();
      this.addPatterns();
    },

    setEventDetails(details, data, event, calendarEvent)
    {
      event.data = Vue.util.extend( data, details );
    },

    copyEventDetails(details)
    {
      return dsMerge( {}, details );
    },

    createEventData(details, schedule)
    {
      return dsMerge( {}, details );;
    },

    createEvent(details, schedule, forPlaceholder)
    {
      return Parse.event({
        schedule: schedule,
        data: this.createEventData( details, schedule )
      });
    },

    addPatterns()
    {
      Patterns.unshift(PatternMap.lastDay = new Pattern(
        'lastDay', false,
        (day) => this.patterns.lastDay(day),
        {
          lastDayOfMonth: [1]
        }
      ));

      Patterns.unshift(PatternMap.lastDayOfMonth = new Pattern(
        'lastDayOfMonth', false,
        (day) => this.patterns.lastDayOfMonth(day),
        {
          month: 1,
          lastDayOfMonth: [1]
        }
      ));

      Patterns.unshift(PatternMap.lastWeekday = new Pattern(
        'lastWeekday', false,
        (day) => this.patterns.lastWeekday(day),
        {
          lastWeekspanOfMonth: [0],
          dayOfWeek: 1,
          month: 1
        }
      ));
    },

    getDefaultEventDetails()
    {
      return {
        title: '',
        description: '',
        location: '',
        color: this.getDefaultEventColor(),
        forecolor: '#ffffff',
        calendar: '',
        busy: true,
        icon: ''
      };
    },

    getDefaultEventColor()
    {
      return this.colors[Math.floor(this.colors.length * Math.random())].value;
    },

    isValidEvent(details, schedule, calendarEvent)
    {
      return !!details.title;
    },

    requiresPermission(type)
    {
      return !!(this.prompt[ type ] && this.promptLabels[ type ] && this.promptOpen);
    },

    getPermission(type, granted, denied)
    {
      let prompt = this.prompt[ type ];
      let promptLabel = this.promptLabels[ type ];

      if (prompt && promptLabel && this.promptOpen)
      {
        this.promptOpen( promptLabel, (yes) => {
          if (yes) {
            granted(true);
          } else if (denied) {
            denied();
          }
        });
      }
      else
      {
        granted(false);
      }
    },

    getPrefix(calendarEvent, sameDay)
    {
      return sameDay.length === 1 ? sameDay[0].start.format('ha') : '(' + sameDay.length + ')';
    },

    getScheduleDescription(schedule)
    {
      return schedule.describe('event', false, false, false, false)
    },

    getEventOccurrence(schedule, start, labels, formats)
    {
      let duration = this.getEventDuration(schedule, labels);

      if (schedule.isSingleEvent())
      {
        if (schedule.isFullDay())
        {
          return duration;
        }
        else
        {
          return start.asTime().format( formats.time );
        }
      }

      let pattern = Pattern.findMatch( schedule, false );

      if (pattern && pattern.name !== 'custom')
      {
        let description = '';

        if (pattern.name !== 'none')
        {
          description = pattern.describe( start );
        }

        if (!schedule.isFullDay())
        {
          if (description)
          {
            description += ' at ';
          }

          description += schedule.describeArray( schedule.times, x => x.format( formats.time ) );
        }

        description += ' (' + duration + ')';

        return description;
      }

      let described = schedule.describe( 'event', false );

      return described.substring( 20 ) + ' (' + duration + ')';
    },

    getEventAgendaWhen(calendarEvent, labels, formats)
    {
      let when = '';
      let schedule = calendarEvent.schedule;

      if (calendarEvent.fullDay)
      {
        when += labels.allDay;
      }
      else
      {
        when += schedule.describeArray( schedule.times, x => x.format( formats.time ) );
      }

      if (schedule.duration !== 1 && this.$vuetify.breakpoint.smAndUp)
      {
        when += ' (' + this.getEventDuration( schedule, labels ) + ')';
      }

      return when;
    },

    getEventDuration(schedule, labels)
    {
      let units = labels[ schedule.durationUnit ];
      let length = schedule.duration;
      let chosenUnit = length === 1 ? units[ 0 ] : units[ 1 ];
      let duration = length + ' ' + chosenUnit;

      return duration;
    },

    getPlaceholderEventDetails()
    {
      let details = this.getDefaultEventDetails();

      details.title = this.placeholder.noTitle;

      return details;
    },

    getPlaceholderEventForAdd(time)
    {
      let details = this.getPlaceholderEventDetails();
      let schedule = new Schedule({});
      let id = time.timeIdentifier;
      let event = this.createEvent( details, schedule, true );
      let span = DaySpan.point( time );
      let day = time.start();

      return new CalendarEvent( id, event, span, day );
    },

    getPlaceholderEventForMove(original)
    {
      let placeholder = new CalendarEvent(
        original.id,
        original.event,
        original.time,
        original.day
      );

      placeholder.time = new DaySpan( original.start, original.end );
      placeholder.col = 0;
      placeholder.row = 0;

      return placeholder;
    },

    getStyleFull(details, calendarEvent, index)
    {
      let past = calendarEvent.time.start.isBefore( this.today );
      let cancelled = calendarEvent.cancelled;

      let color = this.getStyleColor( details, calendarEvent );
      let stateColor = this.getStyleColor( details, calendarEvent, past, cancelled );

      return {
        top: ((calendarEvent.row - (index || 0)) * this.eventHeight) + 'px',
        backgroundColor: stateColor,
        color: details.forecolor,
        left: calendarEvent.starting ? '0px' : '-5px',
        right: calendarEvent.ending ? '0px' : '-6px',
        textDecoration: cancelled ? 'line-through' : 'inherit',
        textDecorationColor: cancelled ? color : 'inherit'
      };
    },

    getStyleTimed(details, calendarEvent)
    {
      let past = calendarEvent.time.end.isBefore( this.now );
      let cancelled = calendarEvent.cancelled;
      let bounds = calendarEvent.getTimeBounds( this.dayHeight, 1, this.columnOffset );

      let color = this.getStyleColor( details, calendarEvent );
      let stateColor = this.getStyleColor( details, calendarEvent, past, cancelled );

      return {
        top: bounds.top + 'px',
        height: bounds.height + 'px',
        left: bounds.left + '%',
        width: (100 - bounds.left) + '%',
        backgroundColor: stateColor,
        marginLeft: calendarEvent.starting ? 0 : '-5px',
        marginRight: calendarEvent.ending ? 0 : '-5px',
        textDecoration: cancelled ? 'line-through' : 'inherit',
        textDecorationColor: cancelled ? stateColor : 'inherit'
      };
    },

    getStylePopover(details, calendarEvent)
    {

    },

    getStyleNowBorder()
    {
      return 'black solid 3px';
    },

    getStyleNow()
    {
      let now = this.now.asTime().toMilliseconds();
      let delta = now / Constants.MILLIS_IN_DAY;
      let top = delta * this.dayHeight;

      return {
        position: 'absolute',
        left: '0px',
        right: '-1px',
        top: (top - 1) + 'px',
        borderTop: this.getStyleNowBorder()
      };
    },

    getStyleColor(details, calendarEvent, past, cancelled)
    {
      let color = details.color;

      if (past || cancelled) {
        color = this.blend( color, this.inactiveBlendAmount, this.inactiveBlendTarget );
      }

      return color;
    },

    getStylePlaceholderTimed(details, placeholder, forDay)
    {
      let bounds = placeholder.time.getBounds( forDay, this.dayHeight );
      let stateColor = this.getStyleColor( details, placeholder );

      return {
        top: bounds.top + 'px',
        height: bounds.height + 'px',
        left: '0px',
        right: '0px',
        marginRight: '-1px',
        backgroundColor: this.blend( stateColor, this.placeholderBlendAmount, this.placeholderBlendTarget )
      };
    },

    getStylePlaceholderFull(details, calendarEvent, index, forDay)
    {
      let color = this.getStyleColor( details, calendarEvent );
      let stateColor = this.getStyleColor( details, calendarEvent );
      let starting = calendarEvent.time.start.sameDay( forDay );
      let ending = calendarEvent.time.end.sameDay( forDay );

      return {
        top: ((calendarEvent.row - (index || 0)) * this.eventHeight) + 'px',
        color: details.forecolor,
        left: starting ? '0px' : '-5px',
        right: ending ? '0px' : '-6px',
        backgroundColor: this.blend( stateColor, this.placeholderBlendAmount, this.placeholderBlendTarget )
      };
    },

    parseColor(color)
    {
      if (fn.isObject(color)) {
        return color;
      }

      let match = /#(\w\w)(\w\w)(\w\w)/.exec(color);

      if (!match) {
        throw 'Colors must be in the format of #rrggbb';
      }

      return {
        r: parseInt( match[1], 16 ),
        g: parseInt( match[2], 16 ),
        b: parseInt( match[3], 16 )
      };
    },

    clampComponent(c)
    {
      return Math.max( 0, Math.min( 255, Math.floor( c ) ) );
    },

    clampColor(color, out)
    {
      let target = out || color;
      target.r = this.clampComponent( color.r );
      target.g = this.clampComponent( color.g );
      target.b = this.clampComponent( color.b );
      return target;
    },

    formatComponent(c)
    {
      let x = c.toString( 16 );
      return x.length === 1 ? '0' + x : x;
    },

    formatColor(color)
    {
      return '#' +
        this.formatComponent( color.r ) +
        this.formatComponent( color.g ) +
        this.formatComponent( color.b );
    },

    blend(from, delta, to)
    {
      let parsedFrom = this.parseColor( from );
      let parsedTo = this.parseColor( to );

      let blended = {
        r: parsedTo.r + (parsedFrom.r - parsedTo.r) * delta,
        g: parsedTo.g + (parsedFrom.g - parsedTo.g) * delta,
        b: parsedTo.b + (parsedFrom.b - parsedTo.b) * delta
      };

      this.clampColor( blended );

      return this.formatColor( blended );
    },

    roundTime(day, millis, up)
    {
      let time = day.time;
      let over = time % millis;
      let relative = -over;

      if (up && relative !== 0) {
        relative += millis;
      }

      return day.relative( relative );
    },

    startRefreshTimes()
    {
      let $dayspan = this;

      this.timeout = setTimeout(
        function()
        {
          $dayspan.refreshTimes();
          $dayspan.startRefreshTimes();
        },
        this.refreshInterval
      );
    },

    stopRefreshTimes()
    {
      clearTimeout( this.timeout );

      this.timeout = null;
    },

    refreshTimes(force = false)
    {
      let today = Day.today();

      if (!today.sameDay( this.today ) || force)
      {
        this.today = today;
        this.tomorrow = Day.tomorrow();
      }

      this.now = Day.now();
    }
  }
};
