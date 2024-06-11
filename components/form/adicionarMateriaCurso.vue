<template>
    <form @submit.prevent="enviarFormulario">
        <h3 v-if="mensagem">{{mensagem}}</h3>
        <select v-model="materiaSelecionada">
          <option value="">Escolha uma materia</option>
          <option 
              v-for="materia in materias" 
              :value="materia.id_materia"
          >
              {{ materia.nome }}
          </option>
        </select>
        <span v-if="materiaSelecionadaValid">{{materiaSelecionadaValid}}</span>

        <label>Periodo da materia: </label>
        <input v-model="periodo">
        <span v-if="periodoValid">{{periodoValid}}</span>

        <button>Salvar</button>
    </form>
</template>

<script>

import Validation from '@/utils/Validation.js'

export default {
    data() {
        return {
            materiaSelecionada: '',
            materiaSelecionadaValid: '',
            periodo: '',
            periodoValid: ''
        }
    },
    props: {
        materias: Array,
        sucesso: Boolean,
        mensagem: String,
    },
    methods: {
        enviarFormulario() {
            if(this.validarFormulario()) return


            this.$emit('enviarFormulario', {
                id_materia: this.materiaSelecionada,
                periodo: this.periodo
            })

        },
        validarFormulario() {
            this.materiaSelecionadaValid = Validation.isRequired(this.materiaSelecionada) ? '' : 'Nome é obrigatorio'
            this.periodoValid = Validation.isMoreThan(this.periodo, 1) ? 'Periodo tem que ser maior que zero' : ''

            return this.materiaSelecionadaValid !== '' || this.periodoValid !== ''
        },
        permitirApenasNumeros(event) {
            const valor = event.target.value;
            const valorApenasNumeros = valor.replace(/\D/g, '');
            this.periodo = valorApenasNumeros;
        },
        limparCampos() {
            this.materiaSelecionada = ''
            this.materiaSelecionadaValid = ''
            this.periodo = ''
            this.periodoValid = ''
        }
    },
    watch: {
        sucesso(newVal) {
            if(newVal) this.limparCampos()
        }
    }
}

</script>

<style scoped>

form {
    display: flex;
    flex-direction: column;
    padding: 8px;
}

input,
select {
    width: 250px;
}

</style>