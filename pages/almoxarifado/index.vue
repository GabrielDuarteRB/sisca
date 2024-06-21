<template>
    <div>
        <NuxtLink to="/escolher">Voltar para escolhas</NuxtLink>
        <br>
        <span class="clique">Loggout</span>
        <br>
        <br>
        <NuxtLink to="/almoxarifado/produto">Produtos</NuxtLink>
        <br>
        <br>
        <NuxtLink to="/almoxarifado/tipoProduto">Tipo de produto</NuxtLink>
        <br>
        <br>
        <span class="clique" @click="abrirModal">Cadastrar em estoque</span>

        <Modal @fecharModal=fecharModal v-if=modalCadastroEstoque >
            <formCriarEstoque @enviarFormulario="cadastrarEstoque" />
        </Modal>
        
        <ListaAlmoxarifadoEstoque :estoque="estoque" />
    </div>
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