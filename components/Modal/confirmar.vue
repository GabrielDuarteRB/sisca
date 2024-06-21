<template>
    <Modal @fecharModal="fecharModal">
        <div class="modal-content">
            <h2>{{ frase }}</h2>
            <div class="button-container">
                <button class="confirm-button" @click="() => enviarResposta(true)">SIM</button>
                <button class="cancel-button" @click="fecharModal">NÃO</button>
            </div>
        </div>
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

<style scoped>
.modal-content {
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
}

.button-container {
    margin-top: 20px;
}

.confirm-button, .cancel-button {
    padding: 10px 20px;
    margin: 0 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s ease;
}

.confirm-button {
    background-color: #007bff;
    color: white;
}

.cancel-button {
    background-color: #dc3545;
    color: white;
}

.confirm-button:hover, .cancel-button:hover {
    opacity: 0.8;
}
</style>
