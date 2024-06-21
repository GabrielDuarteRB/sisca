<template>
    <form @submit.prevent="enviarFormulario">
      <h2 v-if="mensagem">{{ mensagem }}</h2>
  
      <div class="form-group">
        <label for="selectAluno">Selecione um aluno:</label>
        <select v-model="idAluno" id="selectAluno" class="form-control">
          <option value="">Selecione um aluno</option>
          <option v-for="aluno in alunos" :value="aluno.id_aluno">
            {{ aluno.nome }} - {{ aluno.cpf }}
          </option>
        </select>
        <span v-if="!alunoValid" class="error-message">Escolha um aluno para cadastrar</span>
      </div>
  
      <button type="submit" class="btn btn-primary">Enviar</button>
    </form>
  </template>
  
  <script>
  import Validation from '@/utils/Validation.js'
  import Aluno from "@/service/Aluno.js"
  
  export default {
    data() {
      return {
        alunos: [],
        idAluno: '',
        alunoValid: true
      }
    },
    props: {
      mensagem: String,
    },
    async created() {
      this.alunos = await Aluno.listarAlunos()
    },
    methods: {
      enviarFormulario() {
        if (!Validation.isRequired(this.idAluno)) {
          this.alunoValid = false;
          return;
        }
  
        this.$emit("enviarFormulario", this.idAluno);
      }
    }
  }
  </script>
  
<style scoped>
  form {
    margin: 24px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }

  .form-control {
    width: 96%;
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .error-message {
    color: red;
    font-size: 14px;
    margin-top: 5px;
  }
  
  .btn-primary {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .btn-primary:hover {
    background-color: #0056b3;
  }
</style>
  