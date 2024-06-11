<template>

    <form @submit.prevent="enviarFormulario">
        <h2 v-if="mensagem">{{mensagem}}</h2>
        <label>Escolha um novo perido:</label>
        <input v-model="periodo">
        <span v-if="!periodoValid">Digite um periodo valido</span>
        <br>
        <br>
        <button @click="">Enviar</button>
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
            if(!Validation.isMoreThan(0, this.periodo)) return this.peridoValid = false
            
            this.$emit("enviarFormulario", this.periodo)
        }
    }
}

</script>