
import * as ds from 'dayspan';
import Vue from 'vue';
import { Day, Constants, Parse, Schedule, DaySpan, CalendarEvent, Pattern, Functions as fn } from 'dayspan';
import { Unit } from 'dayspan/typings/DayFunctions';

import { default as Defaults } from './defaults';
import { default as Colors } from './colors';
import { default as Icons } from './icons';
import { default as Locales, defaultLocale } from './locales'
import { dsMerge, dsMergeLocale } from './functions';
import { VPluginData, VPluginMethods, VPlugin, VLocaleOptions, VSchedule, VCalendarEvent, VDetails, VEvent, VPromptTypes, VColor, VLocaleInput } from './types';


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

  } as Partial<VPluginData>,

  computed:
  {
    fullscreenPopovers(this: VPlugin): boolean
    {
      return this.$vuetify.breakpoint.xs;
    },

    fullscreenDialogs(this: VPlugin): boolean
    {
      return this.$vuetify.breakpoint.xs;
    }
  },

  methods:
  {
    normalizeLocaleName(this: VPlugin, name: string): string
    {
      return name.toLowerCase();
    },

    getLocale(this: VPlugin, name: string): VLocaleInput
    {
      return this.locales[this.normalizeLocaleName(name)];
    },

    setLocale(this: VPlugin, name: string, strict: boolean): void
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

      ds.Locales.set(name);
    },

    addLocale(this: VPlugin, name: string, locale: VLocaleInput): void
    {
      this.locales[this.normalizeLocaleName(name)] = locale;
    },

    addLocales(this: VPlugin, names: string[], locale: VLocaleInput): void
    {
      names.forEach(n => this.addLocale(n, locale));
    },

    updateLocale(this: VPlugin, name: string, update: VLocaleInput, strict: boolean = true): void
    {
      const locale = this.getLocale(name);

      if (!locale)
      {
        throw 'No locale exists with the name ' + name;
      }

      dsMergeLocale(locale, update, '', strict);
    },

    init(this: VPlugin): void
    {
      this.setLocale(this.currentLocale, true);
      this.startRefreshTimes();
    },

    setEventDetails(this: VPlugin, details: VDetails, data: VDetails, event: VEvent, calendarEvent: VCalendarEvent): void
    {
      // TODO use something else
      event.data = (Vue as any).util.extend( data, details );
    },

    copyEventDetails(this: VPlugin, details: VDetails): VDetails
    {
      return dsMerge( {}, details );
    },

    createEventData(this: VPlugin, details: VDetails, schedule: VSchedule): VDetails
    {
      return dsMerge( {}, details );;
    },

    createEvent(this: VPlugin, details: VDetails, schedule: VSchedule, forPlaceholder: boolean): VEvent
    {
      return Parse.event({
        schedule: schedule,
        data: this.createEventData( details, schedule )
      });
    },

    getDefaultEventDetails(this: VPlugin): VDetails
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

    getDefaultEventColor(this: VPlugin): string
    {
      return this.colors[Math.floor(this.colors.length * Math.random())].value;
    },

    isValidEvent(this: VPlugin, details: VDetails, schedule: VSchedule, calendarEvent: VCalendarEvent): boolean
    {
      return !!details.title;
    },

    requiresPermission(this: VPlugin, type: VPromptTypes): boolean
    {
      return !!(this.prompt[ type ] && this.promptLabels[ type ] && this.promptOpen);
    },

    getPermission(this: VPlugin, type: VPromptTypes, granted: (granted: boolean) => any, denied: () => any): void
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

    getPrefix(this: VPlugin, calendarEvent: VCalendarEvent, sameDay: DaySpan[]): string
    {
      return sameDay.length === 1 ? sameDay[0].start.format('ha') : '(' + sameDay.length + ')';
    },

    getScheduleDescription(this: VPlugin, schedule: VSchedule): string
    {
      return schedule.describe('event', false, false, false, false)
    },

    getEventOccurrence(this: VPlugin, schedule: VSchedule, start: Day, labels: { [key: string]: string }, formats: { [key: string]: string }): string
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

          description += ds.Locales.current.list(schedule.times.map(x => x.format(formats.time)));
        }

        description += ' (' + duration + ')';

        return description;
      }

      let described = schedule.describe( 'event', false );

      return described.substring( 20 ) + ' (' + duration + ')';
    },

    getEventAgendaWhen(this: VPlugin, calendarEvent: VCalendarEvent, labels: { [key: string]: string }, formats: { [key: string]: string }): string
    {
      let when = '';
      let schedule = calendarEvent.schedule;

      if (calendarEvent.fullDay)
      {
        when += labels.allDay;
      }
      else
      {
        when += ds.Locales.current.list(schedule.times.map(x => x.format(formats.time)));
      }

      if (schedule.duration !== 1 && this.$vuetify.breakpoint.smAndUp)
      {
        when += ' (' + this.getEventDuration( schedule, labels ) + ')';
      }

      return when;
    },

    getEventDuration(this: VPlugin, schedule: VSchedule, labels: { [P in Unit]?: string }): string
    {
      let units = labels[ schedule.durationUnit ];
      let length = schedule.duration;
      let chosenUnit = length === 1 ? units[ 0 ] : units[ 1 ];
      let duration = length + ' ' + chosenUnit;

      return duration;
    },

    getPlaceholderEventDetails(this: VPlugin): VDetails
    {
      let details = this.getDefaultEventDetails();

      details.title = this.placeholder.noTitle as string;

      return details;
    },

    getPlaceholderEventForAdd(this: VPlugin, time: Day): VCalendarEvent
    {
      let details = this.getPlaceholderEventDetails();
      let schedule = new Schedule({});
      let id = time.timeIdentifier;
      let event = this.createEvent( details, schedule, true );
      let span = DaySpan.point( time );
      let day = time.startOf('day');

      return new CalendarEvent( parseInt(id as string), event, span, day );
    },

    getPlaceholderEventForMove(this: VPlugin, original: VCalendarEvent): VCalendarEvent
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

    getStyleFull(this: VPlugin, details: VDetails, calendarEvent: VCalendarEvent, index: number): object
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

    getStyleTimed(this: VPlugin, details: VDetails, calendarEvent: VCalendarEvent): object
    {
      let past = calendarEvent.time.end.isBefore( this.now );
      let cancelled = calendarEvent.cancelled;
      let bounds = calendarEvent.getTimeBounds( this.dayHeight, 1, this.columnOffset );

      // let color = this.getStyleColor( details, calendarEvent );
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

    getStylePopover(this: VPlugin, details: VDetails, calendarEvent: VCalendarEvent): object
    {
      return undefined as object;
    },

    getStyleNowBorder(this: VPlugin): string
    {
      return 'black solid 3px';
    },

    getStyleNow(this: VPlugin): object
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

    getStyleColor(this: VPlugin, details: VDetails, calendarEvent: VCalendarEvent, past: boolean = false, cancelled: boolean = false): string
    {
      let color = details.color;

      if (past || cancelled) {
        color = this.blend( color, this.inactiveBlendAmount, this.inactiveBlendTarget );
      }

      return color;
    },

    getStylePlaceholderTimed(this: VPlugin, details: VDetails, placeholder: VCalendarEvent, forDay: Day): object
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

    getStylePlaceholderFull(this: VPlugin, details: VDetails, calendarEvent: VCalendarEvent, index: number, forDay: Day): object
    {
      // let color = this.getStyleColor( details, calendarEvent );
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

    parseColor(this: VPlugin, color: VColor | string): VColor
    {
      if (fn.isObject(color)) {
        return color as VColor;
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

    clampComponent(this: VPlugin, c: number): number
    {
      return Math.max( 0, Math.min( 255, Math.floor( c ) ) );
    },

    clampColor(this: VPlugin, color: VColor, out?: VColor): VColor
    {
      let target = out || color;
      target.r = this.clampComponent( color.r );
      target.g = this.clampComponent( color.g );
      target.b = this.clampComponent( color.b );
      return target;
    },

    formatComponent(this: VPlugin, c: number): string
    {
      let x = c.toString( 16 );
      return x.length === 1 ? '0' + x : x;
    },

    formatColor(this: VPlugin, color: VColor): string
    {
      return '#' +
        this.formatComponent( color.r ) +
        this.formatComponent( color.g ) +
        this.formatComponent( color.b );
    },

    blend(this: VPlugin, from: VColor | string, delta: number, to: VColor | string): string
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

    roundTime(this: VPlugin, day: Day, millis: number, up: boolean): Day
    {
      let time = day.time;
      let over = time % millis;
      let relative = -over;

      if (up && relative !== 0) {
        relative += millis;
      }

      return day.relative( relative );
    },

    startRefreshTimes(this: VPlugin): void
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

    stopRefreshTimes(this: VPlugin): void
    {
      clearTimeout( this.timeout );

      this.timeout = null;
    },

    refreshTimes(this: VPlugin, force: boolean = false): void
    {
      let today = Day.today();

      if (!today.sameDay( this.today ) || force)
      {
        this.today = today;
        this.tomorrow = Day.tomorrow();
      }

      this.now = Day.now();
    }
  } as VPluginMethods
};
