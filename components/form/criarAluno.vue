<template>
    <div>
        <h2 v-if="mensageToSend" class="success-message">{{ mensageToSend }}</h2>
        <form @submit.prevent="enviarFormulario" class="form-container">
            <div class="form-group">
                <label for="cpf">CPF do Aluno:</label>
                <input id="cpf" v-model="cpf" class="form-control">
                <span v-if="!cpfValid" class="error-message">Digite um CPF válido</span>
            </div>

            <div class="form-group">
                <label for="ano_matricula">Ano de Matrícula:</label>
                <input id="ano_matricula" v-model="ano_matricula" class="form-control">
                <span v-if="!ano_matriculaValid" class="error-message">Digite um ano de matrícula válido</span>
            </div>

            <button type="submit" class="submit-button">Enviar</button>
        </form>
    </div>
</template>

<script>
import Validation from '@/utils/Validation.js';

export default {
    data() {
        return {
            cpf: '',
            cpfValid: true,
            ano_matricula: '',
            ano_matriculaValid: true
        };
    },
    props: {
        mensageToSend: String
    },
    methods: {
        enviarFormulario() {
            if (!this.validForm()) return;

            this.$emit('formularioEnviado', {
                cpf: this.cpf,
                ano_matricula: this.ano_matricula
            });

            this.cleanFields();
        },
        validForm() {
            this.ano_matriculaValid = Validation.isRequired(this.ano_matricula);
            this.cpfValid = Validation.isCPFValid(this.cpf);

            return this.cpfValid && this.ano_matriculaValid;
        },
        cleanFields() {
            this.cpf = '';
            this.cpfValid = true;
            this.ano_matricula = '';
            this.ano_matriculaValid = true;
        }
    }
};
</script>

<style scoped>
.success-message {
    color: green;
}

.error-message {
    color: red;
    font-size: 14px;
}

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

.form-control {
    width: 100%;
    padding: 10px;
    margin-top: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.submit-button {
    background-color: #007bff;
    color: #fff;
    padding: 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
}

.submit-button:hover {
    background-color: #0056b3;
}
</style>
