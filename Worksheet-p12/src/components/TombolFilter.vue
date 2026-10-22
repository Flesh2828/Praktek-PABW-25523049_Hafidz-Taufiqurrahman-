<script setup>
import { state, setKategoriAktif, resetState } from '../state.js'

const daftarKategori = ['Semua', 'Drama', 'Comedy', 'Belum']
</script>

<template>
  <div id="filter-wrapper" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4); flex-wrap: wrap; gap: var(--space-2);">
    <div id="filter" style="display: flex; gap: var(--space-2); flex-wrap: wrap;">
      <button
        v-for="kat in daftarKategori"
        :key="kat"
        type="button"
        :class="['tombol-filter', { aktif: state.kategoriAktif === kat }]"
        @click="setKategoriAktif(kat)"
      >
        {{ kat === 'Belum' ? 'Belum Ditonton' : kat }}
      </button>
    </div>
    <button
      type="button"
      id="atur-ulang"
      style="background: transparent; border: 1px solid var(--color-border); color: var(--color-fg); padding: var(--space-2) var(--space-3); border-radius: var(--radius-md); cursor: pointer;"
      @click="resetState"
    >
      Atur Ulang
    </button>
  </div>
</template>