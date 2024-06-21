<template>
    <div>
        <div class="container-dados">
            <slot />
        </div>
    </div>
</template>

<style>

body {
    background-color: rgb(224, 224, 224);
    margin: 0;
    padding: 0;
}

.menu {
    left: 16px;
    position: absolute;
    top: 16px;
}

.menu img {
    width: 32px;
}

.container-dados {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: auto;
}

.dados-cadastrais {
    display: flex;
    background: whitesmoke;
    border: 1px solid #008000;
    border-radius: 24px;
    flex-direction: column;
    gap: 16px;
    padding: 24px;
}

.dados-cadastrais div div p {
    margin: 0 0 8px 0;
}

.dados-cadastrais div div span {
    display: flex;
    border: 1px solid black;
    border-radius: 8px;
    padding: 4px 32px 4px 4px;
    overflow: hidden;
    width: 150px;
}

.dados-cadastrais-juntos {
    display:  flex;
    gap: 64px;
}
</style>