<template>
    <ValidadoresTecnico>
        <div class="header-container">
            <NuxtLink to="/admin" class="back-link">← Voltar para o painel principal</NuxtLink>
            <span  @click="modalAberto = true" class="add-student-link">Cadastrar Nova Materia</span>
        </div>

        <ListaMateria :materias="materias" @pegarMaterias="listarMaterias" />

        <Modal @fecharModal="fecharModal" v-if="modalAberto">
            <FormCriarEEditarMateria @enviarFormulario="cadastrarMateria" :mensagem="mensagem" />
        </Modal>
    </ValidadoresTecnico>
</template>

<script>

import Materia from "@/service/Materia.js"

export default {
    data() {
        return {
            modalAberto: false,
            mensagem: '',
            materias: []
        }
    },
    async created() {
        await this.listarMaterias()
    },
    methods: {
        cadastrarMateria(e) {
            Materia.cadastrarMateria(e).then(response => {

                this.mensagem = "Materia criada com sucesso"
                this.listarMaterias()

                setTimeout(() => {
                    this.fecharModal()
                    this.mensagem = ''
                }, 2000);
            }).catch(() => {
                this.mensagem = "Nao foi possivel criar a materia"
            })
        },
        fecharModal() {
            this.modalAberto = false
        },
        async listarMaterias() {
            this.materias = await Materia.listarMaterias()
        }
    }   

}

</script>

<style scoped>

.header-container {
    align-items: center;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    padding: 10px;
}

.back-link,
.add-student-link {
    color: #007bff;
    cursor: pointer;
    font-weight: bold;
    text-decoration: none;
}

.back-link:hover,
.add-student-link:hover {
    text-decoration: underline;
}
</style>