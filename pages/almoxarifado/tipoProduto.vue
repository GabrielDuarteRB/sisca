<template>
    <ValidadoresAlmoxarife>
        <div class="header-container">
            <NuxtLink to="/almoxarifado" class="back-link">← Voltar para os produtos</NuxtLink>
            <span  @click="abrirModal" class="add-student-link">Cadastrar tipo de produto</span>
        </div>
        
        <Modal @fecharModal=fecharModal v-if="modalCadastroTipoProduto" >
                <FormCadastroTipoProduto @enviarFormulario="cadastroTipoProduto" />
        </Modal>

        <div class="nome-list-container">
            <Lista v-for="t in tipoProdutos" :key=t.id_tipo_produto class="nome-list">
                <li class="nome-item">
                    <strong>Nome:</strong> {{t.nome}}
                </li>
            </Lista>
        </div>
    </ValidadoresAlmoxarife>
</template>

<script>

import TipoProduto from '@/service/TipoProduto.js'

export default {
    data() {
        return {
            tipoProdutos: [],
            modalCadastroTipoProduto: false
        }
    },
    async created() {
        await this.listarTipoProdutos()
    },
    methods: {
        async listarTipoProdutos(){
            this.tipoProdutos = await TipoProduto.listarTipoProdutos()
        },
        async cadastroTipoProduto(data) {
            await TipoProduto.cadastrarTipoProdutos(data). then(() => {
                this.listarTipoProdutos()

                setTimeout(() => {
                    this.fecharModal()
                }, 1000)
            })
        },
        abrirModal() {
            this.modalCadastroTipoProduto = true
        },
        fecharModal() {
            this.modalCadastroTipoProduto = false
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

.nome-list-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.nome-list {
    list-style-type: none;
    padding: 0;
}

.nome-item {
    background-color: #fff;
    margin-bottom: 10px;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

</style>