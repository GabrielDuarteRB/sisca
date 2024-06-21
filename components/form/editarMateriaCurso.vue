<template>
    <form class="modal-form" @submit.prevent="enviarFormulario">
      <h2 v-if="mensagem" class="modal-title">{{ mensagem }}</h2>
      
      <div class="form-group">
        <label for="periodo">Escolha um novo período:</label>
        <input id="periodo" v-model="periodo" type="text">
        <span v-if="!periodoValid" class="error-message">Digite um período válido</span>
      </div>

      <button class="btn-submit">Enviar</button>
    </form>
</template>
  
<script>
import Validation from '@/utils/Validation'

export default {
  data() {
    return {
      periodo: '',
      periodoValid: true
    }
  },
  props: {
    mensagem: String
  },
  methods: {
    enviarFormulario() {
      this.periodoValid = !Validation.isMoreThan(this.periodo, 0)

      if (!this.periodoValid) return;

      this.$emit("enviarFormulario", this.periodo)
    }
  }
}
</script>

<style scoped>
.modal-form {
  max-width: 400px;
  padding: 20px;
}

.modal-title {
  font-size: 1.5rem;
  margin-bottom: 10px;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.error-message {
  color: red;
  font-size: 0.875rem;
}

.btn-submit {
  background-color: #007bff;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-submit:hover {
  background-color: #0056b3;
}
</style>
