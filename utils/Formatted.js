class Formatted {
    formatarDataParaBr(data) {
        const dataObj = new Date(data);

        let dia = dataObj.getDate() + 1;
        dia = dia.toString().padStart(2, '0')
        const mes = (dataObj.getMonth() + 1).toString().padStart(2, '0'); // O mês começa em zero, por isso adicionamos 1
        const ano = dataObj.getFullYear();

        return `${dia}/${mes}/${ano}`;
    }

    limparCaracteres(str, caracteres) {
        const caracteresEscapados = caracteres.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
        
        const regex = new RegExp(`[${caracteresEscapados}]`, 'g');
        
        return str.replace(regex, '');
    }

    formatarCpfColocarPontuacao(cpf) {
        cpf = cpf.replace(/\D/g, '');

        if (cpf.length !== 11) {
            throw new Error('CPF deve ter 11 dígitos');
        }

        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    
}

export default new Formatted()