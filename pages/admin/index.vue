<template>
    <ValidadoresTecnico>
        <div class="container-aluno-escolhas">
            <div>
                <a @click="loggout" class="link-balao">
                    <img class="icone " src="../../assets/icons/sair.png" alt="Icone sair" >
                    SAIR
                </a>

                <NuxtLink to="/escolher" class="link-balao">
                    <img class="icone" src="../../assets/icons/voltar.png" alt="Icone voltar">
                    VOLTAR PARA ESCOLHAS
                </NuxtLink>

                <NuxtLink to="/admin/usuarios" class="link-balao">
                    <img class="icone" src="../../assets/icons/usuario.png" alt="Icone do usuario">
                    USUARIOS
                </NuxtLink>

                <NuxtLink to="/admin/alunos" class="link-balao">
                    <img class="icone" src="../../assets/icons/aluno.png" alt="Icone do usuario">
                    ALUNOS
                </NuxtLink>

                <NuxtLink to="/admin/professor" class="link-balao">
                    <img class="icone" src="../../assets/icons/professor.png" alt="Icone do Professor">
                    PROFESSORES
                </NuxtLink>

                <NuxtLink to="/admin/turmas" class="link-balao">
                    <img class="icone" src="../../assets/icons/livro.png" alt="Icone de turma">
                    TURMAS
                </NuxtLink>

                <NuxtLink to="/admin/cursos" class="link-balao">
                    <img class="icone" src="../../assets/icons/curso.png" alt="Icone de Curso">
                    CURSOS
                </NuxtLink>

                <NuxtLink to="/admin/materias" class="link-balao">
                    <img class="icone" src="../../assets/icons/materia.png" alt="Icone de Materia">
                    MATERIAS
                </NuxtLink>
            </div>
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

<style>
body {
    background-color: rgb(224, 224, 224);
    font-family: 'Roboto', sans-serif;
}

.container-aluno-escolhas {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
    /* height: 100vh; */
}

.header-container {
    align-items: center;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 20px;
    padding: 10px;
}

.container-aluno-escolhas div {
    width: 50%;
    height: max-content;
    align-items: center;
    display: flex;
    gap: 64px;
    justify-content: center;
    
    padding: 3rem;
    flex-wrap: wrap;

    background-color: white;

    -webkit-box-shadow: 0px 10px 15px 0px rgba(126, 145, 129, 1);
    -moz-box-shadow: 0px 10px 15px 0px rgba(126, 145, 129, 1);
    box-shadow: 0px 10px 15px 0px rgba(126, 145, 129, 1);
}

.container-aluno-escolhas a {
    align-items: center;
    /* border: 2px solid #008000; */
    border-radius: 24px;
    /* color: black; */
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

.back-link,
.add-user-link,
.add-teacher-link,
.add-student-link
 {
  color: #f0f0f0 ;
  font-weight: bold;
  text-decoration: none;
  display: block;
  background-color: #7E9181;
  padding: 1rem;
  border-radius: 5px;
}

.back-link:hover,
.add-user-link:hover,
.add-teacher-link:hover,
.add-student-link:hover {
  text-decoration: underline;
  color: #f0f0f0 ;
  background-color: #2f4932;
  transition: .5s;
  cursor: pointer;
}

.edit-button {
    background-color: #7E9181;
    color: #fff;
    padding: 8px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .edit-button:hover {
    background-color: #2f4932;
  }


.icone {
    width: 48px;
}
</style>