<template>
    <div>
        <Lista v-for="a in alunos" :key="a.matricula">
            <li>Nome: {{a.nome}}</li>
            <li>CPF: {{a.cpf}}</li>
            <li>Matricula: {{a.matricula_aluno}}</li>
            <li>Ano matricula: {{a.ano_matricula}}</li>
            <li>Curso:</li>
            <ul v-for="curso in a.cursos" :key="curso.nome">
                <li >
                    <NuxtLink :to="'/admin/lista/curso/' + curso.idCurso + '/' + a.matricula">
                        {{curso.nome}}
                    </NuxtLink>
                </li>
                
            </ul>
            <ul v-if="!a.cursos.length">
                <li class="clique" @click="() => abriModal(a.id_aluno)">Adicionar Curso</li>
            </ul>
        </Lista>

        <Modal v-if="modalAberto">
            <formCadastrarAlunoCurso 
                @enviarFormulario="cadastraAlunoCurso" 
                :mensagem="mensagem"
            />
        </Modal>
    </div>
</template>

<script>

import AlunoCurso from "@/service/AlunoCurso.js"

export default {
    data() {
        return {
            modalAberto: false,
            idAluno: '',
            mensagem: ''
        }
    },  
    props: {
        alunos: Array
    },
    methods: {
        abriModal(id_aluno) {
            this.idAluno = id_aluno
            this.modalAberto = true
        },
        async cadastraAlunoCurso(dados) {
            await AlunoCurso.cadastrarAlunoCurso(dados, this.idAluno).then(async response => {
                this.mensagem = 'Aluno cadastrado no curso com sucesso';
                this.$emit("listarNovamente")

                setTimeout(() => {
                    this.modalAberto = false
                }, 2000)
            }).catch(e => {
                this.mensagem = 'Erro no cadastro';
            })  
        }
    } 
}

</script>

<style>

.clique {
    color: blue;
    cursor: pointer
}

</style>