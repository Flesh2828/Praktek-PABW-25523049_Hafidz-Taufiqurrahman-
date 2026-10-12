# Praktek-PABW-25523049_Hafidz-Taufiqurrahman-
# PABW — Nama Anda — NIM
Repo ini memuat pekerjaan mata kuliah Pengembangan Aplikasi
Berbasis Web, satu folder untuk setiap pertemuan.
## Pertemuan 3 — Halaman profil saya
Topik halaman saya: koleksi buku di rak saya.
- Judul halaman: Annual Movie Rewatch
- Deskripsi: Website tentang list Movie/Series yang worth it untuk ditonton
setiap tahun
- Tautan navigasi: 1. Silent voice 2. Marry me! 3. Silent love
- Dua bagian utama: 1. Silent voice 2. Marry me! 3. Silent Love
- Kolom tabel: Judul, tahun rilis, genre
- Kolom form: Nama, email, pesan
- Gambar: A SILENT VOICE.jpg, Marry Me!.jpg
## Catatan penggunaan AI
Tulis bagian mana yang dibantu AI dan bagian mana yang Anda
kerjakan sendiri, atau tulis: tidak memakai AI.
## 📌 Pertemuan 4 — CSS Fundamental dan Design Token

Penerapan CSS modern berbasis *design token* (dua lapis: primitif dan semantik) untuk membangun konsistensi visual, aksesibilitas kontras tinggi, dan fitur peralihan tema terang/gelap tanpa JavaScript.

### 1. Struktur Design Token (`tokens.css`)
* **Lapis 1 (Primitif):** Menyimpan nilai warna mentah tanpa peran (contoh: `--teal-700: #0f766e`, `--teal-400: #2dd4bf`, `--dark-bg: #0b1514`).
* **Lapis 2 (Semantik):** Mengaitkan nilai primitif dengan konteks visual elemen (contoh: `--color-primary: var(--teal-400)`, `--color-bg: var(--dark-bg)`, `--color-surface: var(--dark-surf)`).

| Token Semantik | Nilai Awal | Peruntukan Elemen |
|---|---|---|
| `--color-bg` | `#0b1514` / `#f4f6f5` | Latar belakang utama halaman |
| `--color-fg` | `#e6f1ee` / `#13221c` | Warna teks utama |
| `--color-surface` | `#142321` / `#ffffff` | Kartu film, panel, dan bilah navigasi |
| `--color-border` | `#243d39` / `#cbd5e1` | Garis batas komponen & tabel |
| `--color-primary` | `#2dd4bf` / `#0f766e` | Tautan, tombol aksi, dan aksen |
| `--space-4` | `1rem` | Jarak standar antar elemen (*gap*) |
| `--radius-md` | `0.5rem` | Sudut membulat kartu dan tombol |

### 2. Pengujian & Kriteria Selesai
* **Uji Satu Baris:** Mengubah token primitif utama langsung memperbarui seluruh aksen warna tautan, tombol, dan garis fokus secara konsisten tanpa menyentuh CSS komponen.
* **Tema Gelap/Terang:** Diterapkan via CSS selector `:root:has(#tema:checked)` dan pengalih checkbox murni tanpa JS.
* **Aksesibilitas:** Seluruh rasio kontras teks lolos standar minimum WCAG AA (> 4.5:1).

---

## 📌 Pertemuan 5 — Layout Modern: Flexbox dan Grid

Restrukturisasi tata letak halaman dari aliran satu dimensi kaku menjadi kombinasi CSS Grid dua dimensi dan Flexbox satu dimensi tanpa ketergantungan *margin tempelan* maupun *float*.

### 1. Kerangka Halaman & Komponen
* **Grid Utama (`layout.css`):**
  * Elemen `.page` membungkus seluruh halaman dengan `display: grid`, `grid-template-rows: auto 1fr auto`, dan `min-height: 100dvh` agar navbar dan footer melekat sempurna di batas layar perangkat.
  * Area konten `.isi` membagi halaman menggunakan `grid-template-columns: 18rem 1fr` dengan area bernama `sisi` (tabel data film) dan `utama` (galeri & form kontak).
* **Flexbox Komponen (`komponen.css`):**
  * Navbar header menggunakan Flexbox untuk meratakan logo di kiri dan navigasi di kanan (`justify-content: space-between`).
  * Bagian dalam kartu film (`.kartu`) menggunakan Flexbox vertikal berjenjang dengan `.kartu__kaki` yang menempel di dasar berkat `margin-top: auto`.
* **Galeri Adaptif:** Menggunakan CSS Grid `grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr))` sehingga kolom kartu bertambah atau berkurang otomatis mengikuti lebar wadah tanpa media query.

### 2. Penanganan Kasus Luberan (Overflow)
* Menambahkan `min-width: 0` pada item flex/grid dan `overflow-wrap: anywhere` pada judul/sinopsis agar teks panjang tidak memaksa pelebaran kolom yang merusak tampilan.

---

## 📌 Pertemuan 6 — Responsif Mobile-First

Optimalisasi halaman agar dapat diakses secara adaptif dari ponsel berlayar sempit hingga monitor desktop lebar menggunakan berkas `responsif.css`.

### 1. Fondasi Mobile-First & Viewport
* Memasang `<meta name="viewport" content="width=device-width, initial-scale=1.0">` di bagian `<head>`.
* Seluruh aturan bawaan ditulis untuk layar kecil (< 48rem / 768px): tata letak bertumpuk 1 kolom vertikal, gambar dibatasi `max-width: 100%`, dan tabel dibungkus kontainer bergulir (`.table-wrap { overflow-x: auto; }`).

### 2. Titik Henti (*Breakpoints*)
* **Titik Henti 1 (`@media (min-width: 48rem)` / Tablet):**
  * Galeri film berubah menjadi 2 kolom (`repeat(2, 1fr)`).
  * Header dan navbar berubah ke orientasi baris sejajar.
* **Titik Henti 2 (`@media (min-width: 60rem)` / Desktop):**
  * Sidebar bersanding dengan area utama (`grid-template-columns: 18rem 1fr`).
  * Galeri film membesar menjadi 3 kolom terstruktur.

### 3. Hasil Pengujian Tiga Lebar Layar
* **360 px (Mobile):** Menumpuk rapi 1 kolom, bebas scroll horizontal (*zero overflow*).
* **768 px (Tablet):** Galeri membelah 2 kolom proporsional.
* **1280 px (Desktop):** Sidebar dan galeri 3 kolom bersanding lega.

---

## 📌 Pertemuan 8 — JavaScript Modern ES6+, Struktur Data, & Array Methods

Transformasi isi kurasi film dari teks statis di dokumen HTML menjadi representasi struktur data JavaScript di berkas `js/app.js` yang dimuat modular via `<script type="module">`.

### 1. Struktur Variabel & Data
* Identitas kurator dan preferensi disimpan dalam objek `const profilPengguna`.
* Koleksi rewatch disimpan dalam bentuk *array of objects* `export const daftarFilm`:
  ```javascript
  {
    id: "silent-voice",
    judul: "Silent Voice",
    tahun: 2016,
    genre: "Drama, Romance",
    sudahDitonton: true,
    rating: 9.0,
    gambar: "/Worksheet-p3/A SILENT VOICE.jpg",
    alt: "Poster film anime Silent Voice",
    ringkasan: "Cerita tentang Shoya Ishida yang menindas gadis tuli Shoko Nishimiya..."
  }