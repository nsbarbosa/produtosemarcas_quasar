<template>
  <q-page class="flex flex-center">
    <q-card v-for="product in products" :key="product.id">
      <q-card-title>{{product.name}}</q-card-title>
      <q-card-separator/>
      <q-card-main>{{product.description}}</q-card-main>
    </q-card>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      products: {}
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.$axios.get('/product').then(response => {
        this.products = response.data
        console.log(this.products)
      })
        .catch(() => {
          this.$q.notify({
            color: 'negative',
            position: 'top',
            message: 'Erro ao carregar produtos',
            icon: 'report_problem'
          })
        })
    }
  }
}
</script>
