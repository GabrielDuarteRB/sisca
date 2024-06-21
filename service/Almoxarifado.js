import useHttp from "../composable/useHttp"

class Almoxarifado {

    constructor() {
        this.baseURL = 'almoxarifado'
    }

    async listarAlmoxarifado() {
        try {
            const alunos = await useHttp.get(`${this.baseURL}`)

            return alunos.data
        } catch (e) {
            console.log(e)
        }
    }

    async cadastrarAlmoxarifado(data) {
        try {
            const aluno = await useHttp.post(`${this.baseURL}/cadastrar`, data)

            return aluno
        } catch (e) {
            console.log(e)
        }
    }

    async pegarAlunoPorUsuario(id) {
        try {
            const aluno = await useHttp.get(`${this.baseURL}/usuario/${id}`)

            return aluno.data
        } catch (e) {
            console.log(e)
        }
    }
}

export default new Almoxarifado()