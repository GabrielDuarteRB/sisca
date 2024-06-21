<template>
    <div class="container">
        <div class="list">
            <div v-for="livro in livros" :key="livro.id_livro" class="item">
                <div class="info">
                    <p class="title">
                        <strong>Título:</strong> {{ livro.titulo }}
                    </p>
                    <p class="detail">
                        <strong>Autor:</strong> {{ livro.autor }}
                    </p>
                    <p class="detail">
                        <strong>Editora:</strong> {{ livro.editor }}
                    </p>
                </div>
                <div class="actions">
                    <button class="btn-edit" @click="abrirModal(livro)">Editar</button>
                </div>
            </div>
        </div>

        <Modal @fecharModal="fecharModal" v-if="modalAberto">
            <formCadastrarLivro
                @enviarFormulario="atualizarLivro"
                :livroProps="livro"
            />
        </Modal>
    </div>
</template>

<script>
import Livro from "@/service/Livro.js";

export default {
    data() {
        return {
            modalAberto: false,
            livro: [],
        };
    },
    props: {
        livros: Array,
    },
    methods: {
        abrirModal(livro) {
            this.livro = livro;
            this.modalAberto = true;
        },
        async atualizarLivro(dados) {
            dados.id = this.livro.id_livro;
            await Livro.atualizarLivros(dados)
                .then(async (response) => {
                    this.$emit("listarNovamente");

                    setTimeout(() => {
                        this.fecharModal();
                    }, 1000);
                })
                .catch((e) => {});
        },
        fecharModal() {
            this.modalAberto = false;
        },
    },
};
</script>

<style scoped>
.container {
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
}

.list {
    display: grid;
    gap: 10px;
}

.item {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 10px;
    align-items: center;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #fff;
}

.info {
    grid-column: 1 / span 1;
}

.actions {
    grid-column: 2 / span 1;
    text-align: right;
}

.btn-edit {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
}

.btn-edit:hover {
    background-color: #0056b3;
}
</style>
