<template>
    <div>
        <div v-for="(cursoGradeList, periodo) in cursoGradesPorPeriodo" :key="periodo">
            <h2>Período {{ periodo }}</h2>
            <Lista>
              <li v-for="cursoGrade in cursoGradeList" :key="cursoGrade.id.idMateria">
                {{ cursoGrade.materia.nome }}
                <ul>
                    <li 
                        class="clique" 
                        @click="() => abrirModalEditar(cursoGrade.id.idMateria)"
                    >
                        Editar
                    </li>
                    <li 
                        class="clique red"
                        @click="() => abrirModalRemover(cursoGrade.id.idMateria)"
                    >
                        Remover
                    </li>
                </ul>
              </li>
              
            </Lista>
        </div>

        <Modal @fecharModal="fecharModal" v-if="abrirModal">
            <FormEditarMateriaCurso 
                @enviarFormulario="editarMateriaCurso"
                :mensagem="mensagem"
            />
        </Modal>

        <ModalConfirmar 
            :frase="'Tem certeza que deseja remover essa materia?'"
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
            const cursoGrade = {}
            cursoGrade.id_materia = this.idMateria
            cursoGrade.id_curso = this.idCurso
            cursoGrade.periodo = e

            await CursoGrade.atualizarCursoGrade(cursoGrade).then(response => {
                this.mensagem = "Curso atualizado com sucesso"
                this.$emit("pegarCurso")

                setTimeout(() => {
                    this.fecharModal()
                    this.mensagem = '';
                }, 2000)
            })
        },
        async removerMateria(e) {

            if(!e) return this.fecharModal()

            await CursoGrade.deletarCursoGrade(this.idCurso, this.idMateria).then(response => {
                this.$emit("pegarCurso")
                this.fecharModal()

            })
        }
    }
}

</script>

<style scoped>

.red {
    color: red!important;
}

</style>