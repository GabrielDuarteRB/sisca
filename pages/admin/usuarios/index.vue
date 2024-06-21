<template>
    <ValidadoresTecnico>
      <div class="header-container">
        <NuxtLink to="/admin" class="back-link">← Voltar para o painel principal</NuxtLink>
        <NuxtLink to="/admin/usuarios/cadastrar" class="add-user-link">Cadastrar novo usuário</NuxtLink>
      </div>
      
      <div v-if="mensagem" class="message-container">
        <h3 class="status-message">{{ mensagem }}</h3>
      </div>
      
      <listaUsuario 
        v-else 
        @atualizarLista="atualizarLista" 
        :usuarioData="usuario"
      >
      </listaUsuario>
    </ValidadoresTecnico>
</template>
  
<script>
import Usuario from '@/service/Usuario.js';

export default {
  data() {
    return {
      usuario: [],
      mensagem: "Aguarde! Trazendo usuários"
    };
  },
  async created() {
    try {
      const response = await Usuario.listarUsuarios();
      this.usuario = response;
      this.mensagem = '';
    } catch (error) {
      this.mensagem = "Erro ao trazer usuários";
    }
  },
  methods: {
    async atualizarLista() {
      console.log('atualizando');
      try {
        const response = await Usuario.listarUsuarios();
        this.usuario = response;
      } catch (error) {
        console.log('Erro ao atualizar lista de usuários:', error);
      }
    }
  }
};
</script>

<style scoped>
.header-container {
    align-items: center;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    padding: 10px;
}

.back-link,
.add-user-link {
  color: #007bff;
  font-weight: bold;
  text-decoration: none;
}

.back-link:hover,
.add-user-link:hover {
  text-decoration: underline;
}

.message-container {
  text-align: center;
  margin-bottom: 20px;
}

.status-message {
  color: #ff0000;
  font-weight: bold;
}

</style>
