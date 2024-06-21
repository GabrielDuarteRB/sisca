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




.search-input {
    width: 100%;
    max-width: 400px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
}
</style>

