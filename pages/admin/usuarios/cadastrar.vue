<template>
    <section>
        
        <NuxtLink to="/admin/usuarios"> <- Voltar para os usuarios</NuxtLink>

        <h1>Cadastrar usuario</h1>
        
        <formUsuario 
            @formularioEnviado="criarUsuario"
            :mensageToSend="usuarioCriado"
        />
    </section>
</template>

<script>

import usuario from '@/service/Usuario.js'
import formatted from '@/utils/Formatted.js'

export default {

    data() {
        return {
            usuarioCriado: ''
        }
    },
    methods: {
        criarUsuario(e) {

            const [dia, mes, ano] = e.data_nascimento.split('/')
            const dataObj = `${ano}-${mes}-${dia}T00:00:00`;

            e.data_nascimento = dataObj
            e.cpf = formatted.limparCaracteres(e.cpf, ".()- ")
            e.telefone = formatted.limparCaracteres(e.telefone, ".()- ")

            usuario.cadastrarUsuario(e)


            this.usuarioCriado = 'Usuario Criado com sucesso'
            setTimeout(() => {
                this.usuarioCriado = ''
            }, 3000) 

        },
    }
}

</script>



