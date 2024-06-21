<template>
    <form @submit.prevent="enviarFormulario">

        <div>
            <label for="">titulo</label>
            <input type="text" v-model="titulo">
        </div>
        <span v-if="!tituloValid">Adicione um titulo valido</span>

        <div>
            <label for="">autor</label>
            <input type="text" v-model="autor">
        </div>
        <span v-if="!autorValid">Adicione um autor valido</span>

        <div>
            <label for="">editor</label>
            <input type="text" v-model="editor">
        </div>
        <span v-if="!editorValid">Adicione um editor valido</span>


        <button>Enviar</button>
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
        tituloProps: String,
        autorProps: String,
        editorProps: String
    },
    mounted() {
        this.titulo = this.tituloProps
        this.autor = this.autorProps
        this.editor = this.editorProps
    },
    methods: {
        enviarFormulario() {
            
            console.log('texteee')
            if(this.validar()) return
            console.log('text')

            this.$emit("enviarFormulario", {
                titulo: this.titulo,
                autor:  this.autor,
                editor: this.editor
            })
        },
        validar() {
            this.tituloValid = Validation.isRequired(this.titulo)
            this.autorValid = Validation.isRequired(this.autor)
            this.editorValid = Validation.isRequired(this.editor)
            
            return !this.tituloValid ||  !this.autorValid || !this.editorValid

        }
    }
}

</script>