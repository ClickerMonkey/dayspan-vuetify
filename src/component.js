
import { Day, Constants, Parse, Schedule, DaySpan, CalendarEvent, Pattern, Patterns, PatternMap, Suffix, Functions as fn, Units } from 'dayspan';
import { default as Defaults } from './defaults';
import { default as Colors } from './colors';
import { default as Icons } from './icons';
import { default as Locales, defaultLocale } from './locales'
import { dsMerge, dsMergeLocale } from './functions';
import Vue from 'vue';

const LOCALE_ENTRY = 0;

DaySpan.prototype.summary = function (type, dayOfWeek, short, repeat, contextual, delimiter) {
  if (dayOfWeek === void 0) { dayOfWeek = true; }
  if (short === void 0) { short = false; }
  if (repeat === void 0) { repeat = false; }
  if (contextual === void 0) { contextual = true; }
  if (delimiter === void 0) { delimiter = ' - '; }
  var formats;
  switch (type) {
    case Units.DAY:
      formats = component.data.formats.day;
    break;
    case Units.WEEK:
      formats = component.data.formats.week;
    break;
    case Units.MONTH:
      formats = component.data.formats.month;
    break;
    case Units.YEAR:
      formats = component.data.formats.year;
    break;
  }
  var today = Day.today();
  var showStartYear = !contextual || !this.start.sameYear(today);
  var showEndYear = !contextual || !this.end.sameYear(today);
  var start = this.start.toMoment().locale(component.data.currentLocale).format(formats(short, dayOfWeek, showStartYear));
  var end = this.end.toMoment().locale(component.data.currentLocale).format(formats(short, dayOfWeek, showEndYear));
  var summary = start;
  if (start !== end) {
      if (!repeat) {
          summary = this.start.toMoment().locale(component.data.currentLocale).format(formats(short, dayOfWeek, !this.start.sameYear(this.end)));
      }
      summary += delimiter;
      summary += end;
  }
  else {
      summary = start;
  }
  return summary;
};

Schedule.prototype.describe = function (thing, includeRange, includeTimes, includeDuration, includeExcludes, includeIncludes, includeCancels) {
  if (thing === void 0) { thing = component.data.event; }
  if (includeRange === void 0) { includeRange = true; }
  if (includeTimes === void 0) { includeTimes = true; }
  if (includeDuration === void 0) { includeDuration = false; }
  if (includeExcludes === void 0) { includeExcludes = false; }
  if (includeIncludes === void 0) { includeIncludes = false; }
  if (includeCancels === void 0) { includeCancels = false; }
  var range = '', rules = '', times = '', duration = '', excludes = '', includes = '', cancels = '';
  if (includeRange) {
      if (this.start) {
          if (this.end) {
              range = component.data.schedule.range
                .replace('{:start}', component.formats.day(this.start.toMoment().locale(component.data.currentLocale)))
                .replace('{:end}', component.formats.day(this.end.toMoment().locale(component.data.currentLocale)));
          } else {
            range = component.data.schedule.rangeNoEnd.replace('{:start}', component.formats.day(this.start.toMoment().locale(component.data.currentLocale)));
          }
      } else if (this.end) {
          range = component.data.schedule.rangeNoStart.replace('{:end}', component.formats.day(this.end.toMoment().locale(component.data.currentLocale)));
      }
      if (range && !range.endsWith(' ')) {
        range += ' ';
      }
  }

  var _in = ' ' + component.data.schedule.ruleIn + ' ';
  rules += Schedule.prototype.describeRule.call(this, this.dayOfWeek.input, component.data.schedule.ruleDayOfWeek, x => component.data.schedule.weekdays[x], 1, false);
  rules += Schedule.prototype.describeRule.call(this, this.lastDayOfMonth.input, component.data.schedule.ruleLastDayOfMonth, x => component.data.suffix(x, true));
  rules += Schedule.prototype.describeRule.call(this, this.dayOfMonth.input, component.data.schedule.ruleDayOfMonth, x => component.data.suffix(x, true));
  rules += Schedule.prototype.describeRule.call(this, this.dayOfYear.input, component.data.schedule.ruleDayOfYear, x => component.data.suffix(x, true), 1);
  rules += Schedule.prototype.describeRule.call(this, this.year.input, component.data.schedule.ruleYear, x => x, 0, false, _in);
  rules += Schedule.prototype.describeRule.call(this, this.month.input, component.data.schedule.ruleMonth, x => component.data.schedule.months[x], 0, false, _in);
  rules += Schedule.prototype.describeRule.call(this, this.weekOfYear.input, component.data.schedule.ruleWeekOfYear, x => component.data.suffix(x, true));
  rules += Schedule.prototype.describeRule.call(this, this.weekspanOfYear.input, component.data.schedule.ruleWeekspanOfYear, x => component.data.suffix(x + 1, true), 1);
  rules += Schedule.prototype.describeRule.call(this, this.fullWeekOfYear.input, component.data.schedule.ruleFullWeekOfYear, x => component.data.suffix(x, true));
  rules += Schedule.prototype.describeRule.call(this, this.lastWeekspanOfYear.input, component.data.schedule.ruleLastWeekspanOfYear, x => component.data.suffix(x + 1, true), 1);
  rules += Schedule.prototype.describeRule.call(this, this.lastFullWeekOfYear.input, component.data.schedule.ruleLastFullWeekOfYear, x => component.data.suffix(x, true));
  rules += Schedule.prototype.describeRule.call(this, this.weekOfMonth.input, component.data.schedule.ruleWeekOfMonth, x => component.data.suffix(x, true));
  rules += Schedule.prototype.describeRule.call(this, this.fullWeekOfMonth.input, component.data.schedule.ruleFullWeekOfMonth, x => component.data.suffix(x, true));
  rules += Schedule.prototype.describeRule.call(this, this.weekspanOfMonth.input, component.data.schedule.ruleWeekspanOfMonth, x => component.data.suffix(x + 1, true), 1);
  rules += Schedule.prototype.describeRule.call(this, this.lastFullWeekOfMonth.input, component.data.schedule.ruleLastFullWeekOfMonth, x => component.data.suffix(x, true));
  rules += Schedule.prototype.describeRule.call(this, this.lastWeekspanOfMonth.input, component.data.schedule.ruleLastWeekspanOfMonth, x => component.data.suffix(x + 1, true), 1);

  if (includeTimes && this.times.length) {
      times = component.data.schedule.times + ' ' + Schedule.prototype.describeArray.call(this, this.times, x => x.toMoment().locale(component.currentLocale).format('LT')) + ' ';
  }
  if (includeDuration && this.duration !== Constants.DURATION_DEFAULT) {
      duration = ' ' + component.data.schedule.duration + ' ' + this.duration + ' ';
      if (this.durationUnit) {
          duration += component.data.defaults.dsScheduleTimes.labels[this.durationUnit] + ' ';
      }
  }
  if (includeExcludes) {
      var theExcludes = this.exclude.spans().list();
      if (theExcludes.length) {
          excludes = component.data.schedule.exclude + ' ' + Schedule.prototype.describeArray.call(this, theExcludes, x => x.span.summary(Units.DAY)) + ' ';
      }
  }
  if (includeIncludes) {
      var theIncludes = this.include.spans().list();
      if (theIncludes.length) {
          includes = component.data.schedule.include + ' ' + Schedule.prototype.describeArray.call(this, theIncludes, x => x.span.summary(Units.DAY)) + ' ';
      }
  }
  if (includeCancels) {
      var theCancels = this.cancel.spans().list();
      if (theCancels.length) {
          cancels = component.data.schedule.cancels + ' ' + Schedule.prototype.describeArray.call(this, theCancels, x => x.span.summary(Units.DAY));
      }
  }
  var out = component.data.schedule.summaryFormat
    .replace('{:range}', range)
    .replace('{:thing}', thing)
    .replace('{:rules}', rules)
    .replace('{:times}', times)
    .replace('{:duration}', duration)
    .replace('{:excludes}', excludes)
    .replace('{:includes}', includes)
    .replace('{:cancels}', cancels)
  ;
  return out.charAt(0).toLocaleUpperCase() + out.substring(1);
};
/**
 * Describes the given frequency.
 *
 * @param value The frequency to describe.
 * @param unit The unit of the frequency.
 * @param map How the values in the frequency should be described.
 * @param everyOffset A value to add to a [[FrequencyValueEvery]] offset to
 *    account for zero-based values that should be shifted for human
 *    friendliness.
 * @param the If the word 'the' should be used to describe the unit.
 * @param on The word which preceeds values of the given unit.
 * @param required If the description should always return a non-empty string
 *    even if the frequency was not specified in the original input.
 * @returns A string description of the frequency.
 */
Schedule.prototype.describeRule = function (value, unit, map, everyOffset, the, on, required) {
    if (everyOffset === void 0) { everyOffset = 0; }
    if (the === void 0) { the = true; }
    if (on === void 0) { on = ' ' + component.data.schedule.ruleOn + ' '; }
    if (required === void 0) { required = false; }
    var out = '';
    var suffix = the ? ' ' + unit : '';
    if (fn.isFrequencyValueEvery(value)) {
        var valueEvery = value;
        out += ' ' + component.data.schedule.ruleEvery + ' ' + component.data.suffix(valueEvery.every, true) + ' ' + unit;
        if (valueEvery.offset) {
            out += ' ' + component.data.schedule.ruleStarts + ' ' + map(valueEvery.offset + everyOffset) + suffix;
        }
    }
    else if (fn.isFrequencyValueOneOf(value)) {
        var valueOne = value;
        if (valueOne.length) {
            out += on + (the ? component.data.schedule.ruleThe + ' ' : '');
            out += Schedule.prototype.describeArray.call(this, valueOne, map);
            out += suffix;
        }
    }
    else if (required) {
        out += on + component.data.schedule.ruleAny + ' ' + unit;
    }
    return out;
};
/**
 * Describes the array by adding commas where appropriate and 'and' before the
 * last value of the array (if its more than `1`).
 *
 * @param array The array of items to describe.
 * @param map The function which converts an item to a string.
 * @returns The final description of the array items.
 */
Schedule.prototype.describeArray = function (array, map) {
    var out = '';
    var last = array.length - 1;
    out += map(array[0]);
    for (var i = 1; i < last; i++) {
        out += ', ' + map(array[i]);
    }
    if (last > 0) {
        out += ' ' + component.data.schedule.ruleAnd + ' ' + map(array[last]);
    }
    return out;
};

let component = {

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

    event: LOCALE_ENTRY,

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
      lastWeekday:        LOCALE_ENTRY,
      none:               LOCALE_ENTRY,
      daily:              LOCALE_ENTRY,
      weekly:             LOCALE_ENTRY,
      monthlyWeek:        LOCALE_ENTRY,
      annually:           LOCALE_ENTRY,
      annuallyMonthWeek:  LOCALE_ENTRY,
      weekday:            LOCALE_ENTRY,
      monthly:            LOCALE_ENTRY,
      custom:             LOCALE_ENTRY
      },

    schedule: {
      cancels: LOCALE_ENTRY,
      duration: LOCALE_ENTRY,
      exclude: LOCALE_ENTRY,
      including: LOCALE_ENTRY,
      months: [LOCALE_ENTRY, LOCALE_ENTRY, LOCALE_ENTRY, LOCALE_ENTRY, LOCALE_ENTRY, LOCALE_ENTRY, LOCALE_ENTRY, LOCALE_ENTRY, LOCALE_ENTRY, LOCALE_ENTRY, LOCALE_ENTRY, LOCALE_ENTRY],
      range: LOCALE_ENTRY,
      rangeNoEnd: LOCALE_ENTRY,
      rangeNoStart: LOCALE_ENTRY,
      ruleDayOfWeek: LOCALE_ENTRY,
      ruleLastDayOfMonth: LOCALE_ENTRY,
      ruleDayOfMonth: LOCALE_ENTRY,
      ruleDayOfYear: LOCALE_ENTRY,
      ruleYear: LOCALE_ENTRY,
      ruleMonth: LOCALE_ENTRY,
      ruleWeekOfYear: LOCALE_ENTRY,
      ruleWeekspanOfYear: LOCALE_ENTRY,
      ruleFullWeekOfYear: LOCALE_ENTRY,
      ruleLastWeekspanOfYear: LOCALE_ENTRY,
      ruleLastFullWeekOfYear: LOCALE_ENTRY,
      ruleWeekOfMonth: LOCALE_ENTRY,
      ruleFullWeekOfMonth: LOCALE_ENTRY,
      ruleWeekspanOfMonth: LOCALE_ENTRY,
      ruleLastFullWeekOfMonth: LOCALE_ENTRY,
      ruleLastWeekspanOfMonth: LOCALE_ENTRY,
      ruleAnd: LOCALE_ENTRY,
      ruleAny: LOCALE_ENTRY,
      ruleEvery: LOCALE_ENTRY,
      ruleIn: LOCALE_ENTRY,
      ruleOn: LOCALE_ENTRY,
      ruleStarts: LOCALE_ENTRY,
      ruleThe: LOCALE_ENTRY,
      summaryFormat: LOCALE_ENTRY,
      times: LOCALE_ENTRY,
      weekdays: [LOCALE_ENTRY, LOCALE_ENTRY, LOCALE_ENTRY, LOCALE_ENTRY, LOCALE_ENTRY, LOCALE_ENTRY, LOCALE_ENTRY]
    },
    
    formats: {
      day: (short, dayOfWeek, year) => (dayOfWeek ? (short ? 'ddd, ' : 'dddd, ') : '') + (short ? 'MMM ' : 'MMMM ') + 'Do' + (year ? ' YYYY' : ''),
      week: (short, dayOfWeek, year) => (dayOfWeek ? (short ? 'ddd, ' : 'dddd, ') : '') + (short ? 'MMM ' : 'MMMM ') + 'Do' + (year ? ' YYYY' : ''),
      month: (short, dayOfWeek, year) => (short ? 'MMM' : 'MMMM') + (year ? ' YYYY' : ''),
      year: (short, dayOfWeek, year) => (year ? 'YYYY' : '')
    },

    suffix: {
      get: Suffix.get
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
    setLocale(name, strict)
    {
      const locale = this.locales[name];

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
      this.locales[name] = locale;
    },

    updateLocale(name, update, strict = true)
    {
      const locale = this.locales[name];

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
      PatternMap.none.describe = (day) => this.patterns.none(day);
      PatternMap.daily.describe = (day) => this.patterns.daily(day);
      PatternMap.weekly.describe = (day) => this.patterns.weekly(day);
      PatternMap.monthlyWeek.describe = (day) => this.patterns.monthlyWeek(day);
      PatternMap.annually.describe = (day) => this.patterns.annually(day);
      PatternMap.annuallyMonthWeek.describe = (day) => this.patterns.annuallyMonthWeek(day);
      PatternMap.weekday.describe = (day) => this.patterns.weekday(day);
      PatternMap.monthly.describe = (day) => this.patterns.monthly(day);
      PatternMap.custom.describe = (day) => this.patterns.custom(day);

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
      return Schedule.prototype.describe.call(schedule, component.data.event, false, false, false, false)
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

export default component;