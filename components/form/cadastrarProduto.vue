<template>
    <div>
        <form @submit.prevent="enviarFormulario">
            <div>
                <label>Nome:</label>
                <input type="text" v-model="nome">
            </div>
            <span v-if="!nomeValid">Nome obrigatorio!</span>
            <br>

            <div>
                <select v-model="tipoProduto">
                    <option value="">Escolha um tipo de produto</option>
                    <option v-for="t in tipoProdutoOptions" :value="t.id_tipo_produto" :key=t.id_tipo_produto>
                        {{t.nome}}
                    </option>
                </select>
            </div>
            <span v-if="!tipoProdutoValid">Tipo de produto obrigatorio!</span>
            <br>

            <button>Enviar</button>
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
            if(!this.validar()) return

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