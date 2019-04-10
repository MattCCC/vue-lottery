<template functional>
  <ul :class="data.staticClass || props.staticClass">
    <li v-for="item in props.items" :key="item.name" class="nav-item" :class="props.currentUrl == item.url ? `active` : ``">
      <NLink class="nav-link" :to="item.url">{{item.name}}</NLink>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    staticClass: { type: [ String, Array, Object ], default: 'navbar-nav mr-auto' },
    items: { type: Array, default: () => [] },
    currentUrl: { type: String, default: '' },
  },
}
</script>
