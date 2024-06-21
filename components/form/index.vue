<template>
    <form @submit.prevent="enviarFormulario">
        <slot/>
    </form>
</template>

<script>

export default {
    methods: {
        enviarFormulario() {
            this.$emit("enviarFormulario")
        }
    }
}

</script>

<style scoped>

input {
    border: 1px solid #008000;
    border-radius: 24px;
    height: 30px;
    width: 150px;
}

input:focus {
    border: 1px solid #00cc00;
}

</style>