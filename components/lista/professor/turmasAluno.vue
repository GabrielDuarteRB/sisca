<template>
    <div>
        <Lista v-for="a in alunos" :key="a.matricula">
            <li>Nome: {{a.nome}}</li>
            <li>CPF: {{a.cpf}}</li>
            <li>Matricula: {{a.matricula}}</li>
            <li>Faltas: {{a.frequencia}}</li>
            <li>P1: {{a.p1}}</li>
            <li>P2: {{a.p2}}</li>
            <li @click="() => abrirModalNotas(a)">Cadastrar notas</li>
            <li @click="modalFrequenciaAberto = true">Cadastrar frequencia</li>
        </Lista>
        <ModalCadastrarProfessorNota 
            v-if="modalNotasAberto"  
            @fecharModal="fecharModal"
            @cadastrarNota="cadastrarNota"
            :infos="infosModalAberto"
            :notasValid="notasValid"
        />
        <ModalCadastrarProfessorFrequencia
            @cadastrarFrequencia="cadastrarFrequencia"
        />
    </div>
</template>

<script>

export default {
    props: {
        alunos: Array,
        modalNotasAberto: false,
        modalFrequenciaAberto: false,
        infosModalAberto: {},
        notasValid: ''
    },
    methods: { 
        fecharModal() {
            this.modalNotasAberto = false
            this.modalFrequenciaAberto = false
        },
        abrirModalNotas(e) {
            this.modalNotasAberto = true
            this.infosModalAberto = e
        },
        cadastrarNota(notas) {
            let notasData = {}
            if(!this.infosModalAberto.p1) notasData.p1 = notas.p1
            if(!this.infosModalAberto.p2) notasData.p2 = notas.p2

            if(
                notasData.p1 > 10 || 
                notasData.p1 < 0 || 
                notasData.p2 > 10 || 
                notasData.p2 < 0
            ) return this.notasValid = "As notas informadas tem que ser entre 0 e 10"

            console.log(notasData)
        },
        
        cadastrarFrequencia(e) {
            console.log(e)
        },
    }
}

</script>