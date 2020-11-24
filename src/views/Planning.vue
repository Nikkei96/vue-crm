<template>
  <div>
    <div class='page-title'>
      <h3>Планирование</h3>
      <h4>{{info.bill | currencyFilter('RUB')}}</h4>
    </div>

    <Loader v-if='loading' />

    <section
      v-else-if='categories.length'
      v-for='cat of categories'
      :key='cat.id'
    >
      <div>
        <p>
          <strong>{{cat.title}}:</strong>
          {{cat.spend | currencyFilter}} из {{cat.limit | currencyFilter}}
        </p>
        <div class='progress' v-tooltip='cat.tooltip'>
          <div
            class='determinate'
            :class='cat.progressColor'
            :style='{width: cat.progressPercent + "%"}'
          ></div>
        </div>
      </div>
    </section>
    <p class='center' v-else>
      Категорий пока нет!
      <br />
      <router-link to='/categories'>Создать новую категорию</router-link>
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import currencyFilter from '@/filters/currency.filter'

export default {
  data: () => ({
    loading: true,
    categories: [],
  }),

  computed: {
    ...mapGetters(['info']),
  },

  async mounted() {
    const records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')

    this.categories = categories.map(cat => {
      const spend = records
        .filter(r => r.categoryId === cat.id)
        .filter(r => r.type === 'outcome')
        .reduce((total, record) => {
          return (total += +record.amount)
        }, 0)

      const percent = (100 * spend) / cat.limit
      const progressPercent = percent > 100 ? 100 : percent
      const progressColor =
        percent < 60 ? 'green' : percent < 100 ? 'yellow' : 'red'

      const tooltipValue = cat.limit - spend
      const tooltip = `${
        tooltipValue < 0 ? 'Превышение на' : 'Осталось'
      } ${currencyFilter(Math.abs(tooltipValue))}`

      return {
        ...cat,
        progressPercent,
        progressColor,
        spend,
        tooltip,
      }
    })

    this.loading = false
  },
}
</script>