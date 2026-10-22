<script setup>
const props = defineProps({
  profil: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <header class="header">
    <nav class="navbar">
      <h1>{{ props.profil.peran || 'Annual Movie Rewatch' }}</h1>
      <ul class="nav-links">
        <li><a href="#silent-voice">Silent Voice</a></li>
        <li><a href="#marry-me">Marry me!</a></li>
        <li><a href="#silent-love">Silent Love</a></li>
      </ul>
      <label for="tema" class="tombol-tema">Ganti Tema</label>
    </nav>
  </header>
</template>