<template>
    <div class="user-container">
        <div class="search-bar">
            <label for="cpf">Adicione um CPF para pesquisar:</label>
            <input id="cpf" v-model="cpf" class="form-control" />
        </div>

        <ul class="user-list">
            <li v-for="professor in professores" :key="professor.matricula" class="user-item">
                <div class="user-info">
                    <p><strong>Nome:</strong> {{ professor.nome }}</p>
                    <p><strong>CPF:</strong> {{ professor.cpf }}</p>
                    <p><strong>Email:</strong> {{ professor.email }}</p>
                    <p><strong>Data Nascimento:</strong> {{ professor.data_nascimento }}</p>
                    <p><strong>Matrícula:</strong> {{ professor.matricula_funcionario }}</p>
                </div>
                <button class="edit-button" @click="() => abrirModalDelete(professor.id_funcionario)">Deletar</button>
            </li>
        </ul>

        <ModalConfirmar 
            :frase="'Deseja Excluir esse professor?'"
            @enviarResposta="deletarProfessor"
            @fecharModal="fecharModal"
            v-if="modalAberto"
        />
    </div>
</template>

<script>
import Professor from '@/service/Professor.js';

export default {
    data() {
        return {
            modalAberto: false,
            idProfessor: null,
            cpf: ''
        };
    },
    props: {
        professores: Array
    },
    methods: {
        abrirModalDelete(id) {
            this.modalAberto = true;
            this.idProfessor = id;
        },
        fecharModal() {
            this.idProfessor = null;
            this.modalAberto = false;
        },
        async deletarProfessor() {
            await Professor.deletarProfessor(this.idProfessor);
            this.fecharModal();
            this.$emit("listarProfessor");
        }
    }
};
</script>

<style scoped>
.user-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.search-bar {
    margin-bottom: 20px;
}

.search-bar label {
    font-weight: bold;
}

.search-bar input {
    width: 100%;
    padding: 10px;
    margin-top: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

.user-list {
    list-style-type: none;
    padding: 0;
}

.user-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    margin-bottom: 10px;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.user-info p {
    margin: 5px 0;
}

.edit-button {
    background-color: #dc3545;
    color: #fff;
    padding: 8px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.edit-button:hover {
    background-color: #c82333;
}
</style>
