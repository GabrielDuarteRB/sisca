<template>
    <Modal @fecharModal="fecharModal">
      <div class="modal-header">
        <h2>Cadastrar Notas</h2>
        <button class="close-button" @click="fecharModal">X</button>
      </div>
      <div class="modal-body">
        <Form @enviarFormulario="enviarNota">
          <span v-if="notasValid" class="error-message">{{ notasValid }}</span>
          <div class="form-group">
            <label>Digite a nota da P1:</label>
            <input v-model="p1" type="number" min="0" max="10" />
          </div>
          <div class="form-group">
            <label>Digite a nota da P2:</label>
            <input v-model="p2" type="number" min="0" max="10" />
          </div>
          <div class="form-group">
            <label>Digite a nota da PF:</label>
            <input v-model="pf" type="number" min="0" max="10" />
          </div>
          <div class="modal-footer">
            <button type="submit" class="submit-button">Enviar</button>
          </div>
        </Form>
      </div>
    </Modal>
  </template>
  
  <script>
  export default {
    data() {
      return {
        p1: null,
        p2: null,
        pf: null,
      };
    },
    props: {
      infos: Object,
      notasValid: String,
    },
    mounted() {
      this.p1 = this.infos?.p1 ?? null;
      this.p2 = this.infos?.p2 ?? null;
      this.pf = this.infos?.pf ?? null;
    },
    methods: {
      enviarNota() {
        this.$emit('cadastrarNota', {
          p1: this.p1,
          p2: this.p2,
          pf: this.pf,
        });
      },
      fecharModal() {
        this.$emit('fecharModal');
      },
    },
  };
  </script>
  
  <style scoped>
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid #ccc;
  }
  
  .modal-body {
    padding: 1rem;
  }
  
  .modal-footer {
    display: flex;
    justify-content: flex-end;
    padding: 1rem;
    border-top: 1px solid #ccc;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  label {
    display: block;
    margin-bottom: 0.5rem;
  }
  
  input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .error-message {
    color: red;
    margin-bottom: 1rem;
    display: block;
  }
  
  .submit-button {
    background-color: #007bff;
    color: #fff;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .submit-button:hover {
    background-color: #0056b3;
  }
  
  .close-button {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
  }
  
  .close-button:hover {
    color: red;
  }
  </style>
  