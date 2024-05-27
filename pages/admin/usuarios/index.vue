<template>
    <section>
        <NuxtLink to="/admin"> <- Voltar para o painel principal</NuxtLink>
        </br>
        <NuxtLink to="/admin/usuarios/cadastrar">Cadastrar novo usuario</NuxtLink>
        <h3 v-if="mensagem">{{mensagem}}</h3>
        <listaUsuario 
            v-else 
            @atualizarLista="atualizarLista" 
            :usuarioData="usuario"
        >
        </listaUsuario>
    </section>
</template>

<script>

import usuario from '@/service/Usuario.js'

export default {
    data() {
        return {
            usuario: [],
            mensagem: "Aguarde! Trazendo usuarios"
        }
    },
    async created() {
        this.usuario = await usuario.listarUsuarios().then((response) => {
            this.mensagem = ''
            return response
        }).catch(e => {
            this.mensagem = "Erro ao trazer usuarios"
        })
    },
    methods: {
        async atualizarLista() {
            console.log('atualizando')
            this.usuario = await usuario.listarUsuarios()
        }
    }
}

</script>