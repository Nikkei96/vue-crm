<template>
  <div>
    <ul>
      <li v-for='item of arr.map(v => v * 12)'>{{item}}</li>
    </ul>
    {{$store.getters}}
  </div>
</template>

<script>
export default {
  data() {
    return {
      arr: [1, 2, 3, 4, 5, 6, 7, 8],
    }
  },
}
</script>