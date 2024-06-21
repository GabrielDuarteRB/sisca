<template>
    <div>
      <ul class="professor-lista">
        <li v-for="(turmasPorSemestre, professor) in turmasPorProfessor" :key="professor" class="professor-item">
          <h2>{{ professor }}</h2>
          <ul class="semestre-lista">
            <li v-for="(turmas, semestre) in turmasPorSemestreOrdenados(turmasPorSemestre)" :key="semestre" class="semestre-item">
              <h3>{{ semestre }}</h3>
              <ul class="turma-lista">
                <li v-for="(turma, index) in turmas" :key="index" class="turma-item">
                <NuxtLink :to="'/professor/turmas/' + turma.id_turma">
                    <div class="turma-titulo">
                      <h4>{{ turma.nome_materia }}</h4>
                    </div>
                </NuxtLink>
                    
                </li>
              </ul>
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
    computed: {
      turmasPorProfessor() {
        return this.turmas.reduce((acc, turma) => {
          const professor = turma.nome_professor;
          const semestre = turma.semestre_turma;
          if (!acc[professor]) {
            acc[professor] = {};
          }
          if (!acc[professor][semestre]) {
            acc[professor][semestre] = [];
          }
          acc[professor][semestre].push(turma);
          return acc;
        }, {});
      }
    },
    methods: {
      turmasPorSemestreOrdenados(turmasPorSemestre) {
        return Object.keys(turmasPorSemestre)
          .sort((a, b) => b.localeCompare(a))
          .reduce((acc, semestre) => {
            acc[semestre] = turmasPorSemestre[semestre];
            return acc;
          }, {});
      }
    }
  }
  </script>
  
  <style scoped>
  .professor-lista, .semestre-lista, .turma-lista {
    list-style-type: none;
    padding: 0;
  }
  
  .professor-item, .semestre-item {
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
  </style>
  