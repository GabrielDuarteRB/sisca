<template>
    <div>
      <ul class="semestre-lista">
        <li v-for="(turmas, semestre) in turmasPorSemestreOrdenados" :key="semestre" class="semestre-item">
          <h2>{{ semestre }}</h2>
          <ul class="turma-lista">
            <li v-for="(turma, index) in turmas" :key="index" class="turma-item">
              <div @click="toggleExpand(semestre, index)" class="turma-titulo">
                <h3>{{ turma.nome_materia }}</h3>
              </div>
              <div v-if="isExpanded(semestre, index)" class="turma-detalhes">
                <div class="turma-info">
                  <p><strong>Professor:</strong> {{ turma.nome_funcionario }}</p>
                  <p><strong>Semestre:</strong> {{ turma.semestre_turma }}</p>
                  <p><strong>Status:</strong> {{ turma.situacao }}</p>
                </div>
                <div class="turma-frequencia">
                  <p><strong>Frequência:</strong></p>
                  <ul>
                    <li v-for="falta in turma.faltas" :key="falta">
                      {{ falta }}
                    </li>
                  </ul>
                </div>
                <div class="turma-notas">
                  <p><strong>Notas:</strong></p>
                  <p><strong>P1:</strong> {{ turma.p1 }}</p>
                  <p><strong>P2:</strong> {{ turma.p2 }}</p>
                  <p><strong>PF:</strong> {{ turma.pf }}</p>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      turmas: Array
    },
    data() {
      return {
        expandedIndex: {}
      };
    },
    computed: {
      turmasPorSemestre() {
        return this.turmas.reduce((acc, turma) => {
          const semestre = turma.semestre_turma;
          if (!acc[semestre]) {
            acc[semestre] = [];
          }
          acc[semestre].push(turma);
          return acc;
        }, {});
      },
      turmasPorSemestreOrdenados() {
        return Object.keys(this.turmasPorSemestre)
          .sort((a, b) => b.localeCompare(a))
          .reduce((acc, semestre) => {
            acc[semestre] = this.turmasPorSemestre[semestre];
            return acc;
          }, {});
      }
    },
    methods: {
      toggleExpand(semestre, index) {
        if (!this.expandedIndex[semestre]) {
          this.$set(this.expandedIndex, semestre, {});
        }
        this.$set(this.expandedIndex[semestre], index, !this.expandedIndex[semestre][index]);
      },
      isExpanded(semestre, index) {
        return this.expandedIndex[semestre] && this.expandedIndex[semestre][index];
      }
    }
  }
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
    background-color: #f9f9f9;
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
  
  .turma-info, .turma-frequencia, .turma-notas {
    margin-bottom: 10px;
  }
  
  .turma-frequencia ul {
    list-style-type: none;
    padding: 0;
    margin: 5px 0 0 0;
  }
  
  .turma-frequencia ul li {
    background-color: #eef;
    margin-bottom: 3px;
    padding: 5px;
    border-radius: 3px;
  }
  
  .turma-notas p {
    margin: 5px 0;
  }
  
  .turma-info p, .turma-notas p {
    margin: 0;
  }
  </style>
  