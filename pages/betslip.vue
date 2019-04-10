<template>
  <section class="page betslip">
    <h1 class="title">{{ $metaInfo.title }}</h1>

    <div v-show="boughtTickets">
      <h2 class="subtitle">You've bought {{ boughtTickets }} {{ boughtTicketsText }}</h2>

      <SquaresGrid
        v-for="(ticket, i) in tickets"
        :key="i"
        class="betslip six-columns mb-5"
        :items="ticket.numbers"
        />

      <div class="text-center mb-5">
        <NLink v-show="boughtTickets > 0" to="/draw" class="button">{{ drawBtnText }}</NLink>
      </div>
    </div>

    <h2 v-if="!boughtTickets" class="subtitle my-5">{{ noTicketsMsg }}</h2>
  </section>
</template>

<script>
import {
  mapGetters,
} from 'vuex'

import config from '~/app.config.js'
import SquaresGrid from '~/components/SquaresGrid'

export default {
  config,
  head() {
    return {
      title: "Betslip",
    }
  },
  components: {
    SquaresGrid,
  },
  data() {
    return {
      drawBtnText: "Start Draw",
      noTicketsMsg: "Please buy tickets to see your betslip",
      ticketText: "ticket",
      ticketsText: "tickets",
    }
  },
  computed: {
    ...mapGetters({
      boughtTickets: 'userLottery/numTickets',
      tickets: 'userLottery/tickets',
    }),

    boughtTicketsText() {
      return this.boughtTickets > 1 ? 'tickets' : 'ticket'
    },
  },
}
</script>

<style lang="scss">
</style>
