<template>
  <div class="user-container">
    <div class="search-bar">
      <label for="cpf">Adicione um CPF para pesquisar:</label>
      <input id="cpf" v-model="cpf" />
    </div>

    <Lista class="user-list">
      <li v-for="u in listaDeUsuario" :key="u.cpf" class="user-item">
        <div class="user-info">
          <p><strong>Nome:</strong> {{ u.nome }}</p>
          <p><strong>CPF:</strong> {{ u.cpf }}</p>
          <p><strong>Email:</strong> {{ u.email }}</p>
          <p><strong>Data Nascimento:</strong> {{ formatted.formatarDataParaBr(u.data_nascimento) }}</p>
          <p><strong>Roles:</strong> {{ u.role }}</p>
        </div>
        <button class="edit-button" @click="() => abrirModal(u)">Editar</button>
      </li>
    </Lista>

    <ModalEditarUsuario
      v-if="modalAberto"
      @fecharModal="fecharModal"
      :nome="infosModal.nome"
      :senha="infosModal.senha"
      :cpf="infosModal.cpf"
      :email="infosModal.email"
      :telefone="infosModal.telefone"
      :dataNascimento="infosModal.data_nascimento"
      :role="infosModal.role"
      :id_usuario="infosModal.id_usuario"
    />
  </div>
</template>

<script>
import formatted from '@/utils/Formatted';

export default {
data() {
  return {
    formatted,
    modalAberto: false,
    infosModal: {},
    cpf: ''
  };
},
props: {
  usuarioData: {
    type: Array,
  }
},
computed: {
  listaDeUsuario() {
    if (this.cpf) {
      const cpfFormatted = formatted.limparCaracteres(this.cpf, ".()- ");
      return this.usuarioData.filter((u) => u.cpf.includes(cpfFormatted));
    }
    return this.usuarioData;
  }
},
methods: {
  abrirModal(e) {
    this.modalAberto = true;
    this.infosModal = e;
  },
  fecharModal({ mudanca }) {
    this.modalAberto = false;
    this.infosModal = {};
    if (mudanca) {
      this.$emit("atualizarLista");
    }
  }
}
};
</script>
<style scoped>
  .user-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .search-bar {
    margin-bottom: 20px;
  }

  .search-bar label {
    font-weight: bold;
  }

  .search-bar input {
    width: 96%;
    padding: 10px;
    margin-top: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .user-list {
  list-style-type: none;
    padding: 0;
  }

  .user-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    margin-bottom: 10px;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  .user-info p {
    margin: 5px 0;
  }

  .edit-button {
    background-color: #7E9181;
    color: #fff;
    padding: 8px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .edit-button:hover {
    background-color: #7E9181;
  }
</style>