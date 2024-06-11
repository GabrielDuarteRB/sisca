<template>
    <div>
        <NuxtLink to="/aluno">Menu Principal</NuxtLink>

        <ListaAlunoTurmas 
            :turmas="turmas" 
        />
    </div>
</template>

<script>

export default {
    data() {
        return {
            turmas: [
                {
                   materia: 'Logica Computacional',
                   semestre_turma: '2023.2',
                   status: 'Cursando',
                   frequencia: '8',
                   p1: 8,
                   p2: 5
                },
                {
                   materia: 'Logica Computacional',
                   semestre_turma: '2023.2',
                   status: 'Cursando',
                   frequencia: '8',
                   p1: 8,
                   p2: 5
                },
            ]
        }
    }
}

</script>