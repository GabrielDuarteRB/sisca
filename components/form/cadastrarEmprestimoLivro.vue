<template>
    <form @submit.prevent="enviarFormulario">

        <select name="" id="" v-model="aluno">
            <option value="">Escolha um aluno</option>
            <option v-for="a in alunoOptions" :value="a.matricula_aluno">{{a.nome}}</option>
        </select>
        <span v-if="!alunoValid">Escolha um aluno valido</span>

        <br>
        <br>
        <select name="" id="" v-model="livro">
            <option value="">Escolha um livro</option>
            <option v-for="l in livroOptions" :value="l.id_livro">{{l.titulo}}</option>
        </select>
        <span v-if="!livroValid">Escolha um livro valido</span>

        <br>
        <br>

        <div>
            <label for="">Data emprestimo</label>
            <input type="date" v-model="dataEmprestimo">
        </div>
        <span v-if="!dataEmprestimoValid">Adicione uma data valida</span>

        <div>
            <label for="">Data retorno</label>
            <input type="date" v-model="dataRetorno">
        </div>
        <span v-if="!dataRetornoValid">Adicione uma data valida</span>


        <button>Enviar</button>
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
                idUsuario:  this.aluno,
                emprestado: this.dataEmprestimo,
                limiteEmprestimo: this.dataRetorno
            })
        },
        validar() {
            this.livroValid = Validation.isRequired(this.livro)
            this.alunoValid = Validation.isRequired(this.aluno)
            this.dataEmprestimoValid = Validation.isRequired(this.dataEmprestimo)
            this.dataRetornoValid = Validation.isRequired(this.dataRetorno)
            
            return !this.alunoValid || !this.livroValid || !this.dataEmprestimoValid ||  !this.dataEmprestimoValid || !this.dataRetornoValid

        }
    }
}

</script>