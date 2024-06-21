<template>
    <form class="modal-form" @submit.prevent="enviarFormulario">
        <h2 v-if="mensagem" class="modal-message">{{ mensagem }}</h2>

        <div class="form-group">
            <label for="ano_matricula">Ano de matrícula:</label>
            <input id="ano_matricula" v-model="ano_matricula" type="text" class="form-control">
            <span v-if="!ano_matriculaValid" class="error-message">Digite um ano válido</span>
        </div>

        <div class="form-group">
            <label for="curso">Curso:</label>
            <select id="curso" v-model="curso" class="form-control">
                <option value="">Selecione uma opção</option>
                <option v-for="c in cursos" :value="c.id_curso">{{ c.nome }}</option>
            </select>
            <span v-if="!cursoValid" class="error-message">Selecione um curso válido</span>
        </div>

        <button type="submit" class="modal-button">Cadastrar</button>
    </form>
</template>

<script>
import Cursos from '@/service/Cursos.js';
import Validation from '@/utils/Validation.js';

export default {
    data() {
        return {
            ano_matricula: '',
            ano_matriculaValid: true,
            curso: '',
            cursoValid: true,
            cursos: []
        };
    },
    props: {
        mensagem: String
    },
    async created() {
        this.cursos = await Cursos.listarCursos();
    },
    methods: {
        enviarFormulario() {
            if (!this.validarCampos()) return;

            this.$emit("enviarFormulario", {
                ano_matricula: this.ano_matricula,
                curso: this.curso
            });
        },
        validarCampos() {
            this.cursoValid = Validation.isRequired(this.curso);
            this.ano_matriculaValid = Validation.isStringLength(this.ano_matricula, 6);

            return this.cursoValid && this.ano_matriculaValid;
        }
    }
};
</script>

<style scoped>
.modal-form {
    margin: 24px;
    padding: 16px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.modal-message {
    color: #ff0000;
    margin-bottom: 16px;
}

.form-group {
    margin-bottom: 16px;
}

label {
    font-weight: bold;
}

.form-control {
    width: 96%;
    padding: 8px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.error-message {
    color: #ff0000;
    font-size: 12px;
}

.modal-button {
    background-color: #007bff;
    color: #fff;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.modal-button:hover {
    background-color: #0056b3;
}
</style>
