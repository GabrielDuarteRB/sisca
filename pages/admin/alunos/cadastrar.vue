<template>
    <ValidadoresTecnico>
        
        <NuxtLink class="menu" to="/admin/alunos">
            <img src="../../../assets/icons/voltar.png" alt="Icone de voltar">
        </NuxtLink>

        <h1>Cadastrar aluno</h1>
        
        <formCriarAluno
            :mensageToSend="alunoCriado"
            @formularioEnviado="criarAluno"
        />
    </ValidadoresTecnico>
</template>

<script>

import Usuario from '@/service/Usuario.js'
import Aluno from '@/service/Aluno.js'
import Formatted from '@/utils/Formatted.js'

export default {

    data() {
        return {
            alunoCriado: '',
            usuarios: []
        }
    },
    async created() { 
        this.usuarios = await Usuario.listarUsuarios()
    },
    methods: {
        criarAluno(e) {

            e.cpf = Formatted.limparCaracteres(e.cpf, ".()- ")
            const alunoExiste = this.alunoAchado(e.cpf)

            if(!alunoExiste.length) {
                this.alunoCriado = 'Usuario não existe'
                setTimeout(() => {
                    this.alunoCriado = ''
                }, 3000) 
                return
            }


            Aluno.cadastrarAluno({
                matricula_aluno: alunoExiste[0].id_usuario,
                status: 1,
                ano_matricula: e.ano_matricula,
            }, alunoExiste[0].id_usuario).then(response => {
                console.log(response)
                this.alunoCriado = 'Aluno criado com sucesso'
                setTimeout(() => {
                    this.alunoCriado = ''
                }, 3000) 
            }).catch(e => {
                console.log(e)
                this.alunoCriado = 'Aluno nao foi possivel ser criado'
                setTimeout(() => {
                    this.alunoCriado = ''
                }, 3000) 
            })
            
            
            

        },
        alunoAchado(cpf) {
            const cpfFormatted = Formatted.limparCaracteres(cpf, ".()- ")
            return this.usuarios.filter(usuario => usuario.cpf === cpfFormatted);
        }
    }
}

</script>

<style>

h1 {
    text-align: center;
}

</style>

