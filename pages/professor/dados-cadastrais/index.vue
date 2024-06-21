<template>
    <ValidadoresProfessor>
        <NuxtLink class="menu" to="/professor">
            <img src="../../../assets/icons/voltar.png" alt="Icone de voltar">
        </NuxtLink>
        <DadosCadastrais>
            <h1>Dados Cadastrais</h1>

            <div class="dados-cadastrais">
                <div class="dados-cadastrais-juntos">
                    <div v-if="professor.usuario">
                        <p>Nome</p>
                        <span>{{professor.usuario.nome}}</span>
                    </div>
                    <div v-if="professor.usuario">
                        <p>Email</p>
                        <span>{{professor.usuario.email}}</span>
                    </div>
                </div>

                <div class="dados-cadastrais-juntos">
                    <div v-if="professor.usuario">
                        <p>cpf</p>
                        <span>{{professor.usuario.cpf}}</span>
                    </div>

                    <div v-if="professor.usuario">
                        <p>Matricula Professor</p>
                        <span>{{professor.matricula_funcionario}}</span>
                    </div>
                </div>
            </div>
        </DadosCadastrais>
    </ValidadoresProfessor>
</template>

<script>

import LocalStorage from '@/utils/LocalStorage.js'
import Funcionario from '@/service/Funcionario.js'

export default {
    data() {
        return {
            professor: []
        }
    },
    async mounted() {
        const id = LocalStorage.pegarIdUsuario()
        if(!id) {
            this.$router.replace({ path: '/' })
        }

        await this.buscarProfessor(id)
    },
    methods: {
        async buscarProfessor(id) {
            this.professor = await Funcionario.listarFuncionarioPorUsuario(id)
            console.log(this.professor)
        },
        loggout() {
            LocalStorage.removerIdUsuario()
            this.$router.replace({ path: '/' })
        }
    }
}

</script>