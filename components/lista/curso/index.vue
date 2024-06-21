<template>
    <div class="curso-container">
      <div class="search-bar">
        <label for="filtroCurso">Filtrar por nome do curso:</label>
        <input id="filtroCurso" v-model="filtroCurso" class="search-input" />
      </div>
  
      <ul class="curso-list">
        <li v-for="curso in listaDeCursosFiltrados" :key="curso.id_curso" class="curso-item">
          <div class="curso-info">
            <p><strong>Nome:</strong> {{ curso.nome }}</p>
            <p><strong>Períodos:</strong> {{ curso.periodos }}</p>
          </div>
          <button class="edit-button" @click="modalAbrir(curso)">Editar</button>
          <NuxtLink :to="'/admin/cursos/' + curso.id_curso + '/materias/'" class="materias-link">Matérias</NuxtLink>
        </li>
      </ul>
  
      <ModalEditarCurso
        v-if="modalAberto"
        @fecharModal="fecharModal"
        @pegarCursos="pegarCursos"
        :nome="cursoAberto.nome"
        :id_curso="cursoAberto.id_curso"
        :periodos="cursoAberto.periodos"
      />
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        modalAberto: false,
        cursoAberto: {},
        filtroCurso: ''
      };
    },
    props: {
      cursos: Array
    },
    computed: {
      listaDeCursosFiltrados() {
        if (this.filtroCurso.trim() === '') {
          return this.cursos;
        } else {
          const filtro = this.filtroCurso.toLowerCase().trim();
          return this.cursos.filter(curso => curso.nome.toLowerCase().includes(filtro));
        }
      }
    },
    methods: {
      modalAbrir(curso) {
        this.cursoAberto = curso;
        this.modalAberto = true;
      },
      fecharModal() {
        this.modalAberto = false;
      },
      pegarCursos() {
        this.$emit("pegarCursos")
      }
    }
  };
  </script>
  
  <style scoped>
  .curso-container {
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
  
  .curso-list {
    list-style-type: none;
    padding: 0;
  }
  
  .curso-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    margin-bottom: 10px;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .curso-info p {
    margin: 5px 0;
  }
  

  
  .materias-link {
    color: #7E9181;
    text-decoration: none;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .materias-link:hover {
    text-decoration: underline;
  }
  </style>
  