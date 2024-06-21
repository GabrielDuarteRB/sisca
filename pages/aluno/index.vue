<template>
    <ValidadoresAluno>
        <div class="container-aluno-escolhas">
            <a @click="loggout">
                <img class="icone" src="../../assets/icons/sair.png" alt="Icone sair">
                SAIR
            </a>

            <NuxtLink to="/escolher">
                <img class="icone" src="../../assets/icons/voltar.png" alt="Icone voltar">
                VOLTAR PARA ESCOLHAS
            </NuxtLink>

            <NuxtLink to="/aluno/dados-cadastrais">
                <img class="icone" src="../../assets/icons/dados-cadastrais.png" alt="Icone do dados cadastrais">
                DADOS CADASTRAIS
            </NuxtLink>

            <NuxtLink to="/aluno/turmas">
                <img class="icone" src="../../assets/icons/livro.png" alt="Icone de turma">
                TURMAS
            </NuxtLink>
        </div>
    </ValidadoresAluno>
</template>

<script>

import LocalStorage from '@/utils/LocalStorage.js'

export default {
    async mounted() {
        const id = LocalStorage.pegarIdUsuario()
        if(!id) {
            this.$router.replace({ path: '/' })
        }
    },
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