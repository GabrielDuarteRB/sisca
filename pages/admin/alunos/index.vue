<template>
    <section>
        <NuxtLink to="/admin/"> <- Voltar para o painel principal</NuxtLink>
        </br>
        
        <NuxtLink to="/admin/alunos/cadastrar">Cadastrar novo aluno</NuxtLink>

        <br>
        <input type="text" v-model="cpf" placeholder="Digite o cpf para filtrar o aluno">

        <listaAluno 
            :alunos="listaDeAlunos"
            @listarNovamente="listarAlunos"
        />
    </section>
</template>

<script>

import Aluno from "@/service/Aluno.js"
import formatted from '@/utils/Formatted'

export default {
    data() {
        return {
            alunos: [],
            cpf: ''
        }
    },
    async created() {
        await this.listarAlunos()
    },
    computed: {
        listaDeAlunos() {
            if(this.cpf) {
                const cpfFormatted = formatted.limparCaracteres(this.cpf, ".()- ")
                return this.alunos.filter((u) => u.cpf.includes(cpfFormatted))
            }

            return this.alunos
        }
    },
    methods: {
        async listarAlunos() {
            this.alunos = await Aluno.listarAlunos()
        }
    }
}

</script>