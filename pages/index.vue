<template>
  <div class="container-login">
    <Form @enviarFormulario="fazerLogin" class="formulario">
      <div class="formulario-div">
        <label >CPF:</label>
        <input v-model="cpf" type="text" placeholder="12345678912">
      </div>

      <div class="formulario-div">
        <label >Senha:</label>
        <input v-model="senha" :type="tipoSenha">
        <img @click="mudarTipoSenha" v-if="tipoSenha == 'password'"class="icone" src="../assets/icons/olho-fechado.png" alt="Olho Fechado">
        <img @click="mudarTipoSenha" v-else class="icone" src="../assets/icons/olho-aberto.png" alt="Olho Aberto">
      </div>
      

      <span class="error" v-if="!loginValid">Cpf ou senha invalidos</span>

      <br>

      <Button :texto="'Entrar'" />
    </Form>
  </div>
</template>

<script>

import Usuario from '@/service/Usuario.js'
import LocalStorage from '@/utils/LocalStorage.js'

export default {
  data() {
    return {
      cpf: '',
      senha: '',
      loginValid: true,
      tipoSenha: 'password'
    }
  },
  mounted() {
    const id = LocalStorage.pegarIdUsuario()
    if(id) {
      this.$router.replace({ path: '/escolher' })
    }
  },
  methods: {
    async fazerLogin() {
      const usuario = await Usuario.fazerLogin({
        cpf: this.cpf,
        senha: this.senha
      })
      this.loginValid = true

      if(usuario) {
        LocalStorage.adicionarUsuario(usuario.id_usuario)

        this.$router.replace({ path: '/escolher' })
      } else {
        this.loginValid = false
      }
    },
    mudarTipoSenha() {
      this.tipoSenha = this.tipoSenha == 'password' ? 'text' : 'password'
    } 
  }
}
</script>

<style scoped>

body {
  margin: 0;
  padding: 0;
}

.container-login {
  background-color: #ADD8E6;
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: center;
  padding: 0;
  margin: auto;
  width: 100%;
}

.formulario {
  background-color: #fff0f0;
  border-radius: 24px;
  padding: 32px 64px 64px 64px;
}

.formulario-div {
  display: flex;
  flex-direction: column;
  gap: 4px;
  position: relative;
  margin-bottom: 24px
}

.formulario-div:last-child {
  margin-bottom: 0px;
}

.icone {
  cursor: pointer;
  position: absolute;
  right: 8px;
  top: 50%;
  width: 25px;
}

button {
  margin-top: 16px
}

.error {
  color: red;
}

</style>