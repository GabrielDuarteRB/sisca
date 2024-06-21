import useHttp from "../composable/useHttp"

class Professor {

    constructor() {
        this.baseURL = 'professor'
    }

    async listarProfessores() {
        try {
            const professores = await useHttp.get(`${this.baseURL}/listarTodos`)

            return professores.data
        } catch (e) {
            console.log(e)
        }
    }

    async cadastrarProfessor(data) {
        try {
            const professor = await useHttp.post(`${this.baseURL}/cadastrar`, data)

            return professor
        } catch (e) {
            console.log(e)
        }
    }

    async deletarProfessor(id) {
        try {
            const professor = await useHttp.delete(`${this.baseURL}/deletar?idProfessor=${id}`)

            return professor
        } catch (e) {
            console.log(e)
        }
    }

}

export default new Professor()