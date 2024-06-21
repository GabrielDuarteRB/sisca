<template>
    <div>
      <ul class="semestre-lista">
        <li v-for="(turmas, semestre) in turmasPorSemestreOrdenados" :key="semestre" class="semestre-item">
          <h2>{{ semestre }}</h2>
          <ul class="turma-lista">
            <li v-for="(turma, index) in turmas" :key="turma.id_turma" class="turma-item">
              <div class="turma-titulo" @click="toggleDetalhes(turma.id_turma)">
                <h3>{{ turma.nome_materia }}</h3>
              </div>
              <div v-if="detalhesVisiveis[turma.id_turma]" class="turma-detalhes">
                <p><strong>Professor:</strong> {{ turma.nome_professor }}</p>
                <p><strong>Matéria:</strong> {{ turma.nome_materia }}</p>
                <p class="clique" @click="abrirModalAtualizar(turma)">Atualizar</p>
                <NuxtLink :to="'/admin/turmas/' + turma.id_turma" class="ver-mais-botao">Ver mais</NuxtLink>
              </div>
            </li>
          </ul>
        </li>
      </ul>
  
      <Modal v-if="modalAtualizarAberto" @fecharModal="fecharModal">
        <FormCriarTurma
          :mensagem="mensagem"
          @enviarFormulario="atualizarTurma"
          :turma="turma"
        />
      </Modal>
    </div>
  </template>
  
<script>
  import Turma from '@/service/Turma.js';
  
  export default {
    data() {
      return {
        modalAtualizarAberto: false,
        turma: null,
        mensagem: '',
        detalhesVisiveis: {}
      };
    },
    props: {
      turmas: Array
    },
    computed: {
      turmasPorSemestreOrdenados() {
        const agrupadasPorSemestre = this.turmas.reduce((acc, turma) => {
          const semestre = turma.semestre_turma;
          if (!acc[semestre]) {
            acc[semestre] = [];
          }
          acc[semestre].push({
            ...turma,
            mostrarDetalhes: false
          });
          return acc;
        }, {});
        return Object.keys(agrupadasPorSemestre)
          .sort((a, b) => b.localeCompare(a))
          .reduce((acc, semestre) => {
            acc[semestre] = agrupadasPorSemestre[semestre];
            return acc;
          }, {});
      }
    },
    methods: {
      toggleDetalhes(turmaId) {
        this.$set(this.detalhesVisiveis, turmaId, !this.detalhesVisiveis[turmaId]);
      },
      abrirModalAtualizar(turma) {
        this.modalAtualizarAberto = true;
        this.turma = turma;
      },
      fecharModal() {
        this.turma = null;
        this.modalAtualizarAberto = false;
        this.mensagem = '';
      },
      async atualizarTurma(e) {
        e.id_turma = this.turma.id_turma;
        await Turma.atualizarTurma(e).then(response => {
          this.mensagem = "Atualizado com sucesso";
          this.$emit("pegarTurmas");
          setTimeout(() => {
            this.fecharModal();
          }, 1500);
        });
      }
    }
  };
</script>
  
<style scoped>
  .semestre-lista, .turma-lista {
    list-style-type: none;
    padding: 0;
  }
  
  .semestre-item {
    margin-bottom: 30px;
  }
  
  .turma-item {
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-bottom: 20px;
  }
  
  .turma-item a {
    color: black;
    text-decoration: none;
  }
  
  .turma-titulo {
    padding: 15px;
    background-color: #eee;
    cursor: pointer;
  }
  
  .turma-titulo:hover {
    background-color: #ddd;
  }
  
  .turma-detalhes {
    padding: 15px;
  }
  
  .turma-info {
    margin-bottom: 10px;
  }
  
  .turma-info p {
    margin: 5px 0;
  }
  
  .clique {
    color: #007bff;
    cursor: pointer;
    text-decoration: underline;
  }
  
  .clique:hover {
    color: #0056b3;
  }
  
  .ver-mais-botao {
    display: inline-block;
    margin-top: 10px;
    padding: 8px 12px;
    background-color: #007bff;
    color: white!important;
    text-align: center;
    font-weight: bold;
    border-radius: 4px;
    text-decoration: none;
    cursor: pointer;
  }
  
  .ver-mais-botao:hover {
    background-color: #0056b3;
  }
</style>
  