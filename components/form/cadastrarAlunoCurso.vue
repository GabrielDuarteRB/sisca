<template>
    <form @submit.prevent="enviarFormulario">
        <h2 v-if="mensagem">{{mensagem}}</h2>
        <div>
            <label>Ano de matricula: </label>
            <input v-model="ano_matricula" type="text">
            <br>
            <span v-if="!ano_matriculaValid">Coloque um ano valido</span>
        </div>
        <br>

        <div>
            <select name="" id="" v-model="curso">
                <option value="">Selecione uma opção</option>
                <option v-for="c in cursos" :value="c.id_curso">
                    {{ c.nome }}
                </option>
            </select>
            <br>
            <span v-if="!cursoValid">Coloque um curso valido</span>
        </div>

        <br>
        <button>Cadastrar</button>
    </form>
</template>

<script>

import Cursos from '@/service/Cursos.js'
import Validation from '@/utils/Validation.js'

export default {
    data() {
        return {
            ano_matricula: '',
            ano_matriculaValid: true,
            curso: '',
            cursoValid: true,
            cursos: []
        }
    },
    props: {
        mensagem: String
    },
    async created() {
        this.cursos = await Cursos.listarCursos()
    },
    methods: {
        enviarFormulario() {
            if(!this.validarCampos()) return 

            this.$emit("enviarFormulario", {
                ano_matricula: this.ano_matricula,
                curso: this.curso
            })
        },
        validarCampos() {
            this.cursoValid         = Validation.isRequired(this.curso)
            this.ano_matriculaValid = Validation.isStringLength(this.ano_matricula, 6)

            return this.cursoValid && this.ano_matriculaValid
        },
    }

}

</script>

<style scoped>

form {
    margin: 24px 24px
}

</style>