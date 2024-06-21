<template>
    <div>
        <Lista v-for="l in livros" :key="l.id_livro">
            <li>Titulo: {{l.titulo}}</li>
            <li>Autor: {{l.autor}}</li>
            <li>Editor: {{l.editor}}</li>
            <li class="clique" @click="() => abriModal(l)">Editar</li>
        </Lista>

        <Modal @fecharModal=fecharModal v-if="modalAberto">
            <formCadastrarLivro
                @enviarFormulario="atualizarLivro" 
                :tituloProps="livro.titulo"
                :autorProps="livro.autor"
                :editorProps="livro.editor"
            />
        </Modal>
    </div>
</template>

<script>

import Livro from "@/service/Livro.js"

export default {
    data() {
        return {
            modalAberto: false,
            livro: '',
        }
    },  
    props: {
        livros: Array
    },
    methods: {
        abriModal(l) {
            this.livro = l
            this.modalAberto = true
        },
        async atualizarLivro(dados) {

            dados.id = this.livro.id_livro
            await Livro.atualizarLivros(dados).then(async response => {
                this.$emit("listarNovamente")

                setTimeout(() => {
                    this.fecharModal()
                }, 1000)
            }).catch(e => {
            })  
        },
        fecharModal() {
            this.modalAberto = false
        }
    } 
}

</script>

<style>

.clique {
    color: blue;
    cursor: pointer
}

</style>