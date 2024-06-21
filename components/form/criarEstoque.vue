<template>
    <div>
        <form @submit.prevent="enviarFormulario">
            <div>
                <select v-model="produto">
                    <option value="">Escolha um produto</option>
                    <option 
                        v-for="p in produtoOptions" 
                        :value="p.id_produto"
                    >
                        {{ p.nome }}
                    </option>
                </select>
            </div>

            <div>
                <select v-model="funcionario">
                    <option value="">Escolha um funcionario</option>
                    <option 
                        v-for="f in funcionarioOptions" 
                        :value="f.id_funcionario"
                    >
                        {{ f.nome }}
                    </option>
                </select>
            </div>

            <div>
                <label>Quantidade: </label>
                <br>
                <input type="text" v-model=quantidade>
            </div>

            <div>
                <label>data: </label>
                <br>
                <input type="date" v-model="dataTransacao">
            </div>

            <div>
                <label>Descricao: </label>
                <br>
                <textarea v-model="descricao"></textarea>
            </div>

            <button>Enviar</button>
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