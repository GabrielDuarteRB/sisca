<template>
    <ValidadoresAluno>
        <NuxtLink class="menu" to="/aluno">
            <img src="../../../assets/icons/voltar.png" alt="Icone de voltar">
        </NuxtLink>

        <ListaAlunoTurmas 
            :turmas="turmas" 
            class="listagem"
        />
    </ValidadoresAluno>
</template>

<script>

import TurmaAluno from '@/service/TurmaAluno.js'
import LocalStorage from '@/utils/LocalStorage.js'

export default {
    data() {
        return {
            turmas: [
                {
                   materia: 'Logica Computacional',
                   semestre_turma: '2023.2',
                   status: 'Cursando',
                   frequencia: '8',
                   p1: 8,
                   p2: 5
                },
                {
                   materia: 'Logica Computacional',
                   semestre_turma: '2023.2',
                   status: 'Cursando',
                   frequencia: '8',
                   p1: 8,
                   p2: 5
                },
            ]
        }
    },
    async mounted() {
        const id = LocalStorage.pegarIdUsuario()
        if(!id) {
            this.$router.replace({ path: '/' })
        }

        await this.pegarTurmasDoAluno(id)
    },
    methods: {
        async pegarTurmasDoAluno(id) {
            this.turmas = await TurmaAluno.pegarTurmasDoAluno(id)
            console.log(this.turmas)
        }
    }
}

</script>

<style scoped>

body {
    background-color: rgb(224, 224, 224);
    margin: 0;
    padding: 0;
}

.menu {
    left: 16px;
    position: absolute;
    top: 16px;
}

.menu img {
    width: 32px;
}

.listagem {
    margin-top: 64px;
}


</style>