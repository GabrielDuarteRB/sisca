<template>
    <div>
        <NuxtLink to="/professor">Voltar para a home</NuxtLink>

        <ListaProfessorTurmas
            :turmas=turmas
        />
    </div>
</template>

<script>

export default {
    data() {
        return {
            turmas: [
                {
                    id_turma: 1,
                    semestre_turma: '2023.2',
                    materia_nome: 'Arquitetura'
                },
                {
                    id_turma: 2,
                    semestre_turma: '2023.2',
                    materia_nome: 'Arquitetura'
                },
                {
                    id_turma: 3,
                    semestre_turma: '2023.2',
                    materia_nome: 'Arquitetura'
                },
            ]
        }
    }
}

</script>