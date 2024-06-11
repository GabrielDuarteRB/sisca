<template>
    <Modal @fecharModal="fecharModal">
        <span v-if="notasValid">{{notasValid}}</span>
        <div>
            <label>Digite a nota da p1: </label>
            <input v-model="p1" />
        </div>

        <div>
            <label for="">Digite a nota da p2: </label>
            <input v-model="p2" />
        </div>

        <button @click="enviarNota">Enviar</button>
    </Modal>
</template>

<script>

export default {
    data() {
        return {
            p1: null,
            p2: null,
        }
    },
    props: {
        infos: Object,
        notasValid: String
    },
    mounted() {
        this.p1 = this.infos?.p1 ? this.infos.p1 : null        
        this.p2 = this.infos?.p2 ? this.infos.p2 : null        
    },
    methods: {
        enviarNota() {
            this.$emit('cadastrarNota', {
                p1: this.p1,
                p2: this.p2
            })
        },
        fecharModal(mudanca = false) {
            this.$emit("fecharModal");
        },
    }
}
</script>

