class Validation {

    isRequired(value) {
        if(value) return true

        return false
    }

    isPasswordValid(value) {
        if(value.length > 6) {
            return true
        }

        return false
    }

    isCPFValid(cpf) {
        cpf = cpf.replace(/[^\d]+/g,'');
        if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
            return false;
        }
        let soma = 0;
        let resto;

        for (let i = 1; i <= 9; i++) {
            soma += parseInt(cpf.substring(i-1, i)) * (11 - i);
        }
        resto = (soma * 10) % 11;
        if ((resto === 10) || (resto === 11)) {
            resto = 0;
        }
        if (resto !== parseInt(cpf.substring(9, 10))) {
            return false;
        }

        soma = 0;
        for (let i = 1; i <= 10; i++) {
            soma += parseInt(cpf.substring(i-1, i)) * (12 - i);
        }
        resto = (soma * 10) % 11;
        if ((resto === 10) || (resto === 11)) {
            resto = 0;
        }
        if (resto !== parseInt(cpf.substring(10, 11))) {
            return false;
        }

        return true;
    }

    isEmailValid(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;
        return re.test(email);
    }

    isPhoneValid(telefone) {
        const re = /^(?:\(?([1-9][0-9])\)?\s?)?([9]?[0-9]{4})\-?([0-9]{4})$/;
        return re.test(telefone)
    }

    isDataValid(data) {
        const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
        if (!regex.test(data)) {
            return false;
        }
        
        const [dia, mes, ano] = data.split('/').map(Number);

        const diasPorMes = [31, (ano % 4 === 0 && (ano % 100 !== 0 || ano % 400 === 0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        
        return dia <= diasPorMes[mes - 1];
    }

    isMoreThan(number, numberMin) {
        return number < numberMin
    }

    isBetweenThan(number, numberMin, numberMax) {
        return number > numberMin & number < numberMax
    }

    isStringLength(value, number) {
        return value.length == number
    }

}

export default new Validation()