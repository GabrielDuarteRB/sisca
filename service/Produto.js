import useHttp from "../composable/useHttp"

class Produto {

    constructor() {
        this.baseURL = 'api/produtos'
    }


    async criarProduto(data) {
        try {
            const produto = await useHttp.post(`${this.baseURL}/cadastrar`, data)

            return produto.data
        } catch (e) {
            console.log(e)
        }
    }

    async buscarProdutos(data) {
        try {
            const produtos = await useHttp.get(`${this.baseURL}`)

            return produtos.data
        } catch (e) {
            console.log(e)
        }
    }
}

export default new Produto()