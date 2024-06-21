<template>
    <ValidadoresTecnico>
        <div class="container-aluno-escolhas">
            <a @click="loggout">
                <img class="icone" src="../../assets/icons/sair.png" alt="Icone sair">
                SAIR
            </a>

            <NuxtLink to="/escolher">
                <img class="icone" src="../../assets/icons/voltar.png" alt="Icone voltar">
                VOLTAR PARA ESCOLHAS
            </NuxtLink>

            <NuxtLink to="/admin/usuarios">
                <img class="icone" src="../../assets/icons/usuario.png" alt="Icone do usuario">
                USUARIOS
            </NuxtLink>

            <NuxtLink to="/admin/alunos">
                <img class="icone" src="../../assets/icons/aluno.png" alt="Icone do usuario">
                ALUNOS
            </NuxtLink>

            <NuxtLink to="/admin/professor">
                <img class="icone" src="../../assets/icons/professor.png" alt="Icone do Professor">
                PROFESSORES
            </NuxtLink>

            <NuxtLink to="/admin/turmas">
                <img class="icone" src="../../assets/icons/livro.png" alt="Icone de turma">
                TURMAS
            </NuxtLink>

            <NuxtLink to="/admin/cursos">
                <img class="icone" src="../../assets/icons/curso.png" alt="Icone de Curso">
                CURSOS
            </NuxtLink>

            <NuxtLink to="/admin/materias">
                <img class="icone" src="../../assets/icons/materia.png" alt="Icone de Materia">
                MATERIAS
            </NuxtLink>
        </div>
    </ValidadoresTecnico>
</template>

<script>

import LocalStorage from '@/utils/LocalStorage.js'

export default {
    methods: {
        loggout() {
            LocalStorage.removerIdUsuario()
            this.$router.replace({ path: '/' })
        }
    }
}

</script>

<style scoped>

body {
    background-color: rgb(224, 224, 224);
}

.container-aluno-escolhas {
    align-items: center;
    display: flex;
    gap: 64px;
    justify-content: center;
    flex-wrap: wrap;
    height: 100vh;
}

a {
    align-items: center;
    border: 2px solid #008000;
    border-radius: 24px;
    color: black;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    font-size: 16px;
    font-weight: bold;
    height: 150px;
    gap: 8px;
    justify-content: center;
    text-align: center;
    text-decoration: none;
    width: 150px;
}


.icone {
    width: 48px;
}

</style>