<template>
    <Modal @fecharModal="fecharModal">
        <h2>{{frase}}</h2>

        <button @click="() => enviarResposta(true)">SIM</button>
        <button @click="() => enviarResposta(false)">NÃO</button>
    </Modal>
</template>

<script>

export default {
    props: {
        frase: String
    },
    methods: {
        enviarResposta(value) {
            this.$emit("enviarResposta", value)
        },
        fecharModal() {
            this.$emit("fecharModal")
        }
    }
}

</script>