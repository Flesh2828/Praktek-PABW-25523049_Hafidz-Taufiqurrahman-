<script setup>
import { computed } from 'vue'
import { state, toggleFavoritState } from '../state.js'
import { saring } from '../data.js'

const daftarTampil = computed(() => {
  return saring(state.daftarProyek, state.kategoriAktif)
})
</script>

<template>
  <p v-if="state.memuat" id="muat" style="color: var(--color-primary); font-weight: 600; margin-bottom: var(--space-3);">
    Memuat data film...
  </p>

  <p v-else-if="state.galat" id="pesan-jaringan" style="color: #ef4444; background: rgba(239, 68, 68, 0.1); padding: var(--space-3); border-radius: var(--radius-md); margin-bottom: var(--space-3);">
    {{ state.galat }}
  </p>

  <div v-else class="galeri" id="daftar-film">
    <article v-for="film in daftarTampil" :key="film.id" class="kartu" :id="film.id">
      <div class="kartu__isi">
        <h2 class="kartu__judul">{{ film.judul }}</h2>
        <figure>
          <img :src="film.gambar" :alt="film.alt || film.judul" loading="lazy" />
          <figcaption>Poster resmi {{ film.judul }}</figcaption>
        </figure>
        <p>{{ film.ringkasan }}</p>
      </div>
      <div class="kartu__kaki">
        <span>Tahun: {{ film.tahun }} | Genre: {{ film.genre }}</span>
        <a :href="'#' + film.id" class="tombol-detail">Detail</a>
        <button
          type="button"
          class="favorit tombol-favorit"
          @click="toggleFavoritState(film.id)"
        >
          {{ state.favorit.includes(film.id) ? '★' : '☆' }}
        </button>
      </div>
    </article>
  </div>

  <p v-if="!state.memuat && !state.galat && daftarTampil.length === 0" id="pesan-kosong" style="color: var(--color-border); font-style: italic; margin-top: var(--space-3);">
    Tidak ada film dalam kategori ini.
  </p>
</template>