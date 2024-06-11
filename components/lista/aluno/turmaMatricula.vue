<template>
    <div>
        <Lista v-for="(turma, index) in turmas" :key="index">
            <li>Materia: {{turma.materia}}</li>
            <li @click="() => matricular(turma)" class="clicar">Fazer Matricula</li>
        </Lista>
    </div>
</template>

<script>

export default {
    props: {
        turmas: Array
    },
    methods: {
        matricular(turma) {
            this.$emit('fazerMatricula', turma.idMateria)
        }
    }
}

</script>

<style scoped>

.clicar {
    cursor: pointer;
}

</style>
