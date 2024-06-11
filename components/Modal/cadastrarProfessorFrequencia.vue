<template>
    <Modal @fecharModal="fecharModal">
        
        <div>
            <label>Selecione um dia para marcar frequencia</label>
            <br>
            <input v-model="dia" type="date">
        </div>

        <button @click="enviarFrequencia">Enviar</button>
    </Modal>
</template>

<script>

export default {
    data() {
        return {
            dia: ''
        }
    },
    methods: {
        enviarFrequencia() {
            this.$emit('cadastrarFrequencia', this.dia)
        },
        fecharModal() {
            this.$emit("fecharModal");
        },
    }
}
</script>

