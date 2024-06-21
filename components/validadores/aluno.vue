<template>
    <div>
        <slot v-if=alunoValido />

        <h2 v-else>Validando Aluno</h2>

    </div>
</template>

<script>

import Usuario from '@/service/Usuario.js'
import LocalStorage from '@/utils/LocalStorage.js'

export default {
    data() {
        return {
            alunoValido: false
        }
    },
    async mounted() {
        const id = LocalStorage.pegarIdUsuario()
        if(!id) {
            this.$router.replace({ path: '/' })
        }

        await this.buscarUsuario(id).then(response => {

            if(response.role.includes("ALUNO")) {
                this.alunoValido = true
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