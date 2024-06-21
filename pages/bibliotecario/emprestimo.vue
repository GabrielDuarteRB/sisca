<template>
    <div>
        <NuxtLink to="/bibliotecario">Voltar para Livros</NuxtLink>
        <br><br>
        <span class="clique" @click="abrirModal">Cadastrar Emprestimo</span>

        <Modal @fecharModal="fecharModal" v-if="modalAberto">
            <FormCadastrarEmprestimoLivro @enviarFormulario="cadastrarEmprestimo" />
        </Modal>

        <ListaBibliotecarioEmprestimo 
            :emprestimos="emprestimos"
        />
    </div>
</template>

<script>

import Emprestimo from '@/service/Emprestimo.js'

export default {
    data() {
        return {
            modalAberto: false,
            emprestimos: []
        }
    },
    async created() {
        this.emprestimos = await Emprestimo.listarEmprestimo()
    },
    methods: {
        abrirModal() {
            this.modalAberto = true
        },
        fecharModal() {
            this.modalAberto = false
        },
        async cadastrarEmprestimo(data) {
            await Emprestimo.cadastrarEmprestimo(data).then(() => {

                setTimeout(() => {
                    this.fecharModal()
                }, 1000)
            }) 
        }
    }
}

</script>