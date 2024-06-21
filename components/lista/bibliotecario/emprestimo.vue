<template>
    <div>
        <Lista v-for="e in emprestimos" :key="e.id_emprestimo">
            <li>Titulo: {{e.livro.titulo}}</li>
            <li>Autor: {{e.livro.autor}}</li>
            <li>Editor: {{e.livro.editor}}</li>
            <li>Emprestado para: {{e.usuario.nome}}</li>
            <li>email: {{e.usuario.email}}</li>
            <li>Emprestado: {{e.emprestado}}</li>
            <li>Emprestado ate: {{e.limiteEmprestimo}}</li>
        </Lista>

    </div>
</template>

<script>


export default {
 
    props: {
        emprestimos: Array
    }
}

</script>

<style>

.clique {
    color: blue;
    cursor: pointer
}

</style>