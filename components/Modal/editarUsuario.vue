<template>
    <Modal @fecharModal="fecharModal">
        <formUsuario 
            @formularioEnviado="atualizarUsuario"
            :mensageToSend="usuarioAtualizado"
            :nomeProps="nome"
            :cpfProps="cpf"
            :emailProps="email"
            :telefoneProps="telefone"
            :dataNascimentoProps="dataNascimento"
            :roleProps="role"
            :esconderCampoSenha="true"
        />
    </Modal>
</template>

<script>

    import Usuario from '@/service/Usuario.js'
    import formatted from '@/utils/Formatted.js'

    export default {
        data() {
            return {
                usuarioAtualizado: ''
            }
        },
        props: {
            nome: String,
            senha: String,
            cpf: String,
            email: String,
            telefone: String, 
            dataNascimento: String,
            role: String,
            id_usuario: Number,
        },
        methods: {
            fecharModal(mudanca = false) {
                this.$emit('fecharModal', {
                    mudanca
                })
            },

            async atualizarUsuario(e) {
                const [dia, mes, ano] = e.data_nascimento.split('/')
                const dataObj = `${ano}-${mes}-${dia}T00:00:00`;

                e.data_nascimento = dataObj
                e.cpf = formatted.limparCaracteres(e.cpf, ".()- ")
                e.telefone = formatted.limparCaracteres(e.telefone, ".()- ")
                e.id_usuario = this.id_usuario

                await Usuario.atualizarUsuario(e).then(() => {
                    this.usuarioAtualizado = 'Usuario Atualizado com sucesso'
                    setTimeout(() => {
                        this.fecharModal(true)
                    }, 2500)
                })
            }
        }
    }

</script>