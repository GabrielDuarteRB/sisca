<template>
    <ValidadoresProfessor>
        <NuxtLink class="menu" to="/professor/turmas">
            <img src="../../../assets/icons/voltar.png" alt="Icone de voltar">
        </NuxtLink>

        <ListaProfessorTurmasAluno class="lista" :alunos="alunos" @pegarAlunos="buscarAlunosNaTurma" />
    </ValidadoresProfessor>
</template>

<script>

import TurmaAluno from '@/service/TurmaAluno.js'
import Funcionario from '@/service/Funcionario.js'
import LocalStorage from '@/utils/LocalStorage.js'

export default {
    data() {
        return {
            alunos: [],
            professor: []
        }
    },
    async mounted() {
        const id = LocalStorage.pegarIdUsuario()
        if(!id) {
            this.$router.replace({ path: '/' })
        }

        await this.buscarAlunosNaTurma()
    },
    methods: {
        async buscarAlunosNaTurma() {
            const id = this.$route.params.idTurma
            this.alunos = await TurmaAluno.listarAlunosPorTurma(id)
            console.log(this.alunos)
        }
    }
}

</script>