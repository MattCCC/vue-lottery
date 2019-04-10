<template>
  <section>
    <Header>
      <template v-slot:logo>
        <NLink class="navbar-brand" to="/">
          <Logo />
        </NLink>
      </template>

      <template v-slot:menu>
        <Menu :items="menuItems" :current-url="$route.path" />
      </template>
    </Header>

    <NoSsr>
      <Toasts	:max-messages="1" :time-out="3000"></Toasts>
    </NoSsr>

    <nuxt />
  </section>
</template>

<script>
import Header from '~/components/Header'
import Logo from '~/components/Logo'
import Menu from '~/components/Menu'

export default {
  components: {
    Header,
    Logo,
    Menu
  },
  data() {
    return {
      menuItems: [
        {
          name: 'Home',
          url: '/',
        },
        {
          name: 'Play',
          url: '/play',
        },
        {
          name: 'Betslip',
          url: '/betslip',
        },
        {
          name: 'Game',
          url: '/draw',
        },
      ]
    }
  }
}
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  min-height: 120vh;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
