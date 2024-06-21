<template>
    <button>{{texto}}</button>
</template>

<script>

export default {
    props: {
        texto: String
    }
}

</script>

<style scoped>

button {
    background: #008000;
    border: none;
    border-radius: 24px;
    color: whitesmoke;
    cursor: pointer;
    font-weight: bold;
    height: 30px;
    transition:  1s;
    width: 150px;
}

button:hover {
    background: #00cc00;
    transition:  1s;
}

</style>