<template>
    <form @submit.prevent="enviarFormulario" class="formulario-materia">
        <h2 v-if="mensagem">{{ mensagem }}</h2>

        <label for="nome-materia">Digite o nome da Matéria:</label>
        <input id="nome-materia" type="text" v-model="materia">
        <span v-if="!materiaValid">Nome da matéria é obrigatório</span>

        <br><br>
        <button type="submit">Enviar</button>
    </form>
</template>

<script>
import Validation from '@/utils/Validation.js';

export default {
    data() {
        return {
            materia: '',
            materiaValid: true
        };
    },
    props: {
        mensagem: String,
        materiaProp: Object
    },
    mounted() {
        this.materia = this.materiaProp ? this.materiaProp.nome : '';
    },
    methods: {
        enviarFormulario() {
            if (!Validation.isRequired(this.materia)) {
                this.materiaValid = false;
                return;
            }

            this.$emit("enviarFormulario", {
                nome: this.materia
            });
        }
    }
};
</script>


<style scoped>
.formulario-materia {
    margin: 24px;
}

label {
    font-weight: bold;
}

input {
    width: 100%;
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

span {
    color: red;
    margin-top: 4px;
    display: block;
}

button {
    background-color: #007bff;
    color: #fff;
    padding: 8px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

button:hover {
    background-color: #0056b3;
}
</style>
