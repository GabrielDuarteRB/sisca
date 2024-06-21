<template>
    <ValidadoresTecnico>
        <div class="header-container">
            <NuxtLink to="/admin/turmas" class="back-link">← Voltar para turmas</NuxtLink>
            <span @click="modalAberto = true" class="add-teacher-link">Cadastrar aluno na turma</span>
        </div>      

        <ListaMateriaAluno
            :turma="turma"
            @pegarAlunos="pegarAlunosNaTurma"
        />

        <Modal @fecharModal="fecharModal" v-if="modalAberto">
            <FormCriarAlunoTurma 
                @enviarFormulario="criarAlunoNaTurma"
                :mensagem=mensagem
            />
        </Modal>
    </ValidadoresTecnico>
</template>

<script>

import TurmaAluno from "@/service/TurmaAluno.js"

export default {
    data() {
        return {
            turma: [],
            idTurma: null,
            modalAberto: false
        }
    },
    async created() {
        await this.pegarAlunosNaTurma()
    },
    methods: {
        async pegarAlunosNaTurma() {
            this.idTurma = this.$route.params.idTurma
            this.turma = await TurmaAluno.listarAlunosPorTurma(this.idTurma)
        },
        criarAlunoNaTurma(idAluno) {
            TurmaAluno.criarAlunoNaTurma(this.idTurma, idAluno).then(() => {
                this.mensagem = "Aluno cadastrado na turma"

                this.pegarAlunosNaTurma()
                setTimeout(() => {
                    this.fecharModal()
                }, 1000)
            })
        },
        fecharModal() {
            this.modalAberto = false
        }
    }

}

</script>

<style>

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
.add-teacher-link {
    color: #007bff;
    cursor: pointer;
    font-weight: bold;
    text-decoration: none;
}

.back-link:hover,
.add-teacher-link:hover {
    text-decoration: underline;
}

</style>