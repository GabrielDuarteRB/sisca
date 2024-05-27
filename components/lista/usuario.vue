<template>
    <div>
        <label for="">Adicione um cpf para pesquisar:</label>
        <input v-model="cpf" />

        <Lista v-for="u in listaDeUsuario" :key="u.cpf">
            <li>Nome: {{u.nome}}</li>
            <li>CPF: {{u.cpf}}</li>
            <li>Email: {{u.email}}</li>
            <li>Data Nascimento: {{formatted.formatarDataParaBr(u.data_nascimento)}}</li>
            <li>Roles: {{u.role}}</li>
            <li class="editar" @click="() => abrirModal(u)">Editar</li>
        </Lista>

        <ModalEditarUsuario
                v-if="modalAberto"
                @fecharModal="fecharModal"
                :nome=infosModal.nome
                :senha=infosModal.senha
                :cpf=infosModal.cpf
                :email=infosModal.email
                :telefone=infosModal.telefone
                :dataNascimento=infosModal.data_nascimento
                :role=infosModal.role
                :id_usuario=infosModal.id_usuario
        />
    </div>
</template>

<script>

import formatted from '@/utils/Formatted'

export default {
    data() {
        return {
            formatted: formatted,
            modalAberto: false,
            infosModal: {},
            cpf: ''
        }
    },
    props: {
        usuarioData: {
            type: Array,
        }
    },
    computed: {
        listaDeUsuario() {
            if(this.cpf) {
                const cpfFormatted = formatted.limparCaracteres(this.cpf, ".()- ")
                return this.usuarioData.filter((u) => u.cpf.includes(cpfFormatted))
            }

            return this.usuarioData
        }
    },
    methods: {
        abrirModal(e) {
            this.modalAberto = true
            this.infosModal = e
        },
        fecharModal({mudanca}) {
            this.modalAberto = false
            this.infosModal = {}
            console.log(mudanca)
            if(mudanca) {
                console.log('entrou')
                this.$emit("atualizarLista")
            }
        }
    }
}

</script>

<style scoped>

.editar {
    color: lightblue;
    cursor: pointer;
}

</style>