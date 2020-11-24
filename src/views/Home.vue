<template>
  <div>
    <div class='page-title'>
      <h3>Счет</h3>

      <button class='btn waves-effect waves-light btn-small'>
        <i class='material-icons' @click='refresh()'>refresh</i>
      </button>
    </div>

    <Loader v-if='loading' />
    <div class='row' v-else>
      <HomeBill :rates='currency.rates' />
      <HomeCurrency :rates='currency.rates' :date='currency.date' />
    </div>
  </div>
</template>

<script>
export default {
  components: {
    HomeBill: () => import('@/components/HomeBill'),
    HomeCurrency: () => import('@/components/HomeCurrency'),
  },

  data: () => ({
    loading: true,
    currency: null,
  }),

  methods: {
    async refresh() {
      this.loading = true
      this.currency = await this.$store.dispatch('fetchCurrency')
      this.loading = false
    },
  },

  async mounted() {
    this.currency = await this.$store.dispatch('fetchCurrency')
    this.loading = false
  },
}
</script>