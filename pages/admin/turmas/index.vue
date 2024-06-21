<template>
    <ValidadoresTecnico>
        <div class="header-container">
            <NuxtLink to="/admin" class="back-link">← Voltar para o painel principal</NuxtLink>
            <span @click="modalAberto = true" class="add-teacher-link">Cadastrar uma nova turma</span>
        </div>      

        <ListaTurma
            @pegarTurmas=pegarTurmas
            :turmas="turmas"
        />

        <Modal v-if="modalAberto" @fecharModal="fecharModal">
            <FormCriarTurma
                :mensagem="mensagem"
                @enviarFormulario="criarMateria"
            />
        </Modal>
    </ValidadoresTecnico>
</template>

<script>

import Turma from '@/service/Turma.js'

export default {
    data() {
        return {
            modalAberto: false,
            turmas: [],
            mensagem: ''
        }
    },
    async created(){
        await this.pegarTurmas()
    },
    methods: {
        async pegarTurmas() {
            this.turmas = await Turma.listarTurmas()
        },
        async criarMateria(e) {
            await Turma.cadastrarTurma(e).then(response => {
                this.mensagem = 'Turma criada com sucesso'

                this.pegarTurmas()

                setTimeout(() => {
                    this.fecharModal()
                    this.mensagem = ""
                }, 1500)
            })
        },
        fecharModal() {
            this.modalAberto = false
        }
    }
}

</script>

<style scoped>





</style>