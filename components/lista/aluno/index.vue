<template>
    <div class="aluno-container">
        <div class="search-bar">
            <label for="cpf">Adicione um CPF para pesquisar:</label>
            <input id="cpf" v-model="cpf" class="search-input" />
        </div>

        <ul class="aluno-list">
            <li v-for="a in listaDeAlunos" :key="a.matricula" class="aluno-item">
                <div class="aluno-info">
                    <p><strong>Nome:</strong> {{ a.nome }}</p>
                    <p><strong>CPF:</strong> {{ a.cpf }}</p>
                    <p><strong>Matrícula:</strong> {{ a.matricula_aluno }}</p>
                    <p><strong>Ano Matrícula:</strong> {{ a.ano_matricula }}</p>
                    <p v-if="a.cursos"><strong>Curso:</strong> {{ a.cursos[0]?.nome }}</p>
                </div>
                <button class="edit-button" @click="() => abriModal(a)">Cadastrar curso</button>
            </li>
        </ul>

        <Modal @fecharModal="fecharModal" v-if="modalAberto">
            <formCadastrarAlunoCurso 
                @enviarFormulario="cadastraAlunoCurso" 
                :mensagem="mensagem"
            />
        </Modal>
    </div>
</template>

<script>
import AlunoCurso from "@/service/AlunoCurso.js";
import formatted from '@/utils/Formatted';

export default {
    data() {
        return {
            modalAberto: false,
            idAluno: '',
            mensagem: '',
            cpf: ''
        };
    },
    props: {
        alunos: Array
    },
    computed: {
        listaDeAlunos() {
            if (this.cpf) {
                const cpfFormatted = formatted.limparCaracteres(this.cpf, ".()- ");
                return this.alunos.filter((a) => a.cpf.includes(cpfFormatted));
            }
            return this.alunos;
        }
    },
    methods: {
        abriModal(aluno) {
            this.idAluno = aluno.id_aluno;
            this.modalAberto = true;
        },
        async cadastraAlunoCurso(dados) {
            try {
                await AlunoCurso.cadastrarAlunoCurso(dados, this.idAluno);
                this.mensagem = 'Aluno cadastrado no curso com sucesso';
                this.$emit("listarNovamente");

                setTimeout(() => {
                    this.fecharModal();
                }, 2000);
            } catch (error) {
                this.mensagem = 'Erro no cadastro';
            }
        },
        fecharModal() {
            this.modalAberto = false;
        }
    }
};
</script>

<style scoped>
.aluno-container {
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

.search-input {
    width: 96%;
    padding: 10px;
    margin-top: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.aluno-list {
    list-style-type: none;
    padding: 0;
}

.aluno-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    margin-bottom: 10px;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.aluno-info p {
    margin: 5px 0;
}


</style>
