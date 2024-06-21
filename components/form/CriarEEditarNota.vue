<template>
    <div>
      <form @submit.prevent="enviarFormulario" class="form">
        <div class="form-group">
          <label for="inputP1">P1:</label>
          <input id="inputP1" v-model="p1" type="number" min="0" max="10" class="form-control">
        </div>
  
        <div class="form-group">
          <label for="inputP2">P2:</label>
          <input id="inputP2" v-model="p2" type="number" min="0" max="10" class="form-control">
        </div>
  
        <div class="form-group">
          <label for="inputPf">PF:</label>
          <input id="inputPf" v-model="pf" type="number" min="0" max="10" class="form-control">
        </div>
  
        <button type="submit" class="btn btn-primary">Enviar</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        p1: null,
        p2: null,
        pf: null
      }
    },
    props: {
      p1Prop: String,
      p2Prop: String,
      pfProp: String
    },
    mounted() {
      this.p1 = this.p1Prop;
      this.p2 = this.p2Prop;
      this.pf = this.pfProp;
    },
    methods: {
      enviarFormulario() { 
        this.$emit("enviarFormulario", {
          p1: this.p1,
          p2: this.p2,
          pf: this.pf
        });
      }
    }
  }
  </script>
  
  <style scoped>
  .form {
    margin: 24px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .btn-primary {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .btn-primary:hover {
    background-color: #0056b3;
  }
  
  .form-control {
    width: 100%;
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  label {
    margin-bottom: 5px;
  }
  </style>
  