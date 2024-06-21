import useHttp from "../composable/useHttp"

class TurmaAlunoNota {

    constructor() {
        this.baseURL = 'turmaAlunoNota'
    }

    async atualizarNota(idTurma, idAluno, data) {
        console.log(data)
        try {
            const nota = await useHttp.put(
                `${this.baseURL}?idTurma=${idTurma}&idAluno=${idAluno}`, data
            )

            return nota.data
        } catch (e) {
            console.log(e)
        }
    }


}

export default new TurmaAlunoNota()