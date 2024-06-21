<template>
    <div>
        <div v-if="usuario" class="container-escolha">
            <h2>Escolha em qual classe voce gostaria de entrar</h2>
            <div>
                <a @click="loggout" class="link-balao">
                    <img class="icone" src="../assets/icons/sair.png" alt="Icone sair">
                    SAIR
                </a>

                <NuxtLink to="/admin" v-if="tipoRole('TECNICO')" class="link-balao">
                    <img class="icone" src="../assets/icons/administrativo.png" alt="Icone do tecnico">
                    TECNICO ADMINISTRATIVO
                </NuxtLink>

                <NuxtLink to="/aluno" v-if="tipoRole('ALUNO')" class="aluno link-balao">
                    <img class="icone" src="../assets/icons/aluno.png" alt="Icone do aluno">
                    ALUNO
                </NuxtLink>

                <NuxtLink to="/professor" v-if="tipoRole('PROFESSOR')" class="link-balao">
                    <img class="icone" src="../assets/icons/professor.png" alt="Icone do professor">
                    PROFESSOR
                </NuxtLink>

                <NuxtLink to="/almoxarifado" v-if="tipoRole('ALMOXARIFE')" class="link-balao">
                    <img class="icone" src="../assets/icons/almoxarifado.png" alt="Icone do professor">
                    ALMOXARIFE
                </NuxtLink>

                <NuxtLink to="/bibliotecario" v-if="tipoRole('BIBLIOTECARIO')" class="link-balao">
                    <img class="icone" src="../assets/icons/livro.png" alt="Icone do professor">
                    BIBLIOTECARIO
                </NuxtLink>
            </div>
        </div>
        <h2 v-else>Carregando...</h2>
    </div>
</template>

<script>

import LocalStorage from '@/utils/LocalStorage.js'
import Usuario from '@/service/Usuario.js'

export default {
    data() {
        return {
            usuario: []
        }
    },
    mounted() {
        const id = LocalStorage.pegarIdUsuario()
        if (!id) {
            this.$router.replace({ path: '/' })
        }

        this.buscarUsuario(id)
    },
    methods: {
        async buscarUsuario(id) {
            this.usuario = await Usuario.listarUsuario(id)
        },
        tipoRole(tipo) {
            return this.usuario?.role?.includes(tipo)
        },
        loggout() {
            LocalStorage.removerIdUsuario()
            this.$router.replace({ path: '/' })
        }
    }
}

</script>

<style>
.container-escolha {
    margin: auto;
    height: auto;
    width: fit-content;
    background-color: #f0f0f0;
    padding: 0 3rem;
    margin-top: 1rem;

    -webkit-box-shadow: 0px 10px 15px 0px rgba(126, 145, 129, 1);
    -moz-box-shadow: 0px 10px 15px 0px rgba(126, 145, 129, 1);
    box-shadow: 0px 10px 15px 0px rgba(126, 145, 129, 1);
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

.container-escolha div {
    display: flex;
    justify-content: space-between;
    margin-top: 108px;
    background-color: #f0f0f0;
    padding: 3rem;

}

.container-escolha h1 {
    font-family: 'Roboto', sans-serif;
    padding-top: 2rem;
}

.link-balao{
    align-items: center;
    border: 2px solid #2f4932;
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
    background-color: white;
}

.link-balao:hover {
    background-color: #2f4932;
    color: white;
    transition: .5s;
}

.link-balao:not(:hover) {
    transition: .5s;
}


.icone {
    width: 48px;
}
</style>
