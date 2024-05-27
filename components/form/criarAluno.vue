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
                <select name="" id="">
                    <option>Selecione um curso</option>
                </select>
            </div>

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
            curso: '',
            cursoValid: true
        }
    },
    props: {
        mensageToSend: String
    },
    methods: {
        enviarFormulario() {
            if(!this.validForm()) return

            console.log('enviado')
            
            this.$emit('formularioEnviado', {
                cpf :this.cpf,
                curso: this.curso
            })
            this.cleanFields();
        },
        validForm() {
            this.cursoValid = Validation.isRequired(this.curso)
            this.cpfValid = Validation.isCPFValid(this.cpf)

            return this.cpfValid && this.cursoValid
        },
        cleanFields() {
            this.curso = ''
            this.cursoValid = true
            this.cpf = ''
            this.cpfValid = true
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
</style>