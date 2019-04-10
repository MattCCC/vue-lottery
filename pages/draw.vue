<template>
<section class="page draw">
  <h1 class="title">{{ $metaInfo.title }}</h1>

  <div v-show="numTickets">
    <h2 v-show="!numCurrentDrawnNumbers" class="subtitle mb-5 text-center">
      Ready? <a class="do-draw" href="#" @click.prevent="onClickDraw">{{ drawBtnText }}</a>
    </h2>

    <SquaresGrid
      class="drawn-numbers twelve-columns mb-5"
      :active="drawnNumbers"
      :items="allDrawnNumbers"
    />

    <h2 class="subtitle">{{ $options.formatText(yourBetslipText, numTickets > 1 ? 's' : '') }}</h2>

    <SquaresGrid
      v-for="(ticket, i) in tickets"
      :key="i"
      class="betslip six-columns mb-5"
      :items="ticket.numbers"
      :active="drawnNumbers"
    />

    <div v-show="numWinningTickets">
      <h2 class="subtitle">
        {{ $options.formatText(youWonText, winningAmount, numWinningTickets, numWinningTickets > 1 ? ticketsText : ticketText) }}
      </h2>

      <div v-for="(ticket, i) in winningTickets" :key="i">
        <div class="mb-2">
          {{ ticketAmountWonText }}: {{ ticket.stake * $options.config.amountWonMultiplier }}
        </div>
        <SquaresGrid class="betslip won six-columns mb-5" :items="ticket.numbers" :active="drawnNumbers" />
      </div>

      <div class="new-balance-msg mb-5">
        {{ $options.formatText(newBalanceText, userBalance) }}
      </div>
    </div>
  </div>
  <h2 v-show="winningTicketsCalculated && !numWinningTickets" class="subtitle my-5">
    {{ noWinningTicketsMsg }}
  </h2>

  <h2 v-show="!numTickets" class="subtitle my-5">{{ noTicketsMsg }}</h2>
</section>
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

import {
  formatText
} from '~/utils/formatText'

import config from '~/app.config.js'
import SquaresGrid from '~/components/SquaresGrid'

export default {
  config,
  formatText,
  head() {
    return {
      title: "Draw",
    }
  },
  components: {
    SquaresGrid,
  },
  data() {
    return {
      drawnNumbers: [],
      winningTickets: [],
      yourBetslipText: "Your Betslip%s",
      drawBtnText: "Start",
      noTicketsMsg: "Please buy tickets to draw",
      ticketText: "ticket",
      ticketsText: "tickets",
      ticketAmountWonText: "Amount won for the ticket",
      youWonText: "You won %s! %s winning %s!",
      newBalanceText: "Your new balance: %s",
      noWinningTicketsMsg: "You lost",

      localTickets: [], // local copy of user's tickets
      winningTicketsCalculated: false,
      inDraw: false, // Used to make sure that user is still in Draw
    }
  },
  computed: {
    ...mapGetters({
      allDrawnNumbers: 'lottery/drawnNumbers',
      allNumbers: 'lottery/allNumbers',

      userTickets: 'userLottery/tickets',
      userBalance: 'userLottery/balance',
    }),
    tickets() {
      return this.localTickets.length ? this.localTickets : this.userTickets
    },
    numTickets() {
      return this.tickets.length
    },
    numAllDrawnNumbers() {
      return this.allDrawnNumbers.length
    },
    numWinningTickets() {
      return this.winningTickets.length
    },
    numCurrentDrawnNumbers() {
      return this.drawnNumbers.length
    },
    winningAmount() {
      if (!this.numWinningTickets) {
        return 0
      }
      const multiplyWinningStakes = (acc, curr) => acc + (curr.stake * config.amountWonMultiplier)
      return this.winningTickets.slice(0).reduce(multiplyWinningStakes, 0)
    },
  },
  beforeDestroy() {
    this.inDraw = false
  },
  methods: {
    ...mapActions({
      DRAW_RANDOM_NUMBERS: 'lottery/DRAW_RANDOM_NUMBERS',
      REMOVE_USER_TICKETS: 'userLottery/REMOVE_TICKETS',
      ADD_USER_BALANCE: 'userLottery/ADD_BALANCE',
    }),
    async onClickDraw() {
      this.inDraw = true
      await this.DRAW_RANDOM_NUMBERS()
      await this.appendDrawnNumbers()
      await this.finishDraw()
    },
    finishDraw() {
      window.setTimeout(() => {
        if (this.inDraw) {
          this.calculateWinningTickets()

          this.ADD_USER_BALANCE( this.winningAmount ).then( () => {
            // Before removal, copy user's tickets to preserve the view
            this.localTickets = this.userTickets.slice(0)
            this.REMOVE_USER_TICKETS()
          } )

          this.setRedirection()
        }
      }, this.lastNumberTimeout())
    },
    calculateWinningTickets() {
      this.tickets.forEach(ticket => {
        const commonNumbers = ticket.numbers.filter( v => this.allDrawnNumbers.indexOf(v) > -1 )

        // All numbers are common
        if (commonNumbers.length === ticket.numbers.length) {
          this.winningTickets.push(ticket)
        }
      })
      this.winningTicketsCalculated = true
    },
    // Append numbers one by one for additional transition effect
    async appendDrawnNumbers() {
      await this.allDrawnNumbers.forEach((number, index) => {

        window.setTimeout(() => {
          this.drawnNumbers.push(number)
        }, this.calcNumberTimeout(index))

      })
    },
    lastNumberTimeout() {
      return this.calcNumberTimeout(0)
    },
    calcNumberTimeout(index) {
      return config.drawTimeToAppear * (this.numAllDrawnNumbers - (index + 1))
    },
    setRedirection() {
      window.setTimeout(() => {
        if (this.inDraw) {
          this.$router.push('/')
        }
      }, (config.stayOnPageAfterDraw * 1000))
    }
  },
}
</script>

<style lang="scss">
</style>
