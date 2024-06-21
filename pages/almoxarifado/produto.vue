<template>
    <div>
        <NuxtLink to="/almoxarifado">Voltar</NuxtLink>
        <br>
        <br>
        <span class="clique" @click=abrirModal>Cadastrar produto</span>
        
        <ListaAlmoxarifadoProdutos
            :produtos=produtos
        />

        <Modal v-if="modalCadastroProduto" @fecharModal=fecharModal >
            <formCadastrarProduto @enviarFormulario=cadastrarProduto />
        </Modal>
    </div>
</template>

<script>

import Produto from '@/service/Produto.js'

export default {

    data() {
        return {
            modalCadastroProduto: false,
            produtos: []
        }
    },
    created() {
        this.buscarProdutos()
    },
    methods: {
        abrirModal() {
            this.modalCadastroProduto = true
        },
        fecharModal() {
            this.modalCadastroProduto = false
        },
        async buscarProdutos() {
            this.produtos = await Produto.buscarProdutos()
        },
        async cadastrarProduto(data) {
            console.log(data)
            await Produto.criarProduto(data).then(() => {
                this.buscarProdutos()
                
                setTimeout(() => {
                    this.fecharModal()
                }, 1000)
            })
        }
    }

}

</script>