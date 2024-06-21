<template>
    <ValidadoresTecnico>
        <div class="header-container">
            <NuxtLink to="/admin" class="back-link">← Voltar para o painel principal</NuxtLink>
            <NuxtLink to="/admin/cursos/cadastrar" class="add-student-link">Cadastrar um novo curso</NuxtLink>
        </div>

        <listaCurso 
            :cursos="cursos"
            @pegarCursos="pegarCursos"
        />
    </ValidadoresTecnico>
</template>

<script>

import Cursos from '@/service/Cursos.js'

export default {
    data() {
        return {
            cursos: []
        }
    },
    created() {
        this.pegarCursos()
    },
    methods: {
        async pegarCursos() {
            this.cursos = await Cursos.listarCursos()
        }
    }
}

</script>

<style>

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