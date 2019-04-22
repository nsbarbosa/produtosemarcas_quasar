<template>
  <q-page>
    <div class="full-width">
      <div class="layout-padding">
        <q-field icon="face">
          <q-input placeholder="Seu nome" class="full-width" v-model="form.name"/>
        </q-field>
        <q-field icon="mail" error-label="Insira um email válido">
          <q-input placeholder="Seu email" class="full-width" v-model="form.email"/>
        </q-field>
        <q-field icon="vpn_key">
          <q-input type="password" placeholder="Sua senha" class="full-width" v-model="form.password"/>
        </q-field>

        <div class="submit row reverse">
          <q-btn color="primary" @click="submitForm()">Criar</q-btn>
        </div>
      </div>
    </div>
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
        email: '',
        password: ''
      }
    }
  },
  methods: {
    submitForm () {
      this.$axios.post('/user', this.form).then(response => {
        console.log(response.data)
        this.$q.sessionStorage.set('logado', 'sim')
        // let value = this.$q.sessionStorage.get.item(key)
        this.$q.notify({
          color: 'positive',
          position: 'top',
          message: 'Cadastro realizado com sucesso',
          icon: 'check'
        })
        this.$router.push('/')
      })
        .catch(() => {
          this.$q.notify({
            color: 'negative',
            position: 'top',
            message: 'Erro ao realizar cadastro',
            icon: 'report_problem'
          })
        })
    }
  }
}
</script>
