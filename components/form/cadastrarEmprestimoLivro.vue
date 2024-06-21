<template>
    <form @submit.prevent="enviarFormulario" class="form-container">

        <div class="form-group">
            <label for="aluno">Aluno:</label>
            <select id="aluno" v-model="aluno">
                <option value="">Escolha um aluno</option>
                <option v-for="a in alunoOptions" :value="a.matricula_aluno">{{a.nome}}</option>
            </select>
            <span class="error-message" v-if="!alunoValid">Escolha um aluno válido</span>
        </div>

        <div class="form-group">
            <label for="livro">Livro:</label>
            <select id="livro" v-model="livro">
                <option value="">Escolha um livro</option>
                <option v-for="l in livroOptions" :value="l.id_livro">{{l.titulo}}</option>
            </select>
            <span class="error-message" v-if="!livroValid">Escolha um livro válido</span>
        </div>

        <div class="form-group">
            <label for="dataEmprestimo">Data empréstimo:</label>
            <input id="dataEmprestimo" type="date" v-model="dataEmprestimo">
            <span class="error-message" v-if="!dataEmprestimoValid">Adicione uma data válida</span>
        </div>

        <div class="form-group">
            <label for="dataRetorno">Data retorno:</label>
            <input id="dataRetorno" type="date" v-model="dataRetorno">
            <span class="error-message" v-if="!dataRetornoValid">Adicione uma data válida</span>
        </div>

        <button class="btn-submit">Enviar</button>
    </form>
</template>

<script>
import Validation from '@/utils/Validation'
import Aluno from '@/service/Aluno.js'
import Livro from '@/service/Livro.js'

export default {
    data() {
        return {
            alunoOptions: [],
            livroOptions: [],
            aluno: "",
            alunoValid: true,
            livro: "",
            livroValid: true,
            dataEmprestimo: "",
            dataEmprestimoValid: true,
            dataRetorno: "",
            dataRetornoValid: true
        }
    },
    async created() {
        this.alunoOptions = await Aluno.listarAlunos()
        this.livroOptions = await Livro.buscarLivros()
    },
    methods: {
        enviarFormulario() {
            if(this.validar()) return

            this.$emit("enviarFormulario", {
                idLivro: this.livro,
                idUsuario: this.aluno,
                emprestado: this.dataEmprestimo,
                limiteEmprestimo: this.dataRetorno
            })
        },
        validar() {
            this.livroValid = Validation.isRequired(this.livro)
            this.alunoValid = Validation.isRequired(this.aluno)
            this.dataEmprestimoValid = Validation.isRequired(this.dataEmprestimo)
            this.dataRetornoValid = Validation.isRequired(this.dataRetorno)
            
            return !this.alunoValid || !this.livroValid || !this.dataEmprestimoValid || !this.dataRetornoValid
        }
    }
}
</script>

<style scoped>
.form-container {
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
}

input[type="text"],
input[type="date"] {
    width: 96%;
}

input[type="text"],
input[type="date"],
select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.error-message {
    color: red;
    font-size: 0.85em;
}

.btn-submit {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
}

.btn-submit:hover {
    background-color: #0056b3;
}
</style>
