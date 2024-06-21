<template>
    <ValidadoresTecnico>
        <div class="header-container">
            <NuxtLink to="/admin/cursos" class="back-link">← Voltar para a tela de cursos</NuxtLink>
            <span @click="modalAdicionarMateriaAberto = true"  to="/admin/cursos/cadastrar" class="add-student-link">Cadastrar nova materia</span>
        </div>
        <div v-if="curso">
            <h1>{{curso.nome}}</h1>

            <ListaMateriaCursoMateria 
                @pegarCurso="pegarCurso"
                :cursoGradesPorPeriodo="cursoGradesPorPeriodo"
                :idCurso="idCurso"
                v-if="cursoGradesPresentes"
            />

            <h3 v-else>Esse curso nao apresenta materias ainda</h3>
        </div>


        <ModalAdicionarMateriaCurso 
            @fecharModal="fecharModal"
            @pegarCurso="pegarCurso"
            v-if="modalAdicionarMateriaAberto"
            :id_curso=curso.id_curso
        />
        
    </ValidadoresTecnico>
</template>

<script>

import Cursos from '@/service/Cursos.js'

export default {
    data() {
        return {
            curso: {},
            modalAdicionarMateriaAberto: false,
            idCurso: null
        }
    },
    async created() {
        await this.pegarCurso()
    },
    computed: {
        cursoGradesPorPeriodo() {
            const cursoGradesPorPeriodo = {};
            
            if(!this.curso || !this.curso.cursoGrades) return {};
            
            this.curso?.cursoGrades.forEach(cursoGrade => {
                const periodo = cursoGrade.periodo;
                if (!cursoGradesPorPeriodo[periodo]) {
                cursoGradesPorPeriodo[periodo] = [];
                }
                cursoGradesPorPeriodo[periodo].push(cursoGrade);
            });

            return cursoGradesPorPeriodo;
        },
        cursoGradesPresentes() {
            return Object.keys(this.cursoGradesPorPeriodo).length > 0;
        }
    },
    methods: {
        fecharModal() {
            this.modalAdicionarMateriaAberto = false
        },
        async pegarCurso() {
            this.idCurso = this.$route.params.idCurso
            this.curso = await Cursos.listarUmCurso(this.idCurso)
        }
    }
}

</script>

<style>

h1, h3 {
    text-align: center;
}

.cadastrarMateria {
    cursor: pointer;
}

</style>