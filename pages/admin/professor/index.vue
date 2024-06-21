<template>
    <div class="user-container">
      <div class="header-container">
        <NuxtLink to="/admin" class="back-link">← Voltar para o painel principal</NuxtLink>
        <span @click="abrirModalNovoProfessor" class="add-teacher-link">Cadastrar novo professor</span>
      </div>
  
      <ListaProfessor :professores="professores" @listarProfessor="listarProfessores" />
  
      <Modal v-if="modalAberto" @fecharModal="fecharModal">
        <FormCriarProfessor :usuarios="usuarios" @enviarFormulario="criarProfessor" />
      </Modal>
    </div>
  </template>
  
  <script>
  import Professor from '@/service/Professor.js'
  import Usuario from '@/service/Usuario.js'
  
  export default {
    data() {
      return {
        professores: [],
        usuarios: [],
        modalAberto: false
      }
    },
    async created() {
      await this.listarProfessores()
      this.usuarios = await Usuario.listarUsuarios()
    },
    methods: {
      async listarProfessores() {
        this.professores = await Professor.listarProfessores()
      },
      async criarProfessor(professor) {
        console.log(professor)
        await Professor.cadastrarProfessor({
         id_usuario: professor.id_usuario,
         matricula_funcionario: professor.id_usuario
        })
        .then(response => {
          this.modalAberto = false
          this.listarProfessores()
        })
      },
      abrirModalNovoProfessor() {
        this.modalAberto = true
      },
      fecharModal() {
        this.modalAberto = false
      },
      async abrirModalDelete(id) {
        if (confirm('Deseja excluir este professor?')) {
          await Professor.deletarProfessor(id)
          this.listarProfessores()
        }
      }
    }
  }
  </script>
  
  <style scoped>
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
    
    .header-admin {
        margin-bottom: 20px;
    }
    
    .back-link {
        color: #007bff;
        cursor: pointer;
        text-decoration: underline;
    }
    
    .clique {
        color: #007bff;
        cursor: pointer;
    }
  
</style>
  