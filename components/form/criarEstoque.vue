<template>
    <div class="transacao-estoque-container">
        <form @submit.prevent="enviarFormulario" class="transacao-form">
            <div class="form-group">
                <label for="produto">Escolha um produto:</label>
                <select v-model="produto" id="produto" class="select-input">
                    <option value="">Escolha um produto</option>
                    <option v-for="p in produtoOptions" :value="p.id_produto">{{ p.nome }}</option>
                </select>
                <span v-if="!produtoValid" class="error-message">Escolha um produto</span>
            </div>

            <div class="form-group">
                <label for="funcionario">Escolha um funcionário:</label>
                <select v-model="funcionario" id="funcionario" class="select-input">
                    <option value="">Escolha um funcionário</option>
                    <option v-for="f in funcionarioOptions" :value="f.id_funcionario">{{ f.nome }}</option>
                </select>
                <span v-if="!funcionarioValid" class="error-message">Escolha um funcionário</span>
            </div>

            <div class="form-group">
                <label for="quantidade">Quantidade:</label>
                <input type="text" v-model="quantidade" id="quantidade" class="text-input">
                <span v-if="!quantidadeValid" class="error-message">Quantidade é obrigatória</span>
            </div>

            <div class="form-group">
                <label for="dataTransacao">Data:</label>
                <input type="date" v-model="dataTransacao" id="dataTransacao" class="text-input">
                <span v-if="!dataTransacaoValid" class="error-message">Data é obrigatória</span>
            </div>

            <div class="form-group">
                <label for="descricao">Descrição:</label>
                <textarea v-model="descricao" id="descricao" class="textarea-input"></textarea>
                <span v-if="!descricaoValid" class="error-message">Descrição é obrigatória</span>
            </div>

            <button type="submit" class="submit-button">Enviar</button>
        </form>
    </div>
</template>

<script>
import Produto from '@/service/Produto.js'
import Almoxarifado from '@/service/Almoxarifado.js'
import Validation from '@/utils/Validation'

export default {
    data() {
        return {
            funcionarioOptions: [],
            produtoOptions: [],
            produto: '',
            produtoValid: true,
            funcionario: '',
            funcionarioValid: true,
            quantidade: '',
            quantidadeValid: true,
            dataTransacao: '',
            dataTransacaoValid: true,
            descricao: '',
            descricaoValid: true
        }
    },
    async created() {
        this.funcionarioOptions = await Almoxarifado.listarAlmoxarifado()
        this.produtoOptions = await Produto.buscarProdutos() 
    },
    methods: {
        enviarFormulario() {
            if(!this.validar()) return

            this.$emit("enviarFormulario", {
                idProduto: this.produto,
                idFuncionario: this.funcionario,
                quantidade: this.quantidade,
                dataTransacao: this.dataTransacao,
                descricao: this.descricao
            })
        },
        validar() {
            this.produtoValid = Validation.isRequired(this.produto)
            this.funcionarioValid = Validation.isRequired(this.funcionario)
            this.quantidadeValid = Validation.isRequired(this.quantidade)
            this.dataTransacaoValid = Validation.isRequired(this.dataTransacao)
            this.descricaoValid = Validation.isRequired(this.descricao)

            return this.produtoValid && this.funcionarioValid && this.quantidadeValid &&  this.dataTransacaoValid && this.descricaoValid
        }
    }
}
</script>

<style scoped>
.transacao-estoque-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.transacao-form {
    display: flex;
    flex-direction: column;
}

.form-group {
    margin-bottom: 15px;
}

.label {
    font-weight: bold;
}

.form-group > .text-input,
.form-group > .textarea-input {
    width: 96%;
}

.select-input,
.text-input,
.textarea-input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.error-message {
    color: red;
    font-size: 14px;
}

.submit-button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
}

.submit-button:hover {
    background-color: #0056b3;
}

</style>
