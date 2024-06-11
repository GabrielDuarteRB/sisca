<template>
    <div>
        <NuxtLink to="/professor/turmas">Voltar para as turmas</NuxtLink>

        <ListaProfessorTurmasAluno :alunos="alunos" />
    </div>
</template>

<script>

export default {
    data() {
        return  {
            alunos: [
                {
                    nome: "gabriel",
                    cpf: "1507472707",
                    matricula: "11111111111111111",
                    frequencia: "2",
                    p1: null,
                    p2: "10",
                },
                {
                    nome: "gabriel",
                    cpf: "1507472707",
                    matricula: "11111111111111111",
                    frequencia: "2",
                    p1: "2",
                    p2: "10",
                },
                {
                    nome: "gabriel",
                    cpf: "1507472707",
                    matricula: "11111111111111111",
                    frequencia: "2",
                    p1: "2",
                    p2: "10",
                },
                {
                    nome: "gabriel",
                    cpf: "1507472707",
                    matricula: "11111111111111111",
                    frequencia: "2",
                    p1: "2",
                    p2: "10",
                },
            ]
        }
    }
}

</script>