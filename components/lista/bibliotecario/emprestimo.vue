<template>
    <div class="container">
        <div class="list">
            <div v-for="emprestimo in emprestimos" :key="emprestimo.id_emprestimo" class="item">
                <div class="info">
                    <p class="title">
                        <strong>Título:</strong> {{ emprestimo.livro.titulo }}
                    </p>
                    <p class="detail">
                        <strong>Autor:</strong> {{ emprestimo.livro.autor }}
                    </p>
                    <p class="detail">
                        <strong>Editora:</strong> {{ emprestimo.livro.editor }}
                    </p>
                    <p class="detail">
                        <strong>Emprestado para:</strong> {{ emprestimo.usuario.nome }}
                    </p>
                    <p class="detail">
                        <strong>Email:</strong> {{ emprestimo.usuario.email }}
                    </p>
                    <p class="detail">
                        <strong>Emprestado:</strong> {{ emprestimo.emprestado ? 'Sim' : 'Não' }}
                    </p>
                    <p class="detail">
                        <strong>Emprestado até:</strong> {{ emprestimo.limiteEmprestimo }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        emprestimos: Array
    }
}
</script>

<style scoped>
.container {
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
}

.list {
    display: grid;
    gap: 10px;
}

.item {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #fff;
}

.info {
    margin-bottom: 10px;
}

.title {
    font-weight: bold;
    margin-bottom: 5px;
}

.detail {
    margin-bottom: 3px;
}

</style>
