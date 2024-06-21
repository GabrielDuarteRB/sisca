<template>
    <ValidadoresProfessor>
        <NuxtLink class="menu" to="/professor">
            <img src="../../../assets/icons/voltar.png" alt="Icone de voltar">
        </NuxtLink>

        <ListaProfessorTurmas
            :turmas=turmas
            class="lista"
        />
    </ValidadoresProfessor>
</template>

<script>

import Turma from '@/service/Turma.js'
import Funcionario from '@/service/Funcionario.js'
import LocalStorage from '@/utils/LocalStorage.js'

export default {
    data() {
        return {
            turmas: [],
            professor: []
        }
    },
    async mounted() {
        const id = LocalStorage.pegarIdUsuario()
        if(!id) {
            this.$router.replace({ path: '/' })
        }

        await this.buscarProfessor(id)
        await this.buscarTurmasPorProfessor()
    },
    methods: {
        async buscarProfessor(id) {
            this.professor = await Funcionario.listarFuncionarioPorUsuario(id)
        },
        async buscarTurmasPorProfessor() {
            this.turmas = await Turma.listarTurmasPorProfessor(this.professor.id_funcionario)
            console.log(this.turmas)
        }
    }
}

</script>

<style>

.lista {
    margin-top: 64px;
}

</style>