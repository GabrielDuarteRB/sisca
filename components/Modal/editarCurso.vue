<template>
  <Modal @fecharModal="fecharModal">
    <formCriarCursos
      @enviarFormulario="atualizarCurso"
      :mensagem="mensagem"
      :nomeProps="nome"
      :periodosProps="periodos"
    />
  </Modal>
</template>

<script>

import Cursos from '@/service/Cursos.js'

export default {
  data() {
    return {
      mensagem: "",
    };
  },
  props: {
    nome: String,
    periodos: Number,
    id_curso: Number
  },
  methods: {
    fecharModal(mudanca = false) {
      this.$emit("fecharModal", {
        mudanca,
      });
    },

    async atualizarCurso(e) {
        e.id_curso = this.id_curso;

        await Cursos.atualizarCurso(e).then(() => {
          this.mensagem = 'Curso atualizado com sucesso'
          this.$emit("pegarCursos")

          setTimeout(() => {
              this.fecharModal()
          }, 2500);

        })
    },
  },
};
</script>
