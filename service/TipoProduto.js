import useHttp from "../composable/useHttp"

class TipoProduto {

    constructor() {
        this.baseURL = 'tipoProduto'
    }

    async listarTipoProdutos() {
        try {
            const tipoProduto = await useHttp.get(`${this.baseURL}`)

            return tipoProduto.data
        } catch (e) {
            console.log(e)
        }
    }

    async cadastrarTipoProdutos(data) {
        try {
            const tipoProdutos = await useHttp.post(`${this.baseURL}`, data)

            return tipoProdutos
        } catch (e) {
            console.log(e)
        }
    }


}

export default new TipoProduto()