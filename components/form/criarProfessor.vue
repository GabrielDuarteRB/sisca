<template>
    <form @submit.prevent="enviarFormulario" class="form-container">
  
      <h2>{{ mensagem }}</h2>
      
      <div class="form-group">
        <label for="cpf">Digite o CPF do usuário:</label>
        <input id="cpf" v-model="cpf" class="form-control">
      </div>
  
      <button type="submit" class="submit-button">Enviar</button>
  
    </form>
  </template>
  
  <script>
  import Formatted from '@/utils/Formatted.js'
  import Validation from '@/utils/Validation.js'
  
  export default {
    data() {
      return {
        cpf: '',
        mensagem: ''
      }
    },
    props: {
      usuarios: Array
    },
    methods: {
      enviarFormulario() {
        const professor = this.professorAchadoEValido()[0]
  
        if (!professor || !Validation.isCPFValid(this.cpf)) {
          this.mensagem = 'CPF inválido ou usuário sem role Professor'
          setTimeout(() => {
            this.mensagem = ''
          }, 3000)
          return
        }
  
        this.$emit("enviarFormulario", professor)
      },
      professorAchadoEValido() {
        const cpfFormatted = Formatted.limparCaracteres(this.cpf, ".()- ")
        return this.usuarios.filter(usuario => usuario.cpf === cpfFormatted && usuario.role === "PROFESSOR");
      }
    }
  }
  </script>
  
  <style scoped>
  .form-container {
    margin: 24px;
  }
  
  .form-group {
    margin-bottom: 16px;
  }
  
  .form-control {
    width: 100%;
    padding: 8px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .submit-button {
    background-color: #007bff;
    color: #fff;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
  }
  
  .submit-button:hover {
    background-color: #0056b3;
  }
  
  </style>
  