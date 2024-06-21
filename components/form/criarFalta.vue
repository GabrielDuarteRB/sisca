<template>
    <form @submit.prevent="enviarFormulario">
      <div class="form-group">
        <label>Data da falta:</label>
        <input v-model="data" type="date" class="form-control">
        <span v-if="!dataValid" class="error-msg">Data escolhida é maior que a atual</span>
      </div>
  
      <button type="submit" class="btn btn-primary">Enviar</button>
    </form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        data: '',
        dataAtual: new Date().toISOString().split('T')[0],
        dataValid: true
      }
    },
    methods: {
      enviarFormulario() {
        const dataSelecionada = new Date(this.data);
        const dataAtual = new Date(this.dataAtual);
  
        if (dataSelecionada > dataAtual) {
          this.dataValid = false;
          return;
        }
  
        this.dataValid = true;
  
        this.$emit("enviarFormulario", {
          falta: this.data
        });
      }
    }
  }
  </script>
  
<style scoped>
  form {
    padding: 24px;
  }

  .form-group {
    margin-bottom: 20px;
  }
  
  .error-msg {
    color: red;
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
  
  .form-control {
    width: 96%;
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  label {
    margin-bottom: 5px;
  }
</style>
  