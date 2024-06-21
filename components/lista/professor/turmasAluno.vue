<template>
    <div>
      <ul class="alunos-lista">
        <li v-for="aluno in alunos" :key="aluno.matricula" class="aluno-item">
          <div class="aluno-header">
            <h3>{{ aluno.nome_aluno }}</h3>
            <p>Situação: {{ aluno.situacao }}</p>
          </div>
          <div class="aluno-content">
            <div class="info">
              <h4>Notas</h4>
              <ul>
                <li>P1: {{ aluno.p1 }}</li>
                <li>P2: {{ aluno.p2 }}</li>
                <li>PF: {{ aluno.pf }}</li>
              </ul>
            </div>
            <div class="info">
              <h4>Faltas</h4>
              <ul>
                <li v-for="falta in aluno.faltas" :key="falta">{{ falta }}</li>
              </ul>
            </div>
          </div>
          <div class="aluno-actions">
            <button class="btn-notas" @click="abrirModalNotas(aluno)">Cadastrar notas</button>
            <button class="btn-frequencia" @click="abrirModalFrequencia(aluno)">Cadastrar frequência</button>
          </div>
        </li>
      </ul>
  
      <ModalCadastrarProfessorNota
        v-if="modalNotasAberto"
        @fecharModal="fecharModal"
        @cadastrarNota="cadastrarNota"
        :infos="alunoSelecionado"
      />
  
      <ModalCadastrarProfessorFrequencia
        v-if="modalFrequenciaAberto"
        @fecharModal="fecharModal"
        @cadastrarFrequencia="cadastrarFrequencia"
        :infos="alunoSelecionado"
      />
    </div>
  </template>
  
  <script>
  import TurmaAlunoNota from '@/service/TurmaAlunoNota.js'
  import TurmaAlunoFrequencia from '@/service/TurmaAlunoFrequencia.js'
  
  export default {
    props: {
      alunos: Array,
    },
    data() {
      return {
        alunoSelecionado: null,
        modalNotasAberto: false,
        modalFrequenciaAberto: false
      };
    },
    methods: {
      abrirModalNotas(aluno) {
        this.alunoSelecionado = aluno;
        this.modalNotasAberto = true;
      },
      abrirModalFrequencia(aluno) {
        this.alunoSelecionado = aluno;
        this.modalFrequenciaAberto = true;
      },
      fecharModal() {
        this.modalNotasAberto = false;
        this.modalFrequenciaAberto = false;
        this.alunoSelecionado = null;
      },
      async cadastrarNota(notas) {
        let notasData = {}
        if(!this.alunoSelecionado.p1) notasData.p1 = notas.p1
        if(!this.alunoSelecionado.p2) notasData.p2 = notas.p2
        if(!this.alunoSelecionado.pf) notasData.pf = notas.pf

        try {
          await TurmaAlunoNota.atualizarNota(
            this.alunoSelecionado.Id_turma.idTurma,
            this.alunoSelecionado.id_aluno,
            notasData
          );
          this.$emit("pegarAlunos");
          setTimeout(() => {
            this.fecharModal();
          }, 1000);
        } catch (error) {
          console.error("Erro ao cadastrar notas:", error);
        }
      },
      async cadastrarFrequencia(falta) {
        try {
          await TurmaAlunoFrequencia.criarFalta(
            this.alunoSelecionado.Id_turma.idTurma,
            this.alunoSelecionado.id_aluno,
            falta
          );
          this.$emit("pegarAlunos");
          setTimeout(() => {
            this.fecharModal();
          }, 1000);
        } catch (error) {
          console.error("Erro ao cadastrar frequência:", error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .alunos-lista {
    list-style-type: none;
    padding: 0;
  }
  
  .aluno-item {
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-bottom: 20px;
    padding: 15px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .aluno-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .aluno-content {
    display: flex;
    justify-content: space-between;
  }
  
  .info {
    width: 45%;
  }
  
  .aluno-actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
  
  .btn-notas,
  .btn-frequencia {
    padding: 10px 20px;
    margin-left: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .btn-notas:hover,
  .btn-frequencia:hover {
    background-color: #0056b3;
  }
  
  .btn-notas:focus,
  .btn-frequencia:focus {
    outline: none;
  }
  
  </style>
  