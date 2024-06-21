<template>
    <div>
        <NuxtLink to="/almoxarifado">Voltar</NuxtLink>
        <br>
        <span class="clique" @click=abrirModal>Cadastrar tipo de produto</span>
        
        <Modal @fecharModal=fecharModal v-if="modalCadastroTipoProduto" >
                <FormCadastroTipoProduto @enviarFormulario="cadastroTipoProduto" />
        </Modal>

        <Lista v-for="t in tipoProdutos" :key=t.id_tipo_produto>
            <li>Nome: {{t.nome}}</li>
        </Lista>
    </div>
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