import useHttp from "../composable/useHttp"

class CursoGrade {

    constructor() {
        this.baseURL = 'cursoGrade'
    }

    // async listarMaterias() {
    //     try {
    //         const materia = await useHttp.get(`${this.baseURL}/listarTodas`)

    //         return materia.data
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }

    async cadastrarCursoGrade(data) {
        try {
            const cursoGrade = await useHttp.post(`${this.baseURL}/cadastrar`, data)

            return cursoGrade
        } catch (e) {
            console.log(e)
            return e
        }
    }

    async atualizarCursoGrade(data) {
        try {
            const cursoGrade = await useHttp.put(`${this.baseURL}/atualizar`, data)

            return cursoGrade
        } catch (e) {
            console.log(e)
        }
    }

    async deletarCursoGrade(idCurso, idMateria) {
        try {
            const cursoGrade = await useHttp.delete(`${this.baseURL}/deletar?idCurso=${idCurso}&idMateria=${idMateria}`)

            return cursoGrade
        } catch (e) {
            console.log(e)
        }
    }

}

export default new CursoGrade()