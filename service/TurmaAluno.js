import useHttp from "../composable/useHttp"

class TurmaAluno {

    constructor() {
        this.baseURL = 'situacaoAlunoTurma'
    }

    async listarAlunosPorTurma(idTurma) {
        try {
            const turma = await useHttp.get(`${this.baseURL}/${idTurma}`)

            return turma.data
        } catch (e) {
            console.log(e)
        }
    }

    async pegarTurmasDoAluno(idAluno) {
        try {
            const turma = await useHttp.get(`${this.baseURL}/aluno/${idAluno}`)

            return turma.data
        } catch (e) {
            console.log(e)
        }
    }

    async trancarAluno(idTurma, idAluno) {
        try {
            const turma = await useHttp.put(
                `${this.baseURL}/trancarMatricula?id_turma=${idTurma}&id_aluno=${idAluno}`
            )

            return turma
        } catch (e) {
            console.log(e)
        }
    }

    async criarAlunoNaTurma(idTurma, idAluno) {
        try {
            const turma = await useHttp.post(
                `${this.baseURL}/cadastrarEmTurma?id_turma=${idTurma}&id_aluno=${idAluno}`
            )

            return turma
        } catch (e) {
            console.log(e)
        }
    }

    async deletarTurmaAluno(idTurma, idAluno) {
        try {
            const turma = await useHttp.delete(
                `${this.baseURL}/deletar?id_turma=${idTurma}&id_aluno=${idAluno}`
            )

            return turma
        } catch (e) {
            console.log(e)
        }
    }

}

export default new TurmaAluno()