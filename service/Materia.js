import useHttp from "../composable/useHttp"

class Materia {

    constructor() {
        this.baseURL = 'materia'
    }

    async listarMaterias() {
        try {
            const materia = await useHttp.get(`${this.baseURL}/listarTodas`)

            return materia.data
        } catch (e) {
            console.log(e)
        }
    }

    async cadastrarMateria(data) {
        try {
            const materia = await useHttp.post(`${this.baseURL}/cadastrar`, data)

            return materia
        } catch (e) {
            console.log(e)
            return e
        }
    }

    async atualizarMateria(data) {
        try {
            const materia = await useHttp.put(`${this.baseURL}/atualizar`, data)

            return materia
        } catch (e) {
            console.log(e)
        }
    }

}

export default new Materia()