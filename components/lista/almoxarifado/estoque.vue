<template>
    <div>
        <Lista v-for="e in estoque" :key="e.id_estoque">
            <li>Nome: {{e.produto.nome}}</li>
            <li>Quantidade: {{e.quantidade}}</li>
            <li>Descricao: {{e.descricao}}</li>
            <li>Data: {{e.dataTransacao}}</li>
        </Lista>
    </div>
</template>

<script>

export default {
    props: {
        estoque: Array
    }
}

</script>