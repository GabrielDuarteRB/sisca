<template>
    <Modal @fecharModal="fecharModal">
      <div class="modal-content">
        <h2>Atualizar Usuário</h2>
        <formUsuario 
          @formularioEnviado="atualizarUsuario"
          :mensageToSend="usuarioAtualizado"
          :nomeProps="nome"
          :cpfProps="cpf"
          :emailProps="email"
          :telefoneProps="telefone"
          :dataNascimentoProps="dataNascimento"
          :roleProps="role"
          :esconderCampoSenha="true"
        />
      </div>
    </Modal>
</template>


<script>
import Usuario from '@/service/Usuario.js';
import formatted from '@/utils/Formatted.js';

export default {
  data() {
    return {
      usuarioAtualizado: ''
    };
  },
  props: {
    nome: String,
    senha: String,
    cpf: String,
    email: String,
    telefone: String,
    dataNascimento: String,
    role: String,
    id_usuario: Number,
  },
  methods: {
    fecharModal(mudanca = false) {
      this.$emit('fecharModal', { mudanca });
    },
    async atualizarUsuario(e) {
      const [dia, mes, ano] = e.data_nascimento.split('/');
      const dataObj = `${ano}-${mes}-${dia}T00:00:00`;

      e.data_nascimento = dataObj;
      e.cpf = formatted.limparCaracteres(e.cpf, ".()- ");
      e.telefone = formatted.limparCaracteres(e.telefone, ".()- ");
      e.id_usuario = this.id_usuario;

      await Usuario.atualizarUsuario(e).then(() => {
        this.usuarioAtualizado = 'Usuário atualizado com sucesso!';
        setTimeout(() => {
          this.fecharModal(true);
        }, 2500);
      });
    }
  }
};
</script>


<style scoped>
.modal-content {
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
}

h2 {
    color: #333333;
    font-size: 24px;
    margin-bottom: 20px;
    text-align: center;
}

.success-message {
    background-color: #d4edda;
    border: 1px solid #c3e6cb;
    border-radius: 4px;
    color: #155724;
    margin-top: 20px;
    padding: 10px;
    text-align: center;
}

button {
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    color: #ffffff;
    cursor: pointer;
    display: block;
    padding: 10px;
    font-size: 16px;
    margin-top: 20px;
    width: 100%;
}

button:hover {
  background-color: #0056b3;
}
</style>
