<template>
    <div class="lista-container">
        <Lista class="lista">
            <li v-for="produto in produtos" :key="produto.id_produto" class="item">
                <div class="item-content">
                    <p><strong>Nome:</strong> {{produto.nome}}</p>
                    <p><strong>Tipo de Produto:</strong> {{produto.tipoProduto.nome}}</p>
                </div>
            </li>
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

<style scoped>
.lista-container {
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.lista {
    list-style-type: none;
    padding: 0;
}

.item {
    background-color: #fff;
    margin-bottom: 10px;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.item-content {
    margin-bottom: 10px;
}

.item-content p {
    margin: 5px 0;
    font-size: 16px;
}

.item-content strong {
    font-weight: bold;
}
</style>
