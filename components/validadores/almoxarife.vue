<template>
    <div>
        <slot v-if=almoxarifeValido />

        <h2 v-else>Validando Almoxarife</h2>

    </div>
</template>

<script>

import Usuario from '@/service/Usuario.js'
import LocalStorage from '@/utils/LocalStorage.js'

export default {
    data() {
        return {
            almoxarifeValido: false
        }
    },
    async mounted() {
        const id = LocalStorage.pegarIdUsuario()
        if(!id) {
            this.$router.replace({ path: '/' })
        }

        await this.buscarUsuario(id).then(response => {

            if(response.role?.includes("ALMOXARIFE")) {
                this.almoxarifeValido = true
            } else {
                this.$router.replace({ path: '/' })
            }
        })

    },
    methods: {
        async buscarUsuario(id) {
            return await Usuario.listarUsuario(id)
        }
    }
}

</script>