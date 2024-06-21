<template>
    <div class="modal-background"  @click="fecharModal">
        <div class="modal" @click.stop>
            <slot />
        </div>
    </div>
</template>

<script>

export default {
    methods: {
        fecharModal() {
            this.$emit('fecharModal')
        }
    }
}

</script>

<style>

    .modal-background {
        align-items: center;
        display: flex;
        height: 100vh;
        justify-content: center;
        left: 0;
        margin: 0;
        padding: 0;
        overflow: hidden;
        position: fixed;
        top: 0;
        width: 100vw;
        z-index: 1; 
    }

    .modal-background::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: hsl(0, 0%, 0%);
        opacity: 0.9;
        z-index: -1; 
    }

    .modal {
        background: white;
        min-height: 250px;
        position: relative;
        width: 500px;
        z-index: 2;
    }

</style>