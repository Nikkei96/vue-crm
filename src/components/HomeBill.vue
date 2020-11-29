<template>
  <div class='col s12 m6 l4'>
    <div class='card light-blue bill-card'>
      <div class='card-content white-text'>
        <span class='card-title'>Счет в валюте</span>
        <p class='currency-line' v-for='c of Object.keys(rates)' :key='c'>
          <span>{{getCurrency(c) | currencyFilter(c)}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['rates'],

  computed: {
    base() {
      return this.$store.getters.info.bill
    },
  },

  methods: {
    getCurrency(currency) {
      return Math.floor(this.base * this.rates[currency])
    },
  },
}
</script>