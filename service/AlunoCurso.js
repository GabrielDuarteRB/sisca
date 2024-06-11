import useHttp from "../composable/useHttp"

class AlunoCurso {

    constructor() {
        this.baseURL = 'alunoCurso'
    }

    async cadastrarAlunoCurso(data, idAluno) {
        try {
            const alunoCurso = await useHttp.post(`${this.baseURL}/${idAluno}/${data.curso}?ano_matricula=${data.ano_matricula}`)

            return alunoCurso
        } catch (e) {
            console.log(e)
            return e
        }
    }

}

export default new AlunoCurso()