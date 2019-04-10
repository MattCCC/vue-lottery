<template>
  <div class="square-container">
    <Square
      v-for="(text, i) in items"
      :key="i"
      :static-class="[{active: active.indexOf(text) !== -1}, squareClass]"
      @click.prevent="onSquareClick(text)">
      {{text}}
    </Square>
  </div>
</template>

<script>
/**
 * Generate plain grid
 */

import Square from '~/components/Square'

export default {
  components: {
    Square,
  },
  props: {
    staticClass: { type: [ String, Array, Object ], default: '' },
    items: { type: Array, default: () => [] },
    active: { type: Array, default: () => [] },
    squareClass: { type: [ String, Array, Object ], default: '' },
  },
  methods: {
    onSquareClick(text) {
      this.$emit('squareClick', text)
    },
  }
}
</script>

<style lang="scss">
:root {
  --grid-columns: 8;
  --grid-gap: 10px;
  --grid-6-columns: 6;
  --grid-gap-6-columns: 10px;
  --grid-12-columns: 12;
  --grid-gap-12-columns: 10px;
}

.square-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(calc(100% / var(--grid-columns) - var(--grid-gap)), 1fr));
  grid-gap: var(--grid-gap);

  &.six-columns {
    grid-template-columns: repeat(auto-fit, minmax(calc(100% / var(--grid-6-columns) - var(--grid-gap-6-columns)), 1fr));
    grid-gap: var(--grid-gap-6-columns);
  }

  &.twelve-columns {
    grid-template-columns: repeat(auto-fit, minmax(calc(100% / var(--grid-12-columns) - var(--grid-gap-12-columns)), 1fr));
    grid-gap: var(--grid-gap-12-columns);
  }
}
</style>
