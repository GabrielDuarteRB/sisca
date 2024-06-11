<template>
    <div>
        <h2 v-if="mensageToSend">{{mensageToSend}}</h2>
        <form @submit.prevent="enviarFormulario" >
            <div>
                <label>CPF do Aluno:</label> 
                <input v-model="cpf" >
            </div>
            <span v-if="!cpfValid">Digite um cpf valido</span>

            <div>
                <label>Ano de matricula:</label> 
                <input v-model="ano_matricula" >
            </div>
            <span v-if="!ano_matriculaValid">Digite um ano de matricula valido</span>

            <button type="submit" >Enviar</button>
        </form>
    </div>
</template>

<script>

import Validation from '@/utils/Validation.js'
 
export default {
    data() {
        return {
            cpf: '',
            cpfValid: true,
            ano_matricula: '',
            ano_matriculaValid: true
        }
    },
    props: {
        mensageToSend: String
    },
    methods: {
        enviarFormulario() {
            if(!this.validForm()) return
            
            this.$emit('formularioEnviado', {
                cpf :this.cpf,
                ano_matricula: this.ano_matricula
            })

            // this.cleanFields();
        },
        validForm() {
            this.ano_matriculaValid = Validation.isRequired(this.ano_matricula)
            this.cpfValid = Validation.isCPFValid(this.cpf)

            return this.cpfValid && this.ano_matriculaValid
        },
        cleanFields() {
            this.cpf = ''
            this.cpfValid = true
            this.ano_matricula =  ''
            this.ano_matriculaValid =  true
        }
    }
}

</script>

<style scoped> 

    h2 {
        color: green;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    button {
        cursor: pointer;
        width: 250px;
    }

    span {
        color: red;
    }

    select {
        width: 250px;
    }

    .encontrado {
        color: green
    }
</style>