<template>
    <form @submit.prevent="enviarFormulario" class="form-container">

        <div class="form-group">
            <label for="titulo">Título</label>
            <input type="text" id="titulo" v-model="titulo" class="form-control">
            <span v-if="!tituloValid" class="error-message">Adicione um título válido</span>
        </div>

        <div class="form-group">
            <label for="autor">Autor</label>
            <input type="text" id="autor" v-model="autor" class="form-control">
            <span v-if="!autorValid" class="error-message">Adicione um autor válido</span>
        </div>

        <div class="form-group">
            <label for="editor">Editor</label>
            <input type="text" id="editor" v-model="editor" class="form-control">
            <span v-if="!editorValid" class="error-message">Adicione um editor válido</span>
        </div>

        <button type="submit" class="btn-submit">Enviar</button>
    </form>
</template>

<script>
import Validation from '@/utils/Validation'

export default {
    data() {
        return {
            titulo: "",
            tituloValid: true,
            autor: "",
            autorValid: true,
            editor: "",
            editorValid: true
        }
    },
    props: {
        livroProps: Object
    },
    mounted() {
        if (this.livroProps) {
            this.titulo = this.livroProps.titulo || "";
            this.autor = this.livroProps.autor || "";
            this.editor = this.livroProps.editor || "";
        }
    },
    methods: {
        enviarFormulario() {
            if (this.validar()) return;

            this.$emit("enviarFormulario", {
                titulo: this.titulo,
                autor: this.autor,
                editor: this.editor
            });
        },
        validar() {
            this.tituloValid = Validation.isRequired(this.titulo);
            this.autorValid = Validation.isRequired(this.autor);
            this.editorValid = Validation.isRequired(this.editor);

            return !this.tituloValid || !this.autorValid || !this.editorValid;
        }
    }
}
</script>

<style scoped>
.form-container {
    max-width: 400px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
}

.form-group {
    margin-bottom: 15px;
}

.label {
    margin-bottom: 5px;
    display: block;
    font-weight: bold;
}

.form-control {
    width: 100%;
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.error-message {
    color: red;
    font-size: 14px;
}

.btn-submit {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
}

.btn-submit:hover {
    background-color: #0056b3;
}
</style>
