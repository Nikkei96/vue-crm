<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Сумма</th>
        <th>Дата</th>
        <th>Категория</th>
        <th>Тип</th>
        <th>Открыть</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for='(record, idx) of records' :key='idx'>
        <td>{{idx + 1}}</td>
        <td>{{record.amount | currencyFilter}}</td>
        <td>{{record.date | dateFilter('datetime')}}</td>
        <td>{{record.categoryName}}</td>
        <td>
          <span
            class='white-text badge'
            :class='[record.typeClass]'
          >{{record.typeText}}</span>
        </td>
        <td>
          <button
            class='btn-small btn'
            @click='$router.push("/detail/" + record.id)'
            v-tooltip='"Посмотреть детали"'
          >
            <i class='material-icons'>open_in_new</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    records: {
      required: true,
      type: Array,
    },
  },
}
</script>