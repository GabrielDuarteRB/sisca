<template>
    <div>
        <Lista v-for="(turma, index) in turmas" :key="index">
            <li>Materia: {{turma.materia}}</li>
            <li>Semestre: {{turma.semestre_turma}}</li>
            <li>Status: {{turma.status}}</li>
            <li>Frequencia: {{turma.frequencia}} faltas</li>
            <li>p1: {{turma.p1}}</li>
            <li>p2: {{turma.p2}}</li>
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
