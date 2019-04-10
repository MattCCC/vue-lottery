<template functional>
  <div class="square"
    :class="data.staticClass || props.staticClass"
    v-bind="data.attrs"
    v-on="listeners"
  >
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    staticClass: { type: [ String, Array, Object ], default: '' },
    currentUrl: { type: String, default: '' },
  },
}
</script>

<style lang="scss">
.square {
  position: relative;
  border: 1px solid;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:before {
    content: '';
    display: block;
    padding-top: 100%;
  }

  .content {
    position: absolute;
    top: 0;
    height: 100%;
    display: flex;
    align-items: center;
  }
}
</style>
