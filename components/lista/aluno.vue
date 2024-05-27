<template>
    <div>
        <Lista v-for="a in alunoData" :key="a.matricula">
            <li>Nome: {{a.nome}}</li>
            <li>CPF: {{a.cpf}}</li>
            <li>Matricula: {{a.matricula}}</li>
            <li>Curso:</li>
            <ul v-for="curso in a.curso" :key="curso.nome">
                <li>
                    <NuxtLink :to="'/admin/lista/curso/' + curso.idCurso + '/' + a.matricula">
                        {{curso.nome}}
                    </NuxtLink>
                </li>
            </ul>
        </Lista>
    </div>
</template>

<script>

export default {
    data() {
        return {
            alunoData: [
                {id: 1, nome: "Gabriel", cpf: '15047372707', matricula: '1231231231231', curso: [{nome: 'sistema de informacao', idCurso: '1231231231'}, {nome: 'ciencia da computacao', idCurso: '1231231231'}]},
                {id: 1, nome: "Gabriel", cpf: '15047372707', matricula: '1231231231231', curso: [{nome: 'sistema de informacao', idCurso: '1231231231'}, {nome: 'ciencia da computacao', idCurso: '1231231231'}]},
                {id: 1, nome: "Gabriel", cpf: '15047372707', matricula: '1231231231231', curso: [{nome: 'sistema de informacao', idCurso: '1231231231'}, {nome: 'ciencia da computacao', idCurso: '1231231231'}]},
            ]
        }
    }
}

</script>