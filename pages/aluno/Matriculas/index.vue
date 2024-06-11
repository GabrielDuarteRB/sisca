<template>
    <div>
        <NuxtLink to="/aluno">Menu Principal</NuxtLink>

        <ListaAlunoTurmaMatricula 
            @fazerMatricula="fazerMatricula"
            :turmas=turmas 
        />

        <Modal 
            v-if="modalAberto"
            @fecharModal=fecharModal
        >
            <h3>Matricula feita com sucesso</h3>
        </Modal>
    </div>
</template>

<script>

export default {
    data() {
        return {
            turmas: [
                {
                    idMateria: 1,
                    materia: 'Logica Computacional',
                },
                {
                    idMateria: 2,
                    materia: 'Arquitetura de computadores',
                },
            ],
            modalAberto: false
        }
    },
    methods: {
        fazerMatricula(id) {
            console.log('id')
            this.modalAberto = true;
        },
        fecharModal() {
            this.modalAberto = false
        }
    }
}

</script>