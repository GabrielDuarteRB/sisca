<template>
    <div>
        <Lista v-for="(t, index) in turmas" :key="index">
            <li>nome: {{t.materia_nome}}</li>
            <li>semestre: {{t.semestre_turma}}</li>
            <li>
                <NuxtLink :to="'/professor/turmas/' + t.id_turma">Ver mais</NuxtLink>
            </li>
        </Lista>
    </div>
</template>

<script>

export default {
    props: {
        turmas: Array
    }
}

</script>