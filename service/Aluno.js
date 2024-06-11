import useHttp from "../composable/useHttp"

class Aluno {

    constructor() {
        this.baseURL = 'alunos'
    }

    async listarAlunos() {
        try {
            const alunos = await useHttp.get(`${this.baseURL}`)

            return alunos.data
        } catch (e) {
            console.log(e)
        }
    }

    async cadastrarAluno(data, idUsuario) {
        try {
            const aluno = await useHttp.post(`${this.baseURL}?idUsuario=${idUsuario}`, data)

            return aluno
        } catch (e) {
            console.log(e)
            return e
        }
    }

    // async atualizarUsuario(data) {
    //     try {
    //         const usuario = await useHttp.put(`${this.baseURL}/atualizar`, data)

    //         return usuario
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }

}

export default new Aluno()