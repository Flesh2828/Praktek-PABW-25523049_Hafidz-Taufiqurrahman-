<script setup>
import { onMounted, watch } from 'vue'
import { state, simpan, muat, pulihkan, setDaftarProyek } from './state.js'
import { ambilProyek } from './api.js'
import { profil } from './data.js'

import KepalaProfil from './components/KepalaProfil.vue'
import TombolFilter from './components/TombolFilter.vue'
import DaftarProyek from './components/DaftarProyek.vue'
import FormKontak from './components/FormKontak.vue'

onMounted(async () => {
  pulihkan(muat())
  try {
    const data = await ambilProyek()
    setDaftarProyek(data)
  } catch (galat) {
    state.galat = 'Data gagal dimuat. Periksa koneksi internet atau jalur data.'
  } finally {
    state.memuat = false
  }
})

// Simpan otomatis ke localStorage saat state berubah
watch(state, (nilai) => simpan(nilai), { deep: true })
</script>

<template>
  <input type="checkbox" id="tema" class="pengalih-tema">
  <div class="page">
    <!-- Komponen 1: KepalaProfil menerima data profil lewat props -->
    <KepalaProfil :profil="profil" />

    <main class="isi">
      <aside class="sisi">
        <section class="section-sidebar">
          <h2>Data Film</h2>
          <table>
            <caption>Daftar Film Rewatch</caption>
            <thead>
              <tr>
                <th scope="col">Judul</th>
                <th scope="col">Tahun</th>
                <th scope="col">Genre</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Silent Voice</td>
                <td>2016</td>
                <td>Drama, Romance</td>
              </tr>
              <tr>
                <td>Marry Me!</td>
                <td>2022</td>
                <td>Comedy, Romance</td>
              </tr>
              <tr>
                <td>Silent Love</td>
                <td>2020</td>
                <td>Drama, Romance</td>
              </tr>
            </tbody>
          </table>
        </section>
      </aside>

      <section class="utama">
        <!-- Komponen 2: Filter Kategori & Atur Ulang -->
        <TombolFilter />

        <!-- Komponen 3: Daftar Kartu & Status -->
        <DaftarProyek />

        <!-- Komponen 4: Formulir Kontak -->
        <FormKontak />
      </section>
    </main>

    <footer class="kaki">
      <p>Nama: {{ profil.nama }} &nbsp; NIM: {{ profil.nim }} &nbsp; Tahun: 2026</p>
    </footer>
  </div>
</template>