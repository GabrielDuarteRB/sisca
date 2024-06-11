<template>
    <section>
        <NuxtLink to="/admin/cursos"> <- Voltar para os cursos</NuxtLink>

        <formCriarCursos 
            @enviarFormulario="enviarFormulario" 
            :sucesso="sucesso" 
            :mensagem="mensagem"
        />
    </section>
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