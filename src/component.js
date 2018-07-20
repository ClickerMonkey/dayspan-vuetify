
import { Day, Constants, Parse, Schedule, DaySpan, CalendarEvent, Pattern, Functions as fn } from 'dayspan';
import { default as Defaults } from './defaults';
import { default as Colors } from './colors';
import { dsMerge } from './functions';
import Vue from 'vue';

export default {

  data:
  {
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
      guests:         false
    },

    features: {
      exclude:        true,
      include:        true,
      cancel:         true,
      move:           true,
      drag:           true,
      forecast:       true,
      addDay:         true,
      addTime:        true,
      addSelection:   true
    },

    prompt: {

    },

    colors: Colors,

    defaults: Defaults
  },

  methods:
  {

    /**
     * details = {
     *  title: 'title of event to display',
     *  description: 'the description of the event',
     *  color: '#ff5566', // the color for the event on the calendar and the popover header
     *  background: 'location of image to use in popover header',
     *  location: 'location of event',
     *  notify: 'description of when the user will be notified',
     *  calendar: 'the name of the person or calendar which this event is in. used in the popover.',
     *  guests: [] // user data array
     *  guestsCanEdit: true,
     *  guestsCanInvite: true,
     *  guestsCanSeeGuests: true,
     *  canEdit: true
     * }
     * userData = {
     *  id: 'anything to identify the person',
     *  calendar: 'the name of the persons calendar - matches details.calendar'
     *  name: 'display name of user',
     *  email: 'the email of the user',
     *  image: 'image of user'
     *  letter: 'letter of user (used when image does not exist)'
     *  icon: 'icon of user (used when letter does not exist)'
     * }
     *
     *
     * highlight current hour
     *
     * TODO
     * conferencing?                        (type, info)
     * notifications?                       (type, time, unit)
     * busy/free availabilty?
     * default/public/private visibility?
     * list of calendars this user can manage events for?
     * find a time based on guests?
     * rsvp? yes/no/maybe - add to details.guests?
     *
     * calendar app:
     *  add friends calendar
     *  list of calendars being viewed
     *  other (public) calendars
     *  search events?
     *
     *
     * more actions:
     *    add new occurrence => duplicate?
     *    copy to "other calendar"
     *    print event
     *    change owner
     */
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

    getDefaultEventDetails()
    {
      return {
        title: '',
        description: '',
        location: '',
        color: this.getDefaultEventColor(),
        forecolor: '#ffffff',
        calendar: '',
        busy: true
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

      let pattern = Pattern.findMatch( schedule );

      if (pattern && pattern.name !== 'custom')
      {
        let description = pattern.describe( start );

        if (!schedule.isFullDay())
        {
          description += ' at ' + schedule.describeArray( schedule.times, x => x.format( formats.time ) );
        }

        description += ' (' + duration + ')';

        return description;
      }

      let described = schedule.describe('event', false);

      return described.substring( 20 ) + ' (' + duration + ')';
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

      details.title = '(no title)';

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
        backgroundColor: this.blend( stateColor, this.inactiveBlendAmount, this.inactiveBlendTarget )
      };
    },

    getStylePlaceholderFull(details, calendarEvent, index, forDay)
    {
      let color = this.getStyleColor( details, calendarEvent );
      let stateColor = this.getStyleColor( details, calendarEvent );

      return {
        top: ((calendarEvent.row - (index || 0)) * this.eventHeight) + 'px',
        color: details.forecolor,
        left: calendarEvent.starting ? '0px' : '-5px',
        right: calendarEvent.ending ? '0px' : '-6px',
        backgroundColor: this.blend( stateColor, this.inactiveBlendAmount, this.inactiveBlendTarget )
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

    refreshTimes()
    {
      this.today = Day.today();
      this.now = Day.now();
      this.tomorrow = Day.tomorrow();
    }
  }
};
