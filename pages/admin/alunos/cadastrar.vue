<template>
    <section>
        
        <NuxtLink to="/admin/alunos"> <- Voltar para o painel dos alunos</NuxtLink>

        <h1>Cadastrar aluno</h1>
        
        <formCriarAluno
        />
    </section>
</template>

<script>


export default {

    data() {
        return {
            usuarioCriado: ''
        }
    },
    methods: {
        criarUsuario(e) {

            console.log(e)

            this.usuarioCriado = 'Usuario Criado com sucesso'
            setTimeout(() => {
                this.usuarioCriado = ''
            }, 3000) 

        },
    }
}

</script>



