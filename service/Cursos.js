import useHttp from "../composable/useHttp"

class Cursos {

    constructor() {
        this.baseURL = 'cursos'
    }

    async listarCursos() {
        try {
            const cursos = await useHttp.get(`${this.baseURL}/listarTodos`)

            return cursos.data
        } catch (e) {
            console.log(e)
        }
    }

    async listarUmCurso(id) {
        try {
            const curso = await useHttp.get(`${this.baseURL}/${id}`)

            return curso.data
        } catch (e) {
            console.log(e)
        }
    }

    async cadastrarCurso(data) {
        try {
            const curso = await useHttp.post(`${this.baseURL}/cadastrar`, data)

            return curso
        } catch (e) {
            console.log(e)
            return e
        }
    }

    async atualizarCurso(data) {
        try {
            const curso = await useHttp.put(`${this.baseURL}/atualizar`, data)

            return curso
        } catch (e) {
            console.log(e)
        }
    }

}

export default new Cursos()