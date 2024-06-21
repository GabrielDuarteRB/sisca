class LocalStorage {


    adicionarUsuario(id) {
        localStorage.setItem('userId', id);
    }

    pegarIdUsuario() {
        return localStorage.getItem('userId');
    }

    removerIdUsuario() {
        localStorage.removeItem('userId');
    }


}

export default new LocalStorage()