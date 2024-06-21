import useHttp from "../composable/useHttp"

class Emprestimo {

    constructor() {
        this.baseURL = 'api/emprestimos'
    }
    
    async listarEmprestimo() {
        try {
            const emprestimo = await useHttp.get(`${this.baseURL}`)

            return emprestimo.data
        } catch (e) {
            console.log(e)
        }
    }

    async cadastrarEmprestimo(data) {
        try {
            const emprestimo = await useHttp.post(`${this.baseURL}/cadastrar`, data)

            return emprestimo.data
        } catch (e) {
            console.log(e)
        }
    }

}

export default new Emprestimo()