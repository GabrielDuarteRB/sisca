<template>
    <ValidadoresBibliotecario>
        <div class="header-container">
            <NuxtLink to="/escolher" class="back-link">← Voltar para escolhas</NuxtLink>
            <div class="options">
                <NuxtLink to="/bibliotecario/emprestimo" class="add-student-link">Emprestimo</NuxtLink>
                <span  @click="abrirModal" class="add-student-link">Cadastrar Livro</span>
            </div>
        </div>

        <Modal @fecharModal="fecharModal" v-if="modalCadastro">
            <formCadastrarLivro @enviarFormulario="criarLivro" />
        </Modal>

        <h1>Biblioteca</h1>
        <listaBibliotecarioLivro
            @listarNovamente="pegarLivros"
            :livros=livros
        />
    </ValidadoresBibliotecario>
</template> 

<script>

import Livro from '@/service/Livro.js'

export default {
    data() {
        return {
            modalCadastro: false,
            livros: []
        }
    },
    created() {
        this.pegarLivros()
    },
    methods: {
        async criarLivro(e) {
            await Livro.criarLivro(e).then(() => {
                this.pegarLivros()
                
                setTimeout(() => {
                    this.fecharModal()
                }, 1000)
            })
        },
        abrirModal() {
            this.modalCadastro = true
        },
        fecharModal() {
            this.modalCadastro = false
        },
        async pegarLivros() {
            this.livros = await Livro.buscarLivros()
            console.log(this.livros)
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