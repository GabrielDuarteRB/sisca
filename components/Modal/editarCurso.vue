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

export default {
  data() {
    return {
      mensagem: "",
    };
  },
  props: {
    nome: String,
    periodos: Number
  },
  methods: {
    fecharModal(mudanca = false) {
      this.$emit("fecharModal", {
        mudanca,
      });
    },

    async atualizarCurso(e) {
        this.mensagem = 'Curso atualizado com sucesso'
        console.log(e)

        setTimeout(() => {
            this.fecharModal()
        }, 2500);
    },
  },
};
</script>
