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

<style scoped>





</style>