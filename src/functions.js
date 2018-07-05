
import { Functions as fn } from 'dayspan';


export function dsMerge(target, source)
{
  if (!fn.isObject(target))
  {
    return source;
  }

  if (fn.isObject(source))
  {
    for (let prop in source)
    {
      if (prop in target)
      {
        dsMerge( target[ prop ], source[ prop ] );
      }
      else
      {
        target[ prop ] = source[ prop ];
      }
    }
  }

  return target;
}

export function dsMergeValidate(target, source)
{
  return dsMerge( target, source ) !== source;
}

export function dsValidate(input, property)
{
  return dsMergeValidate( input, this.$dsDefaults()[ property ] );
}

export function dsDefaults()
{
  return this.$dayspan.defaults[ this.$options.name ];
}

export function dsBind(bind)
{
  return function(data, tag, value, asProp, isSync)
  {
    if (value && value.$scopedSlots)
    {
      data.scopedSlots = value.$scopedSlots;
      delete value.$scopedSlots;
    }

    return bind.apply(this, arguments);
  };
}
