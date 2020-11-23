<template>
  <div>
    <div class='page-title'>
      <h3>Категории</h3>
    </div>
    <section>
      <div class='row'>
        <CategoryCreate @created='addNewCategory' />
        <CategoryEdit />
      </div>
    </section>
  </div>
</template>

<script >
export default {
  components: {
    CategoryCreate: () => import('@/components/CategoryCreate'),
    CategoryEdit: () => import('@/components/CategoryEdit'),
  },

  data: () => ({
    categories: [],
  }),

  methods: {
    addNewCategory(category) {
      this.categories.push(category)
      console.log(this.categories)
    },
  },
}
</script>