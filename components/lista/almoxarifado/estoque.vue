<template>
    <div class="estoque-container">
        <ul class="estoque-list">
            <li v-for="e in estoque" :key="e.id_estoque" class="estoque-item">
                <div class="info">
                    <p><strong>Nome:</strong> {{ e.produto.nome }}</p>
                    <p><strong>Quantidade:</strong> {{ e.quantidade }}</p>
                    <p><strong>Descrição:</strong> {{ e.descricao }}</p>
                    <p><strong>Data:</strong> {{ e.dataTransacao }}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>

export default {
    props: {
        estoque: Array
    }
}

</script>

<style scoped>
.estoque-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.estoque-list {
    list-style-type: none;
    padding: 0;
}

.estoque-item {
    background-color: #fff;
    margin-bottom: 10px;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.info p {
    margin: 5px 0;
    font-size: 16px;
}

.info p strong {
    font-weight: bold;
    margin-right: 5px;
}
</style>
