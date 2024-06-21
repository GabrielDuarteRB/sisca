<template>
    <form @submit.prevent="enviarFormulario" class="form-container">
        <label for="tipo">Nome do tipo</label>
        <input type="text" id="tipo" v-model="tipo" class="form-input">
        <br>
        <span v-if="!tipoValid" class="error-message">Esse campo é obrigatório</span>

        <br>
        <br>
        <button class="form-button">Enviar</button>
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
            if (!this.tipo) {
                this.tipoValid = false;
                return;
            }

            this.$emit("enviarFormulario", {
                nome: this.tipo
            });
        }
    }
}
</script>

<style scoped>
.form-container {
    max-width: 400px;
    margin: 20px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-input {
    width: 100%;
    padding: 10px;
    margin-top: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

.error-message {
    color: red;
}

.form-button {
    background-color: #007bff;
    color: #fff;
    padding: 8px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.form-button:hover {
    background-color: #0056b3;
}
</style>
