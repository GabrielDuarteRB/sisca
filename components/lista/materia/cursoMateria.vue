<template>
    <div class="curso-grades-container">
      <div v-for="(cursoGradeList, periodo) in cursoGradesPorPeriodo" :key="periodo" class="periodo">
        
        <h2>Período {{ periodo }}</h2>

        <ul class="curso-grade-list">
          <li v-for="cursoGrade in cursoGradeList" :key="cursoGrade.id.idMateria" class="curso-grade-item">
            
            <div class="curso-grade-info">
              <p><strong>Matéria:</strong> {{ cursoGrade.materia.nome }}</p>
            </div>

            <div class="curso-grade-actions">
              <button class="btn-editar" @click="() => abrirModalEditar(cursoGrade.id.idMateria)">Editar</button>
              <button class="btn-remover" @click="() => abrirModalRemover(cursoGrade.id.idMateria)">Remover</button>
            </div>
            
          </li>
        </ul>
      </div>
  
      <Modal @fecharModal="fecharModal" v-if="abrirModal">
        <FormEditarMateriaCurso @enviarFormulario="editarMateriaCurso" :mensagem="mensagem" />
      </Modal>
  
      <ModalConfirmar
        :frase="'Tem certeza que deseja remover essa matéria?'"
        @enviarResposta="removerMateria"
        @fecharModal="fecharModal"
        v-if="abrirModalRemoverBool"
      />
    </div>
</template>

<script>
import CursoGrade from '@/service/CursoGrade.js'

export default {
  data() {
    return {
      mensagem: '',
      abrirModal: false,
      abrirModalRemoverBool: false,
      idMateria: null
    }
  },
  props: {
    cursoGradesPorPeriodo: Object,
    idCurso: Number,
  },
  methods: {
    abrirModalEditar(idMateria) {
      this.abrirModal = true
      this.idMateria = idMateria
    },
    abrirModalRemover(idMateria) {
      this.abrirModalRemoverBool = true
      this.idMateria = idMateria
    },
    fecharModal() {
      this.abrirModalRemoverBool = false
      this.abrirModal = false
      this.idMateria = null
    },
    async editarMateriaCurso(e) {
      const cursoGrade = {
        id_materia: this.idMateria,
        id_curso: this.idCurso,
        periodo: e
      }

      try {
        await CursoGrade.atualizarCursoGrade(cursoGrade)
        this.mensagem = "Curso atualizado com sucesso"
        this.$emit("pegarCurso")

        setTimeout(() => {
          this.fecharModal()
          this.mensagem = ''
        }, 2000)
      } catch (error) {
        console.error('Erro ao atualizar curso grade:', error)
        this.mensagem = 'Erro ao atualizar curso'
      }
    },
    async removerMateria(e) {
      if (!e) return this.fecharModal()

      try {
        await CursoGrade.deletarCursoGrade(this.idCurso, this.idMateria)
        this.$emit("pegarCurso")
        this.fecharModal()
      } catch (error) {
        console.error('Erro ao remover curso grade:', error)
      }
    }
  }
}
</script>


<style scoped>
    .curso-grades-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .periodo {
    margin-bottom: 20px;
    }

    .curso-grade-list {
    list-style-type: none;
    padding: 0;
    }

    .curso-grade-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    margin-bottom: 10px;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
    }

    .curso-grade-info {
    flex: 1;
    }

    .curso-grade-actions {
    flex-shrink: 0;
    display: flex;
    }

    .btn-editar,
    .btn-remover {
    background-color: #007bff;
    color: #fff;
    padding: 8px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 10px;
    transition: background-color 0.3s ease;
    }

    .btn-remover {
    background-color: #dc3545;
    }

    .btn-editar:hover,
    .btn-remover:hover {
    background-color: #0056b3;
    }

</style>
