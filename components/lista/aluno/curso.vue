<template>
    <div>
        <Lista v-for="u in cursoData" :key="u.cpf">
            <li>Nome do Curso: {{u.nome}}</li>
            <li>Cursando periodo: {{u.periodo}}</li>
            <li>Ano matricula: {{u.ano_matricula}}</li>
            <li>Situacao: {{u.situacao}}</li>
            <li>Materias:</li>
            <ul v-for="materia in u.materias" :key="materia.nome">
                <li>{{materia.nome}}</li>
                <ul>
                    <li>Periodo: {{materia.periodo}}</li>
                    <li>Frequencia: {{materia.frequencia}}</li>
                    <li>P1: {{materia.p1}}</li>
                    <li>P2: {{materia.p2}}</li>
                    <li>
                        <span class="editar" @click="() => abrirModal(materia)">Editar</span>
                    </li>
                </ul>
            </ul>
        </Lista>
        <modalEditarAlunoCurso v-if="verModal" :data="conteudoModal" @fecharModal="fecharModal" />
    </div>
</template>

<script>

export default {
    data() {
        return {
            cursoData: [
                {id: 1, nome: "Sistema de informacao", periodo: '2 periodo', ano_matricula: '2022.1', situacao: 'cursando', materias: 
                    [
                        {nome: 'banco de dados', periodo: '2 periodo', frequencia: "2 faltas", p1: 7, p2: 8.5}, 
                        {nome: 'engenharia de software', periodo: '3 periodo', frequencia: "2 faltas", p1: 7, p2: 8.5}
                    ]
                },

            ],
            verModal: false,
            conteudoModal: {}
        }
    },
    methods: {
        abrirModal(dados) {
            this.conteudoModal = dados
            this.verModal = true
        },
        fecharModal() {
            this.conteudoModal = []
            this.verModal = false
        }
    }
}

</script>

<style scoped>

.editar {
    cursor: pointer;
}

</style>