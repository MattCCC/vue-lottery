<template functional>
  <button
    :type="props.type || 'button'"
    class="button"
    :class="data.staticClass || props.staticClass"
    :name="props.name"
    :required="props.required"
    :disabled="props.disabled"
    :aria-label="props.text"
    v-bind="data.attrs"
    v-on="listeners"
  >
    <slot>{{props.text}}</slot>
  </button>
</template>

<script>
/*
* Just an example of functional component
 */
export default {
  props: {
    staticClass: { type: [ String, Array, Object ], default: '' },
    id: { type: String, default: '' },
    name: { type: String, default: '' },
    type: { type: String, default: '' },
    value: { type: String, default: '' },
    required: { type: [Boolean, String], default: false },
    disabled: { type: [Boolean, String], default: false },
    text: { type: String, default: '' },
  },
}
</script>

<style lang="less">

// Some random vars
@button-padding-x: 1.5rem;
@button-padding-y: 0.7rem;
@bg-colour: #fff;

.button {
  border-radius: .3rem;
  border: 1px solid darken(@bg-colour, 10%);
  outline: 0 !important;
  font-size: 1rem;
  background: @bg-colour;
  padding: @button-padding-y @button-padding-x;
  cursor: pointer;
  transition: .3s ease all;

  &:hover, &:focus {
    border-color: darken(@bg-colour, 15%);
  }

  &:active {
    background: linear-gradient(to bottom, @bg-colour 0%, darken(@bg-colour, 3%) 100%);
  }
}
</style>
