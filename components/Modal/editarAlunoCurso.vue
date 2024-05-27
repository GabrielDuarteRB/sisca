<template>
    <Modal @fecharModal="fecharModal">
        <div class="materia">
            <h4> {{ data.nome }} </h4>

            P1:
            <input type="text" v-model="p1">
            P2
            <input type="text" v-model="p2">

            <button @click="sendForm">Atualizar</button>
        </div>
    </Modal>
</template>

<script>
    export default {
        data() {
            return {
                p1: '',
                p2: '',
            }
        },
        props: {
            data: Object
        },
        mounted() {
            this.p1 = this.data.p1 ? this.data.p1 : ''
            this.p2 = this.data.p2 ? this.data.p2 : ''
        },
        methods: {
            fecharModal() {
                this.$emit('fecharModal')
            },
            sendForm() {
                console.log(this.p1, this.p2)
            }
        },
    }
</script>

<style scoped>

.materia {
    display: flex;
    flex-direction: column;
    margin: 24px 36px;
}

button {
    margin-top: 36px;
}

h4 {
    color: black;
}

</style>