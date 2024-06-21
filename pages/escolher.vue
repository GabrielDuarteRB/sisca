<template>
    <div>
        <div v-if="usuario" class="container-escolha">
            <h1>Escolha em qual classe voce gostaria de entrar</h1>
            <div>
                <a @click="loggout">
                    <img class="icone" src="../assets/icons/sair.png" alt="Icone sair">
                    SAIR
                </a>

                <NuxtLink to="/admin" v-if="tipoRole('TECNICO')">
                    <img class="icone" src="../assets/icons/administrativo.png" alt="Icone do tecnico">
                    TECNICO ADMINISTRATIVO
                </NuxtLink>

                <NuxtLink class="aluno"to="/aluno" v-if="tipoRole('ALUNO')">
                    <img class="icone" src="../assets/icons/aluno.png" alt="Icone do aluno">
                    ALUNO
                </NuxtLink>

                <NuxtLink to="/professor" v-if="tipoRole('PROFESSOR')">
                    <img class="icone" src="../assets/icons/professor.png" alt="Icone do professor">
                    PROFESSOR
                </NuxtLink>

                <NuxtLink to="/almoxarifado" v-if="tipoRole('ALMOXARIFE')">
                    <img class="icone" src="../assets/icons/almoxarifado.png" alt="Icone do professor">
                    ALMOXARIFE
                </NuxtLink>

                <NuxtLink to="/bibliotecario" v-if="tipoRole('BIBLIOTECARIO')">
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
        if(!id) {
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

<style scoped>

.container-escolha {
    margin: auto;
    height: auto;
    width: fit-content;
}

.container-escolha div {
    display: flex;
    justify-content: space-between;
    margin-top: 108px;
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
