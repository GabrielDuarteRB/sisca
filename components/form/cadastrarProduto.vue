<template>
    <div class="form-container">
        <form @submit.prevent="enviarFormulario" class="form">
            <div class="form-group">
                <label for="nome">Nome:</label>
                <input type="text" id="nome" v-model="nome" class="form-control">
            </div>
            <span v-if="!nomeValid" class="error-message">Nome obrigatório!</span>

            <div class="form-group">
                <label for="tipoProduto">Tipo de Produto:</label>
                <select id="tipoProduto" v-model="tipoProduto" class="form-control">
                    <option value="">Escolha um tipo de produto</option>
                    <option v-for="t in tipoProdutoOptions" :value="t.id_tipo_produto" :key="t.id_tipo_produto">
                        {{t.nome}}
                    </option>
                </select>
            </div>
            <span v-if="!tipoProdutoValid" class="error-message">Tipo de produto obrigatório!</span>

            <button type="submit" class="btn-submit">Enviar</button>
        </form>
    </div>
</template>

<script>
import TipoProduto from '@/service/TipoProduto.js'
import Validation from '@/utils/Validation.js'

export default {
    data() {
        return {
            nome: '',
            nomeValid: true,
            tipoProdutoOptions: [],
            tipoProduto: '',
            tipoProdutoValid: true
        }
    },
    async created() {
        this.tipoProdutoOptions = await TipoProduto.listarTipoProdutos()
    },
    methods: {
        enviarFormulario() {
            if (!this.validar()) return

            this.$emit("enviarFormulario", {
                nome: this.nome,
                id_tipo_produto: this.tipoProduto
            })
        },
        validar() {
            this.nomeValid = Validation.isRequired(this.nome)
            this.tipoProdutoValid = Validation.isRequired(this.tipoProduto)

            return this.nomeValid && this.tipoProdutoValid
        }
    }
}
</script>

<style scoped>
.form-container {
    max-width: 500px;
    margin: 20px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form {
    display: flex;
    flex-direction: column;
}

.form-group {
    margin-bottom: 15px;
}

label {
    font-weight: bold;
}

.form-control {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.error-message {
    color: red;
    font-size: 14px;
}

.btn-submit {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 4px;
    cursor: pointer;
}

.btn-submit:hover {
    background-color: #0056b3;
}
</style>
