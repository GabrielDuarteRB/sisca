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



.message-container {
  text-align: center;
  margin-bottom: 20px;
}

.status-message {
  color: #ff0000;
  font-weight: bold;
}

</style>
