<template>
    <form @submit.prevent="enviarFormulario">
        <label for="">Nome do tipo</label>
        <input type="text" v-model="tipo">
        <br>
        <span v-if="!tipoValid">Esse campo é obrigatorio</span>

        <br>
        <br>
        <button>Enviar</button>
    </form>
</template>

<script>

export default {
    data() {
        return {
            tipo: '',
            tipoValid: true
        }
    },
    methods: {
        enviarFormulario() {
            if(!this.tipo) return this.tipoValid = false

            this.$emit("enviarFormulario", {
                nome: this.tipo
            })
        }
    }
}

</script>