<template>
  <q-page class="flex flex-center">
      <div v-for="brand in brands" :key="brand.id">
        <q-card>
        <q-card-title>
            {{brand.name}}
        </q-card-title>
        <q-card-main>
            <p>{{brand.description}}</p>
        </q-card-main>
        <q-card-separator />
        <q-card-actions>
            <q-btn flat icon="edit" label="Editar" @click="opened=true,route='put',form.name = brand.name, form.description = brand.description, brandId = brand.id" />
            <q-btn flat icon="delete_sweep" label="Excluir" @click="brandId = brand.id, deleteBrand()" />
        </q-card-actions>
        </q-card>
      </div>
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn
        round
        color="primary"
        @click="opened=true,route='post', form.name=null, form.description=null"
        icon="add"
        />
      </q-page-sticky>
      <q-modal v-model="opened">
        <q-modal-layout>
        <q-toolbar slot="header">
        <q-btn
            flat
            round
            dense
            v-close-overlay
            icon="keyboard_arrow_left"
        />
        <q-toolbar-title>
            Marcas
        </q-toolbar-title>
        </q-toolbar>

        <div class="layout-padding">
        <q-input v-model="form.name" float-label="Nome da marca" />
        <q-input v-model="form.description" float-label="Descrição da marca" />

        <q-btn
            @click="saveBrand()"
            color="primary"
            v-close-overlay
            label="Salvar"
        />
        </div>
        </q-modal-layout>
        </q-modal>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  data () {
    return {
      form: {
        name: '',
        description: ''
      },
      brandId: '',
      brands: {},
      opened: false,
      route: ''
    }
  },
  mounted () {
    this.getBrands()
  },
  methods: {
    getBrands () {
      this.$axios.get('/brand').then(response => {
        this.brands = response.data
        console.log(this.brands)
      })
        .catch((e) => {
          console.log(e)
          this.$q.notify({
            color: 'negative',
            position: 'top',
            message: 'Erro ao carregar marcas',
            icon: 'report_problem'
          })
        })
    },
    saveBrand () {
      if (this.route === 'put') {
        this.$axios.put('/brand/' + this.brandId, this.form).then(response => {
          // this.brands = response.data
          console.log(this.form)
          this.getBrands()
        })
          .catch((e) => {
            console.log(e)
            this.$q.notify({
              color: 'negative',
              position: 'top',
              message: 'Erro ao editar a marca',
              icon: 'report_problem'
            })
          })
      }
      if (this.route === 'post') {
        this.$axios.post('/brand', this.form).then(response => {
          // this.brands = response.data
          console.log(this.form)
          this.getBrands()
        })
          .catch((e) => {
            console.log(e)
            this.$q.notify({
              color: 'negative',
              position: 'top',
              message: 'Erro ao criar marca',
              icon: 'report_problem'
            })
          })
      }
    },
    deleteBrand () {
      this.$axios.delete('/brand/' + this.brandId).then(response => {
        // this.brands = response.data
        console.log(response)
        this.getBrands()
      })
        .catch((e) => {
          console.log(e)
          this.$q.notify({
            color: 'negative',
            position: 'top',
            message: 'Erro ao deletar a marca',
            icon: 'report_problem'
          })
        })
    }
  }
}
</script>
