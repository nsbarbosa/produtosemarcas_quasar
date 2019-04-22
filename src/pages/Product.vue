<template>
  <q-page class="flex flex-center">
      <div v-for="product in products" :key="product.id">
        <q-card>
        <q-card-title>
            {{product.name}}
        </q-card-title>
        <q-card-media>
        <img src="">
        </q-card-media>
        <q-card-main>
            <p>Marca: {{product.brand.name}}</p>
            <p>Descrição: {{product.description}}</p>
        </q-card-main>
        <q-card-separator />
        <q-card-actions>
            <q-btn flat icon="edit" label="Editar" @click="opened=true,route='put',form.name = product.name, form.description = product.description, productId = product.id" />
            <q-btn flat icon="delete_sweep" label="Excluir" @click="productId = product.id, deleteProduct()" />
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
            Produtos
        </q-toolbar-title>
        </q-toolbar>

        <div class="layout-padding">
        <q-input v-model="form.name" float-label="Nome do produto" />
        <q-input v-model="form.description" float-label="Descrição do produto" />
         <q-select
        v-model="form.brand_id"
        :options="brands"
        float-label="Marca"
        />
        <q-uploader
          url=""
          extensions=".gif,.jpg,.jpeg,.png"
          @add="file_selected"
          />

        <q-btn @click="uploadFile()">Upload</q-btn>

        <q-btn
            @click="saveProduct()"
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
      selected_file: '',
      form: {
        name: '',
        description: '',
        brand_id: ''
      },
      brands: [],
      productId: '',
      products: {},
      opened: false,
      route: ''
    }
  },
  mounted () {
    this.getProducts()
    this.getBrands()
  },
  methods: {
    file_selected (file) {
      this.selected_file = file[0]
    },
    uploadFile () {
      let fd = new FormData()
      fd.append('file', this.selected_file)

      this.$axios.post('/image', fd, {
        headers: { 'Content-Type': 'multpart/form-data' }
      }).then(function (response) {
        console.log(this.selected_file)
      })
    },
    getUrl () {
      return 'http://127.0.0.1:8000/api/image'
    },
    getBrands () {
      this.$axios.get('/brand').then(response => {
        // this.brands = response.data
        for (let i = 0; i < response.data.length; i++) {
          this.brands.push({ label: response.data[i].name, value: response.data[i].id })
        }
        console.log(this.brands)
      })
        .catch((e) => {
          console.log(e)
          console.log('Erro ao recuperar lista de marcas')
        })
    },
    getProducts () {
      this.$axios.get('/product').then(response => {
        this.products = response.data
        console.log(this.products)
      })
        .catch((e) => {
          console.log(e)
          this.$q.notify({
            color: 'negative',
            position: 'top',
            message: 'Erro ao carregar produtos',
            icon: 'report_problem'
          })
        })
    },
    saveProduct () {
      if (this.route === 'put') {
        this.$axios.put('/product/' + this.productId, this.form).then(response => {
          // this.products = response.data
          console.log(this.form)
          this.getProducts()
        })
          .catch((e) => {
            console.log(e)
            this.$q.notify({
              color: 'negative',
              position: 'top',
              message: 'Erro ao editar o produto',
              icon: 'report_problem'
            })
          })
      }
      if (this.route === 'post') {
        this.$axios.post('/product', this.form).then(response => {
          // this.products = response.data
          console.log(this.form)
          this.getProducts()
        })
          .catch((e) => {
            console.log(e)
            this.$q.notify({
              color: 'negative',
              position: 'top',
              message: 'Erro ao criar produto',
              icon: 'report_problem'
            })
          })
      }
    },
    deleteProduct () {
      this.$axios.delete('/product/' + this.productId).then(response => {
        // this.products = response.data
        console.log(response)
        this.getProducts()
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
