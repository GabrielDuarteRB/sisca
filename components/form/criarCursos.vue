<template>
    <form @submit.prevent="enviarFormulario">
        <h3 v-if="mensagem">{{mensagem}}</h3>
        <div>
            <label>Nome do curso</label>
            <input v-model="nome" />
            <span v-if="nomeValid">{{ nomeValid }}</span>
        </div>

        <div>
            <label>Periodos</label>
            <input v-model="periodos" @input="permitirApenasNumeros" />
            <span v-if="periodosValid">{{ periodosValid }}</span>
        </div>

        <button type="submit" >Enviar</button>
    </form>
</template>

<script>

import Validation from '@/utils/Validation.js'

export default {
    data() {
        return {
            nome: '',
            nomeValid: '',
            periodos: 0,
            periodosValid: '',
        }
    },
    props: {
        sucesso: Boolean,
        mensagem: String,
        nomeProps: String,
        periodosProps: Number,
    },
    mounted() {
        this.nome = this.nomeProps ? this.nomeProps : ''
        this.periodos = this.periodosProps ? this.periodosProps : 0
    },
    methods: {
        enviarFormulario() {
            if(this.validarFormulario()) return


            const teste = this.$emit('enviarFormulario', {
                nome: this.nome,
                periodos: this.periodos
            })

        },
        validarFormulario() {
            this.nomeValid = Validation.isRequired(this.nome) ? '' : 'Nome é obrigatorio'
            this.periodosValid = Validation.isMoreThan(this.periodos, 4) ? 'Quantidade de periodos minimo é 4' : ''

            return this.nomeValid !== '' || this.periodosValid !== ''
        },
        permitirApenasNumeros(event) {
            const valor = event.target.value;
            const valorApenasNumeros = valor.replace(/\D/g, '');
            this.periodos = valorApenasNumeros;
        },
        limparCampos() {
            this.nome = ''
            this.nomeValid = ''
            this.periodos = ''
            this.periodosValid = ''
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

div {
    display: flex;
    flex-direction: column;
    padding: 8px;
}

input {
    width: 250px;
}

</style>