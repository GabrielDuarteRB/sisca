import useHttp from "../composable/useHttp"

class Livro {

    constructor() {
        this.baseURL = 'livros'
    }


    async criarLivro(data) {
        try {
            const livro = await useHttp.post(`${this.baseURL}/cadastrar`, data)

            return livro.data
        } catch (e) {
            console.log(e)
        }
    }

    async buscarLivros(data) {
        try {
            const livro = await useHttp.get(`${this.baseURL}`)

            return livro.data
        } catch (e) {
            console.log(e)
        }
    }

    async atualizarLivros(data) {
        try {
            const livro = await useHttp.put(`${this.baseURL}/atualizar`, data)

            return livro.data
        } catch (e) {
            console.log(e)
        }
    }
}

export default new Livro()