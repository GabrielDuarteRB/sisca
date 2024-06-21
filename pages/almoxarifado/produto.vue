<template>
    <ValidadoresAlmoxarife>
        <div class="header-container">
            <NuxtLink to="/almoxarifado" class="back-link">← Voltar para os produtos</NuxtLink>
            <span  @click="abrirModal" class="add-student-link">Cadastrar produto</span>
        </div>
        
        <ListaAlmoxarifadoProdutos
            :produtos=produtos
        />

        <Modal v-if="modalCadastroProduto" @fecharModal=fecharModal >
            <formCadastrarProduto @enviarFormulario=cadastrarProduto />
        </Modal>
    </ValidadoresAlmoxarife>
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

<style scoped>

.header-container {
    align-items: center;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    padding: 10px;
}

.back-link,
.add-student-link {
    color: #007bff;
    cursor: pointer;
    font-weight: bold;
    text-decoration: none;
}

.back-link:hover,
.add-student-link:hover {
    text-decoration: underline;
}

</style>