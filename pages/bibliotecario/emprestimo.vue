<template>
    <ValidadoresBibliotecario>
        <div class="header-container">
            <NuxtLink to="/bibliotecario" class="back-link">← Voltar para Biblioteca</NuxtLink>
            <span  @click="abrirModal" class="add-student-link">Cadastrar Emprestimo</span>
        </div>

        <Modal @fecharModal="fecharModal" v-if="modalAberto">
            <FormCadastrarEmprestimoLivro @enviarFormulario="cadastrarEmprestimo" />
        </Modal>

        <h1>Emprestimos</h1>
        <ListaBibliotecarioEmprestimo 
            :emprestimos="emprestimos"
        />
    </ValidadoresBibliotecario>
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
        await this.pegarEmprestimos()
    },
    methods: {
        abrirModal() {
            this.modalAberto = true
        },
        fecharModal() {
            this.modalAberto = false
        },
        async pegarEmprestimos() {
            this.emprestimos = await Emprestimo.listarEmprestimo()
        },
        async cadastrarEmprestimo(data) {
            await Emprestimo.cadastrarEmprestimo(data).then(() => {

                this.pegarEmprestimos()
                setTimeout(() => {
                    this.fecharModal()
                }, 1000)
            }) 
        }
    }
}

</script>

<style scoped>

h1 {
    text-align: center;
}

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