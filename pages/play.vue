<template>
  <section class="page play">
    <h1 class="title">{{ $metaInfo.title }}</h1>

    <h2 class="subtitle" :class="{invisible: !ticketsLeft}">
      {{ $options.formatText(youtBalanceText, userBalance) }}
    </h2>

    <SquaresGrid
      class="play mb-5"
      :items="squares"
      :active="selectedNumbers"
      @squareClick="onSquareClick"
    />

    <div class="stake mb-5">
        <span class="d-inline-block">
        {{ yourStakeText }}:
        </span>
        <input class="align-middle"
          type="range"
          name="stake"
          :min="$options.config.minStake"
          :max="$options.config.maxStake"
          :value="userStake"
          @change="onChangeStake"
        >
        <span class="d-inline-block">
          {{ $options.config.minStake }} - {{ $options.config.maxStake }} ({{ userStake }})
        </span>
    </div>
    <div class="mb-5">
      {{ $options.formatText(canBuyTicketsText, ticketsLeft) }}
    </div>
    <div class="col-12 text-center mb-5">
      <CustomButton class="mx-2" :text="buyTicketBtnText" @click="onClickBuyTicket" />
      <NLink v-if="boughtTickets > 0" to="/betslip" class="button mx-2">{{ drawBtntext }}</NLink>
    </div>
  </section>
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex'
import config from '~/app.config.js'
import {
  formatText
} from '~/utils/formatText'

import SquaresGrid from '~/components/SquaresGrid'
import CustomButton from '~/components/CustomButton'

export default {
  config,
  formatText,
  head() {
    return {
      title: "Buy Tickets",
    }
  },
  components: {
    CustomButton,
    SquaresGrid,
  },
  data() {
    return {
      // TODO: reactivity/move it out
      yourStakeText: "Your Stake",
      buyTicketBtnText: "Buy Ticket",
      drawBtntext: "See Betslip",
      maxNumbersMsg: "You can select maximum 6 numbers",
      noBalanceErr: "No enough balance to buy more tickets",
      noStakeErr: "Please choose stake within range",
      minNumbersErr: "Please choose some more numbers",
      cantBuyMoreErr: "You cannot buy more tickets. Please click See Betslip to proceed",
      boughtTicketMsg: "Ticket has been bought. Continue buying or click See Betslip to proceed",
      canBuyTicketsText: "You can buy %s more tickets",
      youtBalanceText: "Your Current Balance: %s",
    }
  },
  computed: {
    ...mapGetters({
      squares: 'lottery/allNumbers',

      userStake: 'userLottery/stake',
      userBalance: 'userLottery/balance',
      selectedNumbers: 'userLottery/currentNumbers',
      userNumbersTotal: 'userLottery/numNumbers',
      boughtTickets: 'userLottery/numTickets',
      ticketsLeft: 'userLottery/ticketsLeft',

      allSelectedNumbers: 'userLottery/allSelectedNumbers',
      stakeWithinRange: 'userLottery/stakeWithinRange',
      hasEnoughBalance: 'userLottery/hasEnoughBalance',
      canBuyMoreTickets: 'userLottery/canBuyMoreTickets',
    }),
  },
  methods: {
    ...mapActions({
      ADD_NUMBER: 'userLottery/ADD_NUMBER',
      REMOVE_NUMBER: 'userLottery/REMOVE_NUMBER',
      SET_STAKE: 'userLottery/SET_STAKE',
      BUY_TICKET: 'userLottery/BUY_TICKET',
    }),

    isNumberSelected(number) {
      return this.selectedNumbers.indexOf(number) !== -1
    },

    onSquareClick(number) {
      if (this.isNumberSelected(number)) {
        this.REMOVE_NUMBER(number)
        return false
      }

      if (this.allSelectedNumbers) {
        this.$toast.info(this.maxNumbersMsg)
        return false
      }

      this.ADD_NUMBER(number)
    },

    onChangeStake(e) {
      this.SET_STAKE(e.target.value)
    },

    onClickBuyTicket() {
      // TODO: Could be some error handling...
      let err = ''
      if (!this.canBuyMoreTickets) err = this.cantBuyMoreErr
      else if (!this.hasEnoughBalance) err = this.noBalanceErr
      else if (!this.stakeWithinRange) err = this.noStakeErr
      else if (!this.allSelectedNumbers) err = this.minNumbersErr

      if (err) {
        this.$toast.error(err)
        return false
      }

      this.BUY_TICKET().then(() => {
        this.$toast.success(this.boughtTicketMsg)
      })
    },
  },
}
</script>

<style lang="scss">
.stake {
  margin: 3rem 0;
}
</style>
