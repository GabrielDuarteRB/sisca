<template>
    <div class="form-container">
      <h2 v-if="mensageToSend">{{mensageToSend}}</h2>
      <form @submit.prevent="enviarFormulario">
        <div class="form-group">
          <label for="nome">Nome:</label>
          <input v-model="nome" type="text" name="nome" id="nome" class="form-control" />
          <span v-if="!nomeValid" class="error-message">Digite um nome válido</span>
        </div>
  
        <div class="form-group" v-if="!esconderCampoSenha">
          <label for="senha">Senha:</label>
          <input v-model="senha" type="password" name="senha" id="senha" class="form-control" />
          <span v-if="!senhaValid && !esconderCampoSenha" class="error-message">Digite uma senha com mais de 6 dígitos</span>
        </div>
  
        <div class="form-group">
          <label for="cpf">CPF:</label>
          <input v-model="cpf" type="text" name="cpf" id="cpf" class="form-control" />
          <span v-if="!cpfValid" class="error-message">Digite um CPF válido</span>
        </div>
  
        <div class="form-group">
          <label for="email">Email:</label>
          <input v-model="email" type="email" name="email" id="email" class="form-control" />
          <span v-if="!emailValid" class="error-message">Digite um email válido</span>
        </div>
  
        <div class="form-group">
          <label for="telefone">Telefone:</label>
          <input v-model="telefone" type="text" name="telefone" id="telefone" class="form-control" />
          <span v-if="!telefoneValid" class="error-message">Digite um telefone válido</span>
        </div>
  
        <div class="form-group">
          <label for="data_nascimento">Data de nascimento:</label>
          <input v-model="data_nascimento" type="text" name="data_nascimento" id="data_nascimento" class="form-control" />
          <span v-if="!dataNascimentoValid" class="error-message">Digite uma data válida</span>
        </div>
  
        <div class="form-group">
          <label for="cargo">Cargo:</label>
          <select v-model="cargo" class="form-control">
            <option value="">Escolha um cargo</option>
            <option value="ALUNO">ALUNO</option>
            <option value="TECNICO">TECNICO</option>
            <option value="BIBLIOTECARIO">BIBLIOTECARIO</option>
            <option value="ALMOXARIFE">ALMOXARIFE</option>
            <option value="PROFESSOR">PROFESSOR</option>
          </select>
          <span v-if="!cargoValid" class="error-message">Selecione um cargo</span>
        </div>
  
        <button type="submit" class="submit-button">Enviar</button>
      </form>
    </div>
</template>

<script>
import Validation from '@/utils/Validation.js';
import Formatted from '@/utils/Formatted.js';

export default {
  data() {
    return {
      nome: '',
      nomeValid: true,
      senha: '',
      senhaValid: true,
      cpf: '',
      cpfValid: true,
      email: '',
      emailValid: true,
      telefone: '',
      telefoneValid: true,
      data_nascimento: '',
      dataNascimentoValid: true,
      cargo: '',
      cargoValid: true
    };
  },
  props: {
    nomeProps: String,
    senhaProps: String,
    cpfProps: String,
    emailProps: String,
    telefoneProps: String,
    dataNascimentoProps: String,
    roleProps: String,
    mensageToSend: String,
    esconderCampoSenha: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.nome = this.nomeProps || this.nome;
    this.cpf = this.cpfProps ? Formatted.formatarCpfColocarPontuacao(this.cpfProps) : this.cpf;
    this.email = this.emailProps || this.email;
    this.telefone = this.telefoneProps || this.telefone;
    this.data_nascimento = this.dataNascimentoProps ? Formatted.formatarDataParaBr(this.dataNascimentoProps) : this.data_nascimento;
    this.cargo = this.roleProps || this.cargo;
  },
  methods: {
    enviarFormulario() {
      if (!this.validForm()) return;

      console.log('enviado');

      this.$emit('formularioEnviado', {
        nome: this.nome,
        senha: this.senha,
        cpf: this.cpf,
        email: this.email,
        telefone: this.telefone,
        data_nascimento: this.data_nascimento,
        role: this.cargo
      });
      this.cleanFields();
    },
    validForm() {
      this.nomeValid = Validation.isRequired(this.nome);
      this.senhaValid = this.esconderCampoSenha ? true : Validation.isPasswordValid(this.senha);
      this.cpfValid = Validation.isCPFValid(this.cpf);
      this.emailValid = Validation.isEmailValid(this.email);
      this.telefoneValid = Validation.isPhoneValid(this.telefone);
      this.dataNascimentoValid = Validation.isDataValid(this.data_nascimento);
      this.cargoValid = Validation.isRequired(this.cargo);

      return (
        this.nomeValid &&
        this.senhaValid &&
        this.cpfValid &&
        this.emailValid &&
        this.telefoneValid &&
        this.dataNascimentoValid &&
        this.cargoValid
      );
    },
    cleanFields() {
      this.nome = '';
      this.nomeValid = true;
      this.senha = '';
      this.senhaValid = true;
      this.cpf = '';
      this.cpfValid = true;
      this.email = '';
      this.emailValid = true;
      this.telefone = '';
      this.telefoneValid = true;
      this.data_nascimento = '';
      this.dataNascimentoValid = true;
      this.cargo = '';
      this.cargoValid = true;
    }
  }
};
</script>

<style scoped>
.form-container {
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 16px;
}

.form-control {
  width: 100%;
  padding: 10px;
  margin-top: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.error-message {
  color: red;
  font-size: 14px;
  margin-top: 4px;
}

.submit-button {
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.submit-button:hover {
  background-color: #0056b3;
}

h2 {
  color: green;
  text-align: center;
}
</style>
