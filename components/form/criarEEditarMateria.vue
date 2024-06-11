<template>
    <form @submit.prevent="enviarFormulario">
        <h2 v-if="mensagem">{{mensagem}}</h2>

        <label for="">Digite o nome da Materia:</label>

        <input type="text" v-model="materia">

        <span v-if="!materiaValid">Nome da materia obrigatorio</span>

        <br>
        <br>
        <button>Enviar</button>
    </form>
</template>

<script>

import Validation from '@/utils/Validation.js'

export default {
    data() {
        return {
            materia: '',
            materiaValid: true
        }
    },
    props: {
        mensagem: String,
        materiaProp: Object
    },
    mounted() {
        this.materia = this.materiaProp ? this.materiaProp.nome : '' 
        console.log(this.materiaProp)
    },
    methods: {
        enviarFormulario() {
            if(!Validation.isRequired(this.materia)) return this.materiaValid = false


            this.$emit("enviarFormulario", {
                nome: this.materia
            })
        }
    }
}

</script>

<style scoped>

form {
    margin: 24px;
}

</style>