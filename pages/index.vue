<template>
  <section class="page container">
      <h1 class="title">{{ $metaInfo.title }}</h1>
      <h2 class="subtitle mb-5">simple lotto game</h2>
      <h2 class="mb-5">
        <NLink :to="`/play`">Play</NLink>
      </h2>

      <h2 class="subtitle mb-5">About the project</h2>
      <ul class="text-left mb-5">
        <li>SSR + PWA</li>
        <li>Vue + Vuex &amp; Nuxt</li>
        <li>Toasts with Nuxt's pluggable architecture</li>
        <li>Proper Vuex Lifecycle</li>
        <li>Utilizes newest CSS Grid</li>
        <li>SCSS BS4 modules with Flexbox support</li>
        <li>Fully responsive - RWD</li>
        <li>Contains BS4 nav</li>
      </ul>

      <h2 class="subtitle mb-5">Info</h2>
      <ul class="text-left">
        <li>Welcome to lottery demo!</li>
        <li>BS4 is overkill in here... But it's just an example</li>
        <li>App could be optimized for output size furthermore</li>
      </ul>

      <div class="links mb-5">
        <a href="https://deindesign.pl/" target="_blank" class="button--green"
          >DeinDesign.pl</a
        >
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey"
          >GitHub</a
        >
      </div>
  </section>
</template>

<script>
export default {
  head() {
    return {
      title: "quik-lotto"
    }
  },
  components: {
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.links {
  padding-top: 15px;
}
</style>
