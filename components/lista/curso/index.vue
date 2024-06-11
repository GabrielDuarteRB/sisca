<template>
    <Lista>
        <li>Nome: {{nome}}</li>
        <li>Periodos: {{periodos}}</li>
        <li @click="modalAberto = true" >
            <span class="editar">
                Editar
            </span>
        </li>
        <li>
            <NuxtLink :to="'/admin/cursos/' + id_curso + '/materias/'">
                Materias
            </NuxtLink>
        </li>

        <ModalEditarCurso 
            v-if="modalAberto" 
            @fecharModal=fecharModal
            :nome="nome"
            :id_curso="id_curso"
            :periodos="periodos"
        />
    </Lista>
</template>

<script>

export default {
    data() {
        return {
            modalAberto: false
        }
    },
    props: {
        nome: String,
        id_curso: Number,
        periodos: Number
    },
    methods: {
        fecharModal() {
            this.modalAberto = false
        }
    }
}

</script>

<style scoped>

.editar { 
    color: blue;
    cursor: pointer;
}

</style>