<template>
    <ValidadoresTecnico>
        
        <NuxtLink class="menu" to="/admin/usuarios">
            <img src="../../../assets/icons/voltar.png" alt="Icone de voltar">
        </NuxtLink>

        <h1>Cadastrar usuario</h1>
        
        <formUsuario 
            @formularioEnviado="criarUsuario"
            :mensageToSend="usuarioCriado"
        />
    </ValidadoresTecnico>
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

<style>

h1 {
    text-align: center;
}

</style>