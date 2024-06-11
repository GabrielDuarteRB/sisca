class Utils {

    obterAnoESemestre() {
        const data = new Date();
        const ano = data.getFullYear();
        const mes = data.getMonth() + 1; // getMonth() retorna os meses de 0 a 11, então adicionamos 1
    
        const semestre = mes <= 6 ? 1 : 2; // Se o mês é de janeiro a junho, é o primeiro semestre; caso contrário, é o segundo semestre
    
        return `${ano}.${semestre}`;
    }
}

export default new Utils()