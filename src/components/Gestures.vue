<template>

  <div class="ds-gesture-container"
    @touchstart="start"
    @touchmove="move"
    @touchend="end">

    <slot></slot>

  </div>

</template>

<script>
export default {

  name: 'dsGestures',

  props:
  {
    minDistance:
    {
      type: Number,
      default() {
        return this.$dsDefaults().minDistance;
      }
    },
    maxDistance:
    {
      type: Number,
      default() {
        return this.$dsDefaults().maxDistance;
      }
    },
    maxWander:
    {
      type: Number,
      default() {
        return this.$dsDefaults().maxWander;
      }
    }
  },

  methods:
  {
    start($event)
    {
      this.starting = this.getPoint( $event );
    },

    move($event)
    {
      this.checkGesture( this.getPoint( $event ), this.maxDistance );
    },

    end($event)
    {
      this.checkGesture( this.getPoint( $event ), this.minDistance );
    },

    checkGesture(point, threshold)
    {
      let start = this.starting;

      if (!start)
      {
        return false;
      }

      let dx = point.x - start.x;
      let dy = point.y - start.y;
      let dSq = dx * dx;

      if (dSq > threshold * threshold)
      {
        let distance = Math.sqrt( dSq );
        let adx = dx < 0 ? -dx : dx;
        let ady = dy < 0 ? -dy : dy;

        // more horizontal than vertical
        if (adx > ady)
        {
          // check wander
          if (adx * this.maxWander > ady)
          {
            // towards left
            if (dx < 0)
            {
              this.$emit('swipeleft', adx);
            }
            // towards right
            else
            {
              this.$emit('swiperight', adx);
            }

            this.$emit('swipex', dx);
          }
        }
        // more vertical than horizontal
        else
        {
          // check wander
          if (ady * this.maxWander > adx)
          {
            // towards top
            if (dy < 0)
            {
              this.$emit('swipeup', ady);
            }
            // towards bottom
            else
            {
              this.$emit('swipedown', ady);
            }

            this.$emit('swipey', dy);
          }
        }

        this.starting = null;
      }
    },

    getPoint($event)
    {
      var touch = $event.touches[0] || $event.changedTouches[0];

      return {
        x: touch.clientX,
        y: touch.clientY
      };
    }
  }

}
</script>

<style scoped lang="scss">

.ds-gesture-container {
  width: 100%;
  height: 100%;
}

</style>
