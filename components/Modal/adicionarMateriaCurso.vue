<template>
    <Modal @fecharModal="fecharModal">
        <formAdicionarMateriaCurso 
            @enviarFormulario="adicionarMateria"
            :materias="materias"
            :mensagem=mensagem
        />
    </Modal>
</template>
  
<script>

import Materia from '@/service/Materia.js'
import CursoGrade from '@/service/CursoGrade.js'

  export default {
    data() {
      return {
        mensagem: "",
        materias: [],
      };
    },
    props: {
      id_curso: Number,
    },
    async created() {
      this.materias = await Materia.listarMaterias()
    },  
    methods: {
        fecharModal(mudanca = false) {
            this.$emit("fecharModal", {
            mudanca,
            });
        },
    
        async adicionarMateria(e) {

            let dados = {}
            dados.id_materia = e.id_materia 
            dados.periodo = e.periodo
            dados.id_curso = this.id_curso

            await CursoGrade.cadastrarCursoGrade(dados).then(response => {
              this.mensagem = 'Materia adicionada com sucesso'
              this.$emit("pegarCurso")

              setTimeout(() => {
                this.fecharModal()
                this.mensagem = ''
              }, 2500);

            })
    
            
        },
    },
  };
</script>

<style scoped>

div {
    display: flex;
    flex-direction: column;
    padding: 8px;
}

select, button {
    width: 250px;
}

</style>
