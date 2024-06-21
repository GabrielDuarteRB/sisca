<template>
    <form @submit.prevent="enviarFormulario" class="curso-form">
      <h3 v-if="mensagem" class="mensagem">{{ mensagem }}</h3>
      
      <div class="form-group">
        <label for="nomeCurso">Nome do curso</label>
        <input id="nomeCurso" v-model="nome" class="form-control" />
        <span v-if="nomeValid" class="error">{{ nomeValid }}</span>
      </div>
  
      <div class="form-group">
        <label for="periodos">Períodos</label>
        <input id="periodos" v-model="periodos" @input="permitirApenasNumeros" class="form-control" />
        <span v-if="periodosValid" class="error">{{ periodosValid }}</span>
      </div>
  
      <button type="submit" class="btn-submit">Enviar</button>
    </form>
</template>

<script>
import Validation from '@/utils/Validation.js'

export default {
  data() {
    return {
      nome: '',
      nomeValid: '',
      periodos: 0,
      periodosValid: ''
    }
  },
  props: {
    sucesso: Boolean,
    mensagem: String,
    nomeProps: String,
    periodosProps: Number
  },
  mounted() {
    this.nome = this.nomeProps ? this.nomeProps : ''
    this.periodos = this.periodosProps ? this.periodosProps : 0
  },
  methods: {
    enviarFormulario() {
      if (this.validarFormulario()) return;

      this.$emit('enviarFormulario', {
        nome: this.nome,
        periodos: parseInt(this.periodos)
      })
    },
    validarFormulario() {
      this.nomeValid = Validation.isRequired(this.nome) ? '' : 'Nome é obrigatório'
      this.periodosValid = Validation.isMoreThan(this.periodos, 4) ? 'Quantidade de períodos mínima é 4' : ''

      return this.nomeValid !== '' || this.periodosValid !== ''
    },
    permitirApenasNumeros(event) {
      const valor = event.target.value;
      const valorApenasNumeros = valor.replace(/\D/g, '');
      this.periodos = valorApenasNumeros;
    },
    limparCampos() {
      this.nome = ''
      this.nomeValid = ''
      this.periodos = ''
      this.periodosValid = ''
    }
  },
  watch: {
    sucesso(newVal) {
      if (newVal) this.limparCampos()
    }
  }
}
</script>

<style scoped>
.curso-form {
  padding: 20px;
  width: 300px;
}

.mensagem {
  margin-bottom: 10px;
  color: #007bff;
}

.form-group {
  margin-bottom: 15px;
}

.form-control {
    width: 100%;
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

label {
  font-weight: bold;
}

.input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.error {
  color: red;
  font-size: 0.875em;
  margin-top: 5px;
}

.btn-submit {
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-submit:hover {
  background-color: #0056b3;
}

</style>
