<template>
  <div>
    <div class='page-title'>
      <h3>История записей</h3>
    </div>

    <div class='history-chart'>
      <canvas ref='canvas'></canvas>
    </div>

    <Loader v-if='loading' />

    <p class='center' v-else-if='!records.length'>
      Записей пока нет!
      <router-link to='/record'>Добавьте первую запись!</router-link>
    </p>

    <section v-else>
      <HistoryTable :records='items' />

      <Paginate
        v-model='page'
        :page-count='pageCount'
        :click-handler='pageChangeHandler'
        :prev-text='"Назад"'
        :next-text='"Вперёд"'
        :container-class='"pagination"'
        :page-class='"waves-effect"'
      />
    </section>
  </div>
</template>

<script>
import paginationMixin from '@/mixins/pagination.mixin'
import { Pie } from 'vue-chartjs'

export default {
  name: 'history',
  extends: Pie,
  mixins: [paginationMixin],
  components: {
    HistoryTable: () => import('@/components/HistoryTable'),
  },

  data: () => ({
    loading: true,
    records: [],
  }),

  methods: {
    setChartColors(categories) {
      const goodColors = [
        '82, 190, 128',
        '223, 255, 0',
        '255, 191, 0',
        '255, 127, 80',
        '222, 49, 99',
        '159, 226, 191',
        '64, 224, 208',
        '100, 149, 237',
        '204, 204, 255',
      ]
      let backgroundColor = []
      let borderColor = []
      for (let i = 0; i < categories.length; i++) {
        let color = `rgba(${goodColors[i]}`
        backgroundColor.push(color + ', 1)')
        borderColor.push(color + ', 0.2)')
      }

      return {
        backgroundColor,
        borderColor,
      }
    },

    async setup(categories) {
      this.setupPagination(
        this.records.map(record => ({
          ...record,
          categoryName: categories.find(cat => cat.id === record.categoryId)
            .title,
          typeClass: record.type === 'income' ? 'green' : 'red',
          typeText: record.type === 'income' ? 'Доход' : 'Расход',
        }))
      )
      const chartColor = this.setChartColors(categories)
      this.renderChart({
        labels: categories.map(c => c.title),
        datasets: [
          {
            label: 'Расходы по категориям',
            data: categories.map(cat => {
              return this.records.reduce((total, r) => {
                if (r.categoryId === cat.id && r.type === 'outcome') {
                  total += +r.amount
                }
                return total
              }, 0)
            }),
            backgroundColor: chartColor.backgroundColor,
            borderColor: chartColor.borderColor,
            borderWidth: 1,
          },
        ],
      })
    },
  },

  async mounted() {
    this.records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')

    this.setup(categories)

    this.loading = false
  },
}
</script>