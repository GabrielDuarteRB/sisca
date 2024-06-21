<template>
    <form class="modal-form" @submit.prevent="enviarFormulario">
        <h3 v-if="mensagem" class="modal-title">{{ mensagem }}</h3>
        
        <div class="form-group">
            <label for="materia">Escolha uma matéria:</label>
            <select id="materia" v-model="materiaSelecionada">
                <option value="">Escolha uma matéria</option>
                <option v-for="materia in materias" :key="materia.id_materia" :value="materia.id_materia">
                    {{ materia.nome }}
                </option>
            </select>
            <span v-if="!materiaSelecionadaValid" class="error-message">Escolha uma matéria válida</span>
        </div>

        <div class="form-group">
            <label for="periodo">Período da matéria:</label>
            <input id="periodo" v-model="periodo" type="number">
            <span v-if="!periodoValid" class="error-message">Digite um período válido</span>
        </div>

        <button type="submit" class="btn-submit">Salvar</button>
    </form>
</template>

<script>
import Validation from '@/utils/Validation.js'

export default {
    data() {
        return {
            materiaSelecionada: '',
            materiaSelecionadaValid: true,
            periodo: 0,
            periodoValid: true
        }
    },
    props: {
        materias: Array,
        sucesso: Boolean,
        mensagem: String,
    },
    methods: {
        enviarFormulario() {
            if (this.validarFormulario()) return;

            this.$emit('enviarFormulario', {
                id_materia: this.materiaSelecionada,
                periodo: this.periodo
            });
        },
        validarFormulario() {
            this.materiaSelecionadaValid = Validation.isRequired(this.materiaSelecionada);
            this.periodoValid = !Validation.isMoreThan(this.periodo, 0);

            return !this.materiaSelecionadaValid || !this.periodoValid;
        },
        limparCampos() {
            this.materiaSelecionada = '';
            this.materiaSelecionadaValid = true;
            this.periodo = '';
            this.periodoValid = true;
        }
    },
    watch: {
        sucesso(newVal) {
            if (newVal) this.limparCampos();
        }
    }
}
</script>


<style scoped>
.modal-form {
    max-width: 400px;
    padding: 20px;
  }

.modal-title {
    font-size: 1.5rem;
    margin-bottom: 10px;
    text-align: center;
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    font-weight: bold;
}

.form-group select,
.form-group input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.error-message {
    color: red;
    font-size: 0.875rem;
}

.btn-submit {
    background-color: #007bff;
    color: #fff;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.btn-submit:hover {
    background-color: #0056b3;
}
</style>
