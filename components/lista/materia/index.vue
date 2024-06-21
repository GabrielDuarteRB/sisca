<template>
    <div class="materias-container">
        <Lista>
            <li v-for="materia in materias" :key="materia.id_materia" class="materia-item">
                <div class="materia-info">
                    <p><strong>Nome:</strong> {{ materia.nome }}</p>
                </div>
                <button class="edit-button clique" @click="() => editarMateriaModal(materia)">Editar</button>
            </li>
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
import Materia from "@/service/Materia.js";

export default {
    data() {
        return {
            modalAberto: false,
            materiaEditar: {},
            mensagem: ''
        };
    },
    props: {
        materias: Array
    },
    methods: {
        fecharModal() {
            this.modalAberto = false;
        },
        editarMateriaModal(materia) {
            this.materiaEditar = materia;
            this.modalAberto = true;
        },
        editarMateria(e) {
            if (e.nome === this.materiaEditar.nome) {
                this.mensagem = "Nome da matéria idêntico";
                return;
            }

            let dados = {
                id_materia: this.materiaEditar.id_materia,
                nome: e.nome
            };

            Materia.atualizarMateria(dados).then(response => {
                this.mensagem = "Matéria atualizada com sucesso";
                this.$emit("pegarMaterias");

                setTimeout(() => {
                    this.fecharModal();
                    this.mensagem = '';
                }, 2000);
            }).catch(error => {
                this.mensagem = "Erro ao atualizar a matéria";
            });
        }
    }
};
</script>

<style scoped>
    .materias-container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #f9f9f9;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .materia-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #fff;
        margin-bottom: 10px;
        padding: 15px;
        border: 1px solid #ddd;
        border-radius: 4px;
    }

    .materia-info p {
        margin: 5px 0;
    }

    .edit-button {
        background-color: #007bff;
        color: #fff;
        padding: 8px 12px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .edit-button:hover {
        background-color: #0056b3;
    }
</style>
