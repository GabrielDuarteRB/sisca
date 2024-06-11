<template>
    <section>
        <NuxtLink to="/admin/">Voltar para home</NuxtLink>
        <br>
        <NuxtLink to="/admin/cursos/cadastrar">Cadastrar um novo curso</NuxtLink>
        <listaCurso 
            v-for="curso in cursos" 
            :key="curso.id_curso"
            :id_curso="curso.id_curso"
            :nome="curso.nome"
            :periodos="curso.periodos"
        />
    </section>
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