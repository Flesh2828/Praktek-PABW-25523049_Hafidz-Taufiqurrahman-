<script setup>
import { ref, computed } from 'vue'

const nama = ref('')
const email = ref('')
const pesan = ref('')

const namaValid = computed(() => nama.value.trim().length >= 3)
const emailValid = computed(() => email.value.trim().includes('@') && email.value.trim().includes('.'))
const pesanValid = computed(() => pesan.value.trim().length >= 10)

const formValid = computed(() => namaValid.value && emailValid.value && pesanValid.value)

function kirimPesan() {
  alert('Pesan rewatch berhasil dikirim!')
  nama.value = ''
  email.value = ''
  pesan.value = ''
}
</script>

<template>
  <section class="kontak">
    <h2>Formulir Kontak</h2>
    <form id="form-kontak" novalidate @submit.prevent="kirimPesan">
      <div class="form-kolom">
        <label for="name">Nama:</label>
        <input type="text" id="name" v-model="nama" required>
        <span v-if="!namaValid && nama.trim() !== ''" class="pesan-galat" style="display: block; color: red; font-size: 0.8rem;">
          Nama minimal 3 karakter.
        </span>
      </div>
      <div class="form-kolom">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required>
        <span v-if="!emailValid && email.trim() !== ''" class="pesan-galat" style="display: block; color: red; font-size: 0.8rem;">
          Email tidak valid.
        </span>
      </div>
      <div class="form-kolom">
        <label for="message">Pesan:</label>
        <textarea id="message" v-model="pesan" required></textarea>
        <span v-if="!pesanValid && pesan.trim() !== ''" class="pesan-galat" style="display: block; color: red; font-size: 0.8rem;">
          Pesan minimal 10 karakter.
        </span>
      </div>
      <button type="submit" id="tombol-kirim" :disabled="!formValid">Kirim</button>
    </form>
  </section>
</template>