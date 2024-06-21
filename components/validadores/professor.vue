<template>
    <div>
        <slot v-if=professorValido />

        <h2 v-else>Validando Professor</h2>

    </div>
</template>

<script>

import Usuario from '@/service/Usuario.js'
import LocalStorage from '@/utils/LocalStorage.js'

export default {
    data() {
        return {
            professorValido: false
        }
    },
    async mounted() {
        const id = LocalStorage.pegarIdUsuario()
        if(!id) {
            this.$router.replace({ path: '/' })
        }

        await this.buscarUsuario(id).then(response => {

            if(response.role.includes("PROFESSOR")) {
                this.professorValido = true
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