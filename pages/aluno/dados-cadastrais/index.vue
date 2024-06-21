<template>
    <ValidadoresAluno>
        <DadosCadastrais>
            <NuxtLink class="menu" to="/aluno">
                <img src="../../../assets/icons/voltar.png" alt="Icone de voltar">
            </NuxtLink>
            <h1>Dados Cadastrais</h1>
            <div class="dados-cadastrais">
                <div class="dados-cadastrais-juntos">
                    <div>
                        <p>Nome</p>
                        <span>{{this.aluno.nome}}</span>
                    </div>

                    <div>
                        <p>Email</p>
                        <span>{{this.aluno.email}}</span>
                    </div>

                    <div>
                        <p>Telefone</p>
                        <span>{{this.aluno.telefone}}</span>
                    </div>
                </div>

                <div class="dados-cadastrais-juntos">
                    <div>
                        <p>Nascido em</p>
                        <span>{{this.aluno.ano_matricula}}</span>
                    </div>
                    
                    <div>
                        <p>Matriculado em</p>
                        <span>{{this.aluno.data_nascimento}}</span>
                    </div>

                    <div>
                        <p>Matricula</p>
                        <span>{{this.aluno.matricula_aluno}}</span>
                    </div>

                </div>

                <div class="dados-cadastrais-juntos">
                    <div v-if="this.aluno.cursos">
                        <p>Cursando</p>
                        <span>{{this.aluno.cursos[0].nome}}</span>
                    </div>
                    
                    <div v-if="this.aluno.cursos">
                        <p>Periodos</p>
                        <span>{{this.aluno.cursos[0].periodos}}</span>
                    </div>

                </div>
            </div>
        </DadosCadastrais>
    </ValidadoresAluno>
</template>

<script>

import Aluno from '@/service/Aluno.js'
import LocalStorage from '@/utils/LocalStorage.js'

export default {
    data() {
        return {
            aluno: []
        }
    },
    async mounted() {
        const id = LocalStorage.pegarIdUsuario()
        if(!id) {
            this.$router.replace({ path: '/' })
        }

        await this.buscarAluno(id)
    },
    methods: {
        async buscarAluno(id) {
            this.aluno = await Aluno.pegarAlunoPorUsuario(id)
            console.log(this.aluno.cursos)
        },
        loggout() {
            LocalStorage.removerIdUsuario()
            this.$router.replace({ path: '/' })
        }
    }
}

</script>
