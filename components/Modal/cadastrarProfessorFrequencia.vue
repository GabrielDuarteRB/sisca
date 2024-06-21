<template>
    <Modal @fecharModal="fecharModal">
      <div class="modal-header">
        <h2>Marcar Frequência</h2>
        <button class="close-button" @click="fecharModal">X</button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label for="dia">Selecione um dia para marcar frequência:</label>
          <input id="dia" v-model="dia" type="date" />
        </div>
      </div>
      <div class="modal-footer">
        <button class="submit-button" @click="enviarFrequencia">Enviar</button>
      </div>
    </Modal>
  </template>
  
  <script>
  export default {
    data() {
      return {
        dia: ''
      };
    },
    methods: {
      enviarFrequencia() {
        this.$emit('cadastrarFrequencia', {
            falta: this.dia
        });
      },
      fecharModal() {
        this.$emit('fecharModal');
      }
    }
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
    width: 97%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
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
  