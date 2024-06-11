<template>
    <div>
        <NuxtLink to="/admin/usuarios">Usuarios</NuxtLink>
        <NuxtLink to="/admin/alunos">Alunos</NuxtLink>
        <NuxtLink to="/admin/cursos">Cursos</NuxtLink>
        <NuxtLink to="/admin/materias">Materias</NuxtLink>
    </div>
</template>

<style scoped>

div {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

</style>