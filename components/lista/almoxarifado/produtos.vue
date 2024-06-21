<template>
    <div>
        <Lista v-for="produto in produtos">
            <li>Nome: {{produto.nome}}</li>
            <li>tipo produto: {{produto.tipoProduto.nome}}</li>
        </Lista>
    </div>
</template>

<script>

export default {
    props: {
        produtos: Array
    }
}

</script>