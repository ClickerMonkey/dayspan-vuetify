
import { Day, Constants, Functions as fn } from 'dayspan';
import { default as Defaults } from './defaults';
import { default as Colors } from './colors';

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
    columnOffset:     14,
    eventHeight:      21,
    hourHeight:       40,

    rounding: {
      move:           1,
      add:            Constants.MILLIS_IN_MINUTE * 15,
      drag:           Constants.MILLIS_IN_MINUTE * 15
    },

    colorMap: {
      WHITE: { r: 255, g: 255, b: 255 }
    },

    supports: {
      description:    true,
      color:          true,
      location:       true,
      calendar:       true,
      busy:           true,
      guests:         false
    },

    colors: Colors,

    defaults: Defaults
  },

  methods:
  {

    parseMeta(m)
    {
      return m;
    },

    parseData(d)
    {
      return d;
    },

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
    getEventDetails: function(data, event, calendarEvent)
    {
      throw 'getEventDetails(data, event, calendarEvent?) must be passed to options of Vue.use';
    },

    setEventDetails: function(newData, data, event, calendarEvent)
    {
      throw 'setEventDetails(newData, data, event, calendarEvent?) must be passed to options of Vue.use';
    },

    getDefaultEventDetails: function()
    {
      return {
        title: '',
        descripton: '',
        location: '',
        color: this.colors[Math.floor(this.colors.length * Math.random())].value,
        forecolor: '#ffffff',
        calendar: '',
        busy: true
      };
    },

    isValidEvent(details, schedule, calendarEvent)
    {
      return !!details.title;
    },

    getScheduleDescription: function(schedule)
    {
      return schedule.describe('event', false, false, false, false)
    },

    getStyleFull: function(details, calendarEvent, index)
    {
      var past = calendarEvent.time.start.isBefore( this.today );
      var cancelled = calendarEvent.cancelled;

      var color = this.getStyleColor( details, calendarEvent );
      var stateColor = this.getStyleColor( details, calendarEvent, past, cancelled );

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

    getStyleTimed: function(details, calendarEvent)
    {
      var past = calendarEvent.time.end.isBefore( this.now );
      var cancelled = calendarEvent.cancelled;
      var bounds = calendarEvent.getTimeBounds( this.dayHeight, 1, this.columnOffset );

      var color = this.getStyleColor( details, calendarEvent );
      var stateColor = this.getStyleColor( details, calendarEvent, past, cancelled );

      return {
        top: bounds.top + 'px',
        height: bounds.height + 'px',
        left: bounds.left + 'px',
        backgroundColor: stateColor,
        marginLeft: calendarEvent.starting ? 0 : '-5px',
        marginRight: calendarEvent.ending ? 0 : '-5px',
        textDecoration: cancelled ? 'line-through' : 'inherit',
        textDecorationColor: cancelled ? color : 'inherit'
      };
    },

    getPrefix: function(calendarEvent, sameDay)
    {
      return sameDay.length === 1 ? sameDay[0].start.format('ha') : '(' + sameDay.length + ')';
    },

    getStyleNowBorder: function()
    {
      return '#db4437 solid 2px';
    },

    getStyleNow: function()
    {
      var now = this.now.asTime().toMilliseconds();
      var delta = now / Constants.MILLIS_IN_DAY;
      var top = delta * this.dayHeight;

      return {
        position: 'absolute',
        left: '0px',
        right: '-1px',
        top: (top - 1) + 'px',
        borderTop: this.getStyleNowBorder()
      };
    },

    getStyleColor: function(details, calendarEvent, past, cancelled)
    {
      var color = details.color;

      if (past || cancelled) {
        color = this.blend( color, 0.5, this.colorMap.WHITE );
      }

      return color;
    },

    getStyleHighlightColor: function()
    {
      return 'rgba(230,230,230,0.7)';
    },

    getStyleHighlight: function(highlight, day)
    {
      var bounds = highlight.getBounds( day, this.dayHeight );

      return {
        position: 'absolute',
        top: bounds.top + 'px',
        height: bounds.height + 'px',
        left: '0px',
        right: '0px',
        backgroundColor: this.getStyleHighlightColor(),
        marginRight: '-1px'
      };
    },

    parseColor: function(color)
    {
      if (fn.isObject(color)) {
        return color;
      }

      var match = /#(\w\w)(\w\w)(\w\w)/.exec(color);
      return {
        r: parseInt( match[1], 16 ),
        g: parseInt( match[2], 16 ),
        b: parseInt( match[3], 16 )
      };
    },

    clampComponent: function(c)
    {
      return Math.max( 0, Math.min( 255, Math.floor( c ) ) );
    },

    clampColor: function(color, out)
    {
      var target = out || color;
      target.r = this.clampComponent( color.r );
      target.g = this.clampComponent( color.g );
      target.b = this.clampComponent( color.b );
      return target;
    },

    formatComponent: function(c)
    {
      var x = c.toString( 16 );
      return x.length === 1 ? '0' + x : x;
    },

    formatColor: function(color)
    {
      return '#' +
        this.formatComponent( color.r ) +
        this.formatComponent( color.g ) +
        this.formatComponent( color.b );
    },

    blend: function(from, delta, to)
    {
      var parsedFrom = this.parseColor( from );
      var parsedTo = this.parseColor( to );

      var blended = {
        r: parsedTo.r + (parsedFrom.r - parsedTo.r) * delta,
        g: parsedTo.g + (parsedFrom.g - parsedTo.g) * delta,
        b: parsedTo.b + (parsedFrom.b - parsedTo.b) * delta
      };

      this.clampColor( blended );

      return this.formatColor( blended );
    },

    roundTime: function(day, millis, up)
    {
      var time = day.time;
      var over = time % millis;
      var relative = -over;

      if (up && relative !== 0) {
        relative += millis;
      }

      return day.relative( relative );
    },

    startRefreshTimes: function()
    {
      var $dayspan = this;

      this.timeout = setTimeout(
        function()
        {
          $dayspan.refreshTimes();
          $dayspan.startRefreshTimes();
        },
        this.refreshInterval
      );
    },

    stopRefreshTimes: function()
    {
      clearTimeout( this.timeout );

      this.timeout = null;
    },

    refreshTimes: function()
    {
      this.today = Day.today();
      this.now = Day.now();
      this.tomorrow = Day.tomorrow();
    }
  }
};
