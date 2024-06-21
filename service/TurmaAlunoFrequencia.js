import useHttp from "../composable/useHttp"

class TurmaAlunoFrequencia {
    constructor() {
        this.baseURL = 'nota'
    }

    async criarFalta(idTurma, idAluno, data) {
        try {
            const falta = await useHttp.post(
                `${this.baseURL}?idTurma=${idTurma}&idAluno=${idAluno}`,
                data
            )

            return falta
        } catch (e) {
            console.log(e)
        }
    }

    async deletarFrequencia(idTurma, idAluno, falta) {
        try {
            await useHttp.delete(
                `${this.baseURL}?idTurma=${idTurma}&idAluno=${idAluno}&falta=${falta}`
            )
        } catch (e) {
            console.log(e)
        }
    }
}

export default new TurmaAlunoFrequencia()