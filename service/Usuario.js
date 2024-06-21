import useHttp from "../composable/useHttp"

class Usuario {

    constructor() {
        this.baseURL = 'usuarios'
    }

    async fazerLogin(data) {
        try {
            const usuarios = await useHttp.post(`${this.baseURL}/login`, data)

            return usuarios.data
        } catch (e) {
            console.log(e)
        }
    }

    async listarUsuarios() {
        try {
            const usuarios = await useHttp.get(`${this.baseURL}/listarTodos`)

            return usuarios.data
        } catch (e) {
            console.log(e)
        }
    }

    async listarUsuario(id) {
        try {
            const usuarios = await useHttp.get(`${this.baseURL}/${id}`)

            return usuarios.data
        } catch (e) {
            console.log(e)
        }
    }

    async cadastrarUsuario(data) {
        try {
            const usuario = await useHttp.post(`${this.baseURL}/cadastrar`, data)

            return usuario
        } catch (e) {
            console.log(e)
        }
    }

    async atualizarUsuario(data) {
        try {
            const usuario = await useHttp.put(`${this.baseURL}/atualizar`, data)

            return usuario
        } catch (e) {
            console.log(e)
        }
    }

}

export default new Usuario()