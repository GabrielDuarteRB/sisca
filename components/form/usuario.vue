<template>
    <div>
        <h2 v-if="mensageToSend">{{mensageToSend}}</h2>
        <form @submit.prevent="enviarFormulario" >
            <div>
                <label for="nome">Nome:</label>
                <input v-model="nome" type="text" name="nome" id="">
            </div>
            <span v-if="!nomeValid">Digite um nome valido</span>

            <div  v-if="!esconderCampoSenha">
                <label for="senha">Senha:</label>
                <input v-model="senha" type="text" name="senha" id="">
            </div>
            <span v-if="!senhaValid && !esconderCampoSenha">Digite uma senha com mais de 6 digitos</span>

            <div>
                <label for="cpf">CPF:</label>
                <input v-model="cpf" type="text" name="cpf" id="">
            </div>
            <span v-if="!cpfValid">Digite um cpf valido</span>

            <div>
                <label for="email">Email:</label>
                <input v-model="email" type="text" name="email" id="">
            </div>
            <span v-if="!emailValid">Digite um email valido</span>

            <div>
                <label for="telefone">Telefone:</label>
                <input v-model="telefone" type="text" name="telefone" id="">
            </div>
            <span v-if="!telefoneValid">Digite um telefone valido</span>

            <div>
                <label for="data_nascimento">Data de nascimento:</label>
                <input v-model="data_nascimento" type="text" name="data_nascimento" id="">
            </div>
            <span v-if="!dataNascimentoValid">Digite uma data valido</span>

            <span v-if="!dataNascimentoValid">Digite uma data valido</span>

            <select v-model="cargo">
                <option value="">Escolha um cargo</option>
                <option value="ALUNO">ALUNO</option>
                <option value="TECNICO">TECNICO</option>
                <option value="BIBLIOTECARIO">BIBLIOTECARIO</option>
                <option value="ALMOXARIFE">ALMOXARIFE</option>
                <option value="PROFESSOR">PROFESSOR</option>
            </select>

            <span v-if="!cargoValid">Selecione um cargo</span>

            <button type="submit" >Enviar</button>
        </form>
    </div>
</template>

<script>

import Validation from '@/utils/Validation.js'
import Formatted from '@/utils/Formatted.js'
 
export default {
    data() {
        return {
            nome: '',
            nomeValid: true,
            senha: '',
            senhaValid: true,
            cpf: '',
            cpfValid: true,
            email: '',
            emailValid: true,
            telefone: '', 
            telefoneValid: true,
            data_nascimento: '',
            dataNascimentoValid: true,
            cargo: '',
            cargoValid: true
        }
    },
    props: {
        nomeProps: String,
        senhaProps: String,
        cpfProps: String,
        emailProps: String,
        telefoneProps: String,
        dataNascimentoProps: String,
        roleProps: String,
        mensageToSend: String,
        esconderCampoSenha: {
            type: Boolean,
            default: false
        }
    },
    mounted() {
        this.nome = this.nomeProps ? this.nomeProps : this.nome
        this.cpf = this.cpfProps ? Formatted.formatarCpfColocarPontuacao(this.cpfProps) : this.cpf
        this.email = this.emailProps ? this.emailProps : this.email
        this.telefone = this.telefoneProps ? this.telefoneProps : this.telefone
        this.data_nascimento = this.dataNascimentoProps ? Formatted.formatarDataParaBr(this.dataNascimentoProps) : this.data_nascimento
        this.cargo = this.roleProps ? this.roleProps : this.cargp
    },
    methods: {
        enviarFormulario() {
            if(!this.validForm()) return

            console.log('enviado')
            
            this.$emit('formularioEnviado', {
                nome: this.nome,
                senha: this.senha,
                cpf :this.cpf,
                email :this.email,
                telefone :this.telefone, 
                data_nascimento :this.data_nascimento,
                role: this.cargo
            })
            this.cleanFields();
        },
        validForm() {
            this.nomeValid = Validation.isRequired(this.nome)
            this.senhaValid = this.esconderCampoSenha ? true : Validation.isPasswordValid(this.senha)
            this.cpfValid = Validation.isCPFValid(this.cpf)
            this.emailValid = Validation.isEmailValid(this.email)
            this.telefoneValid = Validation.isPhoneValid(this.telefone)
            this.dataNascimentoValid = Validation.isDataValid(this.data_nascimento)
            this.cargoValid = Validation.isRequired(this.cargo)

            return this.nomeValid && this.senhaValid && this.cpfValid && this.emailValid && this.telefoneValid && this.dataNascimentoValid && this.cargoValid
        },
        cleanFields() {
            this.nome = ''
            this.nomeValid = true
            this.senha = ''
            this.senhaValid = true
            this.cpf = ''
            this.cpfValid = true
            this.email = ''
            this.emailValid = true
            this.telefone = '',
            this.telefoneValid = true
            this.data_nascimento = ''
            this.dataNascimentoValid = true
            this.cargo = ''
            this.cargoValid = true
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

    select {
        width: 250px;
    }

    span {
        color: red;
    }
</style>