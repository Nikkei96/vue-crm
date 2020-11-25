<template>
  <div>
    <div class='page-title'>
      <h3>История записей</h3>
    </div>

    <div class='history-chart'>
      <canvas></canvas>
    </div>
    <hr />

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

export default {
  name: 'history',
  mixins: [paginationMixin],
  components: {
    HistoryTable: () => import('@/components/HistoryTable'),
  },

  data: () => ({
    loading: true,
    records: [],
  }),

  async mounted() {
    this.records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')

    this.setupPagination(
      this.records.map(record => ({
        ...record,
        categoryName: categories.find(cat => cat.id === record.categoryId)
          .title,
        typeClass: record.type === 'income' ? 'green' : 'red',
        typeText: record.type === 'income' ? 'Доход' : 'Расход',
      }))
    )

    this.loading = false
  },
}
</script>