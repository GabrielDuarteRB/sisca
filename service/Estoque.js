import useHttp from "../composable/useHttp"

class Estoque {

    constructor() {
        this.baseURL = 'api/estoque'
    }


    async criarProduto(data) {
        try {
            const produto = await useHttp.post(`${this.baseURL}/cadastrar`, data)

            return produto.data
        } catch (e) {
            console.log(e)
        }
    }

    async buscarEstoque() {
        try {
            const estoque = await useHttp.get(`${this.baseURL}`)

            return estoque.data
        } catch (e) {
            console.log(e)
        }
    }
}

export default new Estoque()