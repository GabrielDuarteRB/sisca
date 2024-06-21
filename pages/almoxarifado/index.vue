<template>
    <ValidadoresAlmoxarife>
        <div class="header-container">
            <NuxtLink to="/escolher" class="back-link">← Voltar para as escolhas</NuxtLink>
            <div class="options">
                <NuxtLink to="/almoxarifado/produto" class="add-student-link">Cadastrar Nova Materia</NuxtLink>
                <NuxtLink to="/almoxarifado/tipoProduto" class="add-student-link">Tipo de produto</NuxtLink>
                <span  @click="abrirModal" class="add-student-link">Cadastrar em estoque</span>
            </div>
        </div>
        

        <Modal @fecharModal=fecharModal v-if=modalCadastroEstoque >
            <formCriarEstoque @enviarFormulario="cadastrarEstoque" />
        </Modal>
        
        <h1>Estoque</h1>
        <ListaAlmoxarifadoEstoque :estoque="estoque" />
    </ValidadoresAlmoxarife>
</template>

<script>

import Estoque from '@/service/Estoque.js'


export default {

    data() {
        return {
            modalCadastroEstoque: false,
            estoque: []
        }
    },
    created() {
        this.buscarEstoque()
    },
    methods: {
        abrirModal() {
            this.modalCadastroEstoque = true
        },
        fecharModal() {
            this.modalCadastroEstoque = false
        },
        async buscarEstoque() {
            this.estoque = await Estoque.buscarEstoque()
        },
        async cadastrarEstoque(data) {
            console.log(data)
            await Estoque.criarProduto(data).then(() => {
                this.buscarEstoque()
                
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

.options {
    display: flex;
    gap: 24px;
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

h1 {
    text-align: center;
}
</style>