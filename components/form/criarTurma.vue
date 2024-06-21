<template>
    <div class="form-container">
      <form @submit.prevent="enviarFormulario">
        <h2 v-if="mensagem">{{ mensagem }}</h2>
  
        <div class="form-group">
          <label>Escolha um período:</label>
          <input v-model="periodo" class="form-input">
          <span v-if="!periodoValid" class="error-message">Digite um período válido (Ex.: 2020.1)</span>
        </div>
  
        <div class="form-group">
          <label>Selecione um professor:</label>
          <select v-model="professor" class="form-select">
            <option value=''>Selecione um professor</option>
            <option v-for="p in professorArray" :value="p.id_funcionario" :key="p.id_funcionario">
              {{ p.nome }}
            </option>
          </select>
          <span v-if="!professorValid" class="error-message">Selecione um professor</span>
        </div>
  
        <div class="form-group">
          <label>Selecione uma matéria:</label>
          <select v-model="materia" class="form-select">
            <option value=''>Selecione uma matéria</option>
            <option v-for="m in materiaArray" :value="m.id_materia" :key="m.id_materia">
              {{ m.nome }}
            </option>
          </select>
          <span v-if="!materiaValid" class="error-message">Selecione uma matéria</span>
        </div>
  
        <button class="form-button">Enviar</button>
      </form>
    </div>
  </template>
  
  <script>
  import Validation from '@/utils/Validation'
  import Professor from '@/service/Professor.js'
  import Materia from '@/service/Materia.js'
  
  export default {
    data() {
      return {
        periodo: '',
        periodoValid: true,
        professor: '',
        professorValid: true,
        materia: '',
        materiaValid: true,
        professorArray: [],
        materiaArray: []
      }
    },
    props: {
      mensagem: String,
      turma: Object
    },
    async created() {
      this.professorArray = await Professor.listarProfessores()
      this.materiaArray = await Materia.listarMaterias()
    },
    mounted() {
      if (this.turma) {
        this.periodo = this.turma.semestre_turma
        this.materia = this.turma.id_materia
        this.professor = this.turma.id_funcionario
      }
    },
    methods: {
      enviarFormulario() {
        if (this.validador()) return
  
        this.$emit("enviarFormulario", {
          id_funcionario: this.professor,
          id_materia: this.materia,
          semestre_turma: this.periodo,
        })
      },
      validador() {
        this.periodoValid = Validation.isMoreThan(0, this.periodo)
        this.professorValid = Validation.isRequired(this.professor)
        this.materiaValid = Validation.isRequired(this.materia)
  
        return !this.periodoValid || !this.professorValid || !this.materiaValid
      }
    }
  }
  </script>
  
  <style scoped>
  .form-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-group label {
    font-weight: bold;
    display: block;
    margin-bottom: 8px;
  }

  .form-group > .form-input {
    width: 96%;
  }
  
  .form-input,
  .form-select {
    width: 100%;
    padding: 10px;
    margin-top: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .error-message {
    color: red;
    font-size: 0.9em;
    margin-top: 5px;
  }
  
  .form-button {
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .form-button:hover {
    background-color: #0056b3;
  }
</style>
  