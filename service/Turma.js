import useHttp from "../composable/useHttp"

class Turmas {

    constructor() {
        this.baseURL = 'turma'
    }

    async listarTurmas() {
        try {
            const turma = await useHttp.get(`${this.baseURL}/listarTodas`)

            return turma.data
        } catch (e) {
            console.log(e)
        }
    }

    async listarTurma(id) {
        try {
            const turma = await useHttp.get(`${this.baseURL}/${id}`)

            return turma.data
        } catch (e) {
            console.log(e)
        }
    }

    async listarTurmasPorProfessor(id) {
        try {
            const turma = await useHttp.get(`${this.baseURL}/professor/${id}`)

            return turma.data
        } catch (e) {
            console.log(e)
        }
    }

    async cadastrarTurma(data) {
        try {
            const turma = await useHttp.post(`${this.baseURL}/cadastrar`, data)

            return turma
        } catch (e) {
            console.log(e)
        }
    }

    async atualizarTurma(data) {
        try {
            const turma = await useHttp.put(`${this.baseURL}/atualizar`, data)

            return turma
        } catch (e) {
            console.log(e)
        }
    }

}

export default new Turmas()