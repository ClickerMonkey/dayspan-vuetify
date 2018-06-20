import { Day, Constants, Functions as fn } from 'dayspan';

    /**
    colors:
      inCalendarForeground
      inCalendarBackground
      outCalendarForeground
      outCalendarBackground
      todayColor
      todayColorCompliment
      lineColor
      hourTextSize
      hourTextForeground
      hourBackground
     */

export default {

  install(Vue, options)
  {
    var $dayspan = this.defaultOptions;

    if (fn.isObject(options))
    {
      Vue.util.extend( $dayspan, options );
    }

    Vue.$dayspan = $dayspan;
    Vue.prototype.$dayspan = $dayspan;
    Vue.prototype._b = $bindObjectProps;
  },

  defaultOptions:
  {
    today: Day.today(),
    tomorrow: Day.tomorrow(),
    now: Day.now(),
    timeout: null,
    refreshTimes: 60000,

    dayPadding: 5,
    dayHeight: 960,
    columnOffset: 14,
    eventHeight: 19,
    hourHeight: 40,

    mouseMoveRound: 1,
    mouseAddRound: Constants.MILLIS_IN_MINUTE * 15,
    mouseDragRound: Constants.MILLIS_IN_MINUTE * 15,

    colors:
    {
      WHITE: { r: 255, g: 255, b: 255 }
    },

    getEventColor: function(event, calendarEvent)
    {
      throw 'getEventColor(event, calendarEvent?) must be passed to options of Vue.use';
    },

    setEventColor: function(event, color, calendarEvent)
    {
      throw 'setEventColor(event, color, calendarEvent?) must be passed to options of Vue.use';
    },

    getEventTitle: function(event, calendarEvent)
    {
      throw 'getEventTitle(event, calendarEvent?) must be passed to options of Vue.use';
    },

    setEventTitle: function(event, title, calendarEvent)
    {
      throw 'setEventTitle(event, title, calendarEvent?) must be passed to options of Vue.use';
    },

    getStyleFull: function(calendarEvent, index)
    {
      var past = calendarEvent.time.start.isBefore( this.today );
      var cancelled = calendarEvent.cancelled;

      var color = this.getStyleColor( calendarEvent );
      var stateColor = this.getStyleColor( calendarEvent, past, cancelled );

      return {
        top: ((calendarEvent.row - (index || 0)) * this.eventHeight) + 'px',
        backgroundColor: stateColor,
        marginLeft: calendarEvent.starting ? 0 : '-5px',
        marginRight: calendarEvent.ending ? 0 : '-5px',
        textDecoration: cancelled ? 'line-through' : 'inherit',
        textDecorationColor: cancelled ? color : 'inherit'
      };
    },

    getStyleTimed: function(calendarEvent)
    {
      var past = calendarEvent.time.end.isBefore( this.now );
      var cancelled = calendarEvent.cancelled;
      var bounds = calendarEvent.getTimeBounds( this.dayHeight, 1, this.columnOffset );

      var color = this.getStyleColor( calendarEvent );
      var stateColor = this.getStyleColor( calendarEvent, past, cancelled );

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

    getStyleColor: function(calendarEvent, past, cancelled)
    {
      var color = this.getEventColor( calendarEvent.event, calendarEvent );

      if (past || cancelled) {
        color = this.blend( color, 0.5, this.colors.WHITE );
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
        this.refreshTimes
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

function $bindObjectProps(data, tag, value, asProp, isSync) {
  if (value) {
    if (value === null || typeof value !== 'object') {
      warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        var res = {};
        for (var i = 0; i < value.length; i++) {
          if (arr[i]) {
            Vue.util.extend(res, value[i]);
          }
        }
        value = res;
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          key === 'scopedSlots' ||
          Vue.config.isReservedAttr(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || Vue.config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        if (!(key in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}
