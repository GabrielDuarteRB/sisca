<template>
    <div>
        <Lista v-for="m in materias" :key="m.id_materia">
    
            <li>Nome: {{m.nome}}</li>
            <li class="clique" @click="() => editarMateriaModal(m)">Editar</li>
    
        </Lista>
        
        <Modal @fecharModal="fecharModal" v-if="modalAberto">
            <FormCriarEEditarMateria 
                @enviarFormulario="editarMateria" 
                :mensagem="mensagem" 
                :materiaProp="materiaEditar"
            />
        </Modal>
    </div>
</template>

<script>

import Materia from "@/service/Materia.js"

export default {
    data() {
        return {
            modalAberto: false,
            materiaEditar: {},
            mensagem: ''
        }
    },
    props: {
        materias: Array
    },
    methods: {
        fecharModal() {
            this.modalAberto = false
        },
        editarMateriaModal(materia) {
            this.materiaEditar = materia
            this.modalAberto = true
        },
        editarMateria(e) {
            if(e.nome == this.materiaEditar.nome) return this.mensagem = "Nome da materia identico"
        
            let dados = {}
            dados.id_materia = this.materiaEditar.id_materia
            dados.nome = e.nome

            Materia.atualizarMateria(dados).then(response => {
                this.mensagem = "Materia criada com sucesso"
                this.$emit("pegarMaterias")

                setTimeout(() => {
                    this.fecharModal()
                    this.mensagem = ''
                }, 2000);
            })
        }
    }
}


</script>

<style scoped>



</style>