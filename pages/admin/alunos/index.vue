<template>
    <ValidadoresTecnico>
        <div class="header-container">
            <NuxtLink to="/admin" class="back-link">← Voltar para o painel principal</NuxtLink>
            <NuxtLink to="/admin/alunos/cadastrar" class="add-student-link">Cadastrar novo aluno</NuxtLink>
        </div>
        
        <listaAluno 
            :alunos="alunos"
            @listarNovamente="listarAlunos"
        />
    </ValidadoresTecnico>
</template>

<script>
import Aluno from "@/service/Aluno.js";
import formatted from '@/utils/Formatted';

export default {
    data() {
        return {
            alunos: [],
            cpf: ''
        };
    },
    async created() {
        await this.listarAlunos();
    },
    methods: {
        async listarAlunos() {
            this.alunos = await Aluno.listarAlunos();
        }
    }
};
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
    font-weight: bold;
    text-decoration: none;
}

.back-link:hover,
.add-student-link:hover {
    text-decoration: underline;
}

.search-input {
    width: 100%;
    max-width: 400px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
}
</style>

