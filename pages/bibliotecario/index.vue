<template>
    <div>
        <NuxtLink to="/escolher">Voltar para escolhas</NuxtLink>
        <br>
        <span class="clique">Loggout</span>
        <br>
        <br>
        <NuxtLink to="/bibliotecario/emprestimo">Emprestimo</NuxtLink>
        <br>
        <br>
        <span class="clique" @click=abrirModal>Cadastrar Livro</span>

        <Modal @fecharModal="fecharModal" v-if="modalCadastro">
            <formCadastrarLivro @enviarFormulario="criarLivro" />
        </Modal>

        <listaBibliotecarioLivro
            @listarNovamente="pegarLivros"
            :livros=livros
        />
    </div>
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