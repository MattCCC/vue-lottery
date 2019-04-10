<template functional>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <slot name="logo"></slot>

    <div class="collapse navbar-collapse">
      <slot name="menu"></slot>
    </div>
  </nav>
</template>
