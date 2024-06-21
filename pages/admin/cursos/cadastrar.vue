<template>
    <ValidadoresTecnico>
        <NuxtLink class="menu" to="/admin/cursos">
            <img src="../../../assets/icons/voltar.png" alt="Icone de voltar">
        </NuxtLink>

        <formCriarCursos 
            @enviarFormulario="enviarFormulario" 
            :sucesso="sucesso" 
            :mensagem="mensagem"
            class="form"
        />
    </ValidadoresTecnico>
</template>

<script>

import Curso from '@/service/cursos.js'

export default {
    data() {
        return {
            sucesso: false,
            mensagem: ''
        }
    },
    methods: {
        enviarFormulario(e) {
            console.log(e)

            Curso.cadastrarCurso(e).then(response => {
                this.mensagem = 'Criado com sucesso'
                this.sucesso = true
            }).catch(e => {
                this.mensagem = 'Curso nao foi criado'
                this.sucesso = true    
            })

            setTimeout(() => {
                this.mensagem = ''
                this.sucesso = false
            }, 2500);
        }
    }
}

</script>

<style>

.form {
    margin-top: 48px;
}

</style>