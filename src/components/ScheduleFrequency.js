
import { Schedule, Functions as fn } from 'dayspan';

// required: property

export default {

  props:
  {
    schedule:
    {
      required: true,
      type: Schedule
    }
  },

  computed:
  {
    frequency:
    {
      get()
      {
        return this.property ? this.schedule[ this.property ].input : null;
      },
      set(value)
      {
        this.property && this.schedule.setFrequency( this.property, value );
      }
    },

    type:
    {
      get()
      {
        return this.getFrequencyType( this.frequency );
      },
      set(type)
      {
        this.$dayspan.getPermission('changeExistingType', () =>
        {
          this.setFrequencyType( type );
        });
      }
    },

    isAny()
    {
      return this.type === 'any';
    },

    isOneOf()
    {
      return this.type === 'oneof';
    },

    isEvery()
    {
      return this.type === 'every';
    }
  },

  watch:
  {
    property: 'onPropertyChange'
  },

  methods:
  {
    getCustomFrequencyType(value)
    {

    },

    setCustomFrequencyType(type)
    {

    },

    getFrequencyType(value)
    {
      var custom = this.getCustomFrequencyType( value );

      if (custom) return custom;
      if (!value) return 'any';
      if (fn.isArray(value)) return 'oneof';
      if (fn.isFrequencyValueEvery(value)) return 'every';

      return 'unknown';
    },

    setFrequencyType(type)
    {
      switch (type)
      {
        case 'any':
          this.frequency = null;
          break;

        case 'oneof':
          if (!fn.isArray(this.frequency))
          {
            this.frequency = [];
          }
          break;

        case 'every':
          if (!fn.isFrequencyValueEvery(this.frequency))
          {
            this.frequency = { every: 2 };
          }
          break;

        default:
          this.setCustomFrequencyType(type);
          break;
      }
    },

    onPropertyChange(newProperty, oldProperty)
    {
      var newValue = [];

      if (oldProperty)
      {
        var oldValue = this.schedule[ oldProperty ].input;

        if (oldValue)
        {
          newValue = oldValue;
        }

        this.schedule.setFrequency( oldProperty, null );
      }

      this.schedule.setFrequency( newProperty, newValue );
    },

    getOffsets(max, array, start, valueOffset)
    {
      var offsets = [];
      var min = start || 0;
      var offset = valueOffset || 0;

      for (var i = min; i < max; i++) {
        offsets.push({
          text: array[ i ],
          value: i + offset
        });
      }

      return offsets;
    },

    findType(types)
    {
      for (var i = 0; i < types.length; i++)
      {
        var type = types[ i ];

        if (this.schedule[ type.property ].input)
        {
          return type;
        }
      }

      return types[0];
    }
  }

}
