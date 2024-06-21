<template>
    <div class="user-container">
        <h1>{{ turma[0]?.nome_materia }}</h1>
        <h3>Semestre: {{ turma[0]?.semestre_turma }}</h3>
        <h3>Nome do professor: {{ turma[0]?.nome_funcionario }}</h3>

        <ul class="user-list">
            <li v-for="(aluno, index) in turma" :key="index" class="user-item">
                <div class="user-info">
                    <p><strong>Aluno:</strong> {{ aluno.nome_aluno }}</p>
                    <p><strong>Situação:</strong> {{ aluno.situacao }}</p>
                    <p v-if="aluno.situacao !== 'TRANCADO'"><strong>P1:</strong> {{ aluno.p1 }}</p>
                    <p v-if="aluno.situacao !== 'TRANCADO'"><strong>P2:</strong> {{ aluno.p2 }}</p>
                    <p v-if="aluno.situacao !== 'TRANCADO'"><strong>Pf:</strong> {{ aluno.pf }}</p>
                    <p v-if="aluno.situacao !== 'TRANCADO'">
                        <strong>Faltas:</strong>
                        <ul>
                            <li v-for="falta in aluno.faltas" :key="falta">
                                {{ falta }}
                                <ul>
                                    <li class="clique red" @click="() => modalDeletarFrequencia(aluno, falta)">Excluir</li>
                                </ul>
                            </li>
                        </ul>
                    </p>
                </div>
                <button class="btn edit-button" v-if="aluno.situacao !== 'TRANCADO'" @click="() => modalNota(aluno)">
                    Adicionar ou Editar Nota
                </button>
                <button class="btn edit-button" v-if="aluno.situacao !== 'TRANCADO'" @click="() => modalFrequencia(aluno)">
                    Adicionar falta
                </button>
                <button class="btn delete-button" v-if="aluno.situacao !== 'TRANCADO'" @click="() => modalTrancarAluno(aluno)">
                    Trancar matrícula
                </button>
            </li>
        </ul>

        <Modal v-if="abrirModalFrequencia" @fecharModal="fecharModal">
            <FormCriarFalta @enviarFormulario="criarFalta" />
        </Modal>

        <Modal v-if="abrirModalNota" @fecharModal="fecharModal">
            <FormCriarEEditarNota
                @enviarFormulario="enviarNota"
                :p1Prop="aluno.p1"
                :p2Prop="aluno.p2"
                :pfProp="aluno.pf"
            />
        </Modal>

        <ModalConfirmar
            v-if="abrirModalTrancarAluno"
            frase="Voce tem certeza que deseja TRANCAR a materia desse aluno?"
            @enviarResposta="trancarAluno"
            @fecharModal="fecharModal"
        />

        <ModalConfirmar
            v-if="abrirModalDeletarFrequencia"
            frase="Voce tem certeza que deseja DELETAR essa frequencia?"
            @enviarResposta="deletarFrequencia"
            @fecharModal="fecharModal"
        />
    </div>
</template>

<script>
import TurmaAluno from "@/service/TurmaAluno.js";
import TurmaAlunoNota from "@/service/TurmaAlunoNota.js";
import TurmaAlunoFrequencia from "@/service/TurmaAlunoFrequencia.js";

export default {
    data() {
        return {
            abrirModalTrancarAluno: false,
            abrirModalNota: false,
            abrirModalFrequencia: false,
            abrirModalDeletarFrequencia: false,
            aluno: null,
            frequencia: null,
        };
    },
    props: {
        turma: Array,
    },
    methods: {
        modalTrancarAluno(aluno) {
            this.aluno = aluno;
            this.abrirModalTrancarAluno = true;
        },
        modalNota(aluno) {
            this.aluno = aluno;
            this.abrirModalNota = true;
        },
        modalFrequencia(aluno) {
            this.aluno = aluno;
            this.abrirModalFrequencia = true;
        },
        modalDeletarFrequencia(aluno, frequencia) {
            this.aluno = aluno;
            this.frequencia = frequencia;
            this.abrirModalDeletarFrequencia = true;
        },
        fecharModal() {
            this.abrirModalDeletarFrequencia = false;
            this.abrirModalTrancarAluno = false;
            this.abrirModalFrequencia = false;
            this.abrirModalNota = false;
            this.frequencia = null;
            this.aluno = null;
        },
        async trancarAluno() {
            await TurmaAluno.trancarAluno(this.aluno.Id_turma.idTurma, this.aluno.Id_turma.idAluno);
            this.$emit("pegarAlunos");
            this.fecharModal();
        },
        async enviarNota(data) {
            await TurmaAlunoNota.atualizarNota(this.aluno.Id_turma.idTurma, this.aluno.Id_turma.idAluno, data);
            this.$emit("pegarAlunos");
            this.fecharModal();
        },
        async criarFalta(data) {
            await TurmaAlunoFrequencia.criarFalta(this.aluno.Id_turma.idTurma, this.aluno.Id_turma.idAluno, data);
            this.$emit("pegarAlunos");
            this.fecharModal();
        },
        async deletarFrequencia() {
            await TurmaAlunoFrequencia.deletarFrequencia(this.aluno.Id_turma.idTurma, this.aluno.Id_turma.idAluno, this.frequencia);
            this.$emit("pegarAlunos");
            this.fecharModal();
        },
    },
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

.user-list {
    list-style-type: none;
    padding: 0;
}

.user-item {
    background-color: #fff;
    margin-bottom: 10px;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.user-info p {
    margin: 5px 0;
}

.btn {
    border: none;
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
    padding: 8px 12px;
}

.delete-button {
    background-color: rgb(255, 0, 0);
}

.delete-button:hover {
    background-color: rgb(195, 0, 0);
}

.edit-button {
    background-color: rgb(0, 199, 0);
}

.edit-button:hover {
    background-color: rgb(0, 137, 0);
}

.clique {
    cursor: pointer;
    color: blue;
}

.clique.red {
    color: red;
}
</style>
