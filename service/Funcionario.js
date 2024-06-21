import useHttp from "../composable/useHttp"

class Funcionario {

    constructor() {
        this.baseURL = 'funcionario'
    }

    async listarFuncionarioPorUsuario(id) {
        try {
            const funcionario = await useHttp.get(`${this.baseURL}/${id}`)

            return funcionario.data
        } catch (e) {
            console.log(e)
        }
    }

}

export default new Funcionario()