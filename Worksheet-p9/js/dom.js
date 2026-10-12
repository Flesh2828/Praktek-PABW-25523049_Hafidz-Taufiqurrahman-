import { daftarFilm } from "./app.js";

// --- LEMBAR A: Seleksi Elemen ---
const wadah = document.querySelector("#daftar-film");
const barisFilter = document.querySelector("#filter");
const kosong = document.querySelector("#pesan-kosong");
const form = document.querySelector("#form-kontak");
const inputNama = document.querySelector("#name");
const inputEmail = document.querySelector("#email");
const inputPesan = document.querySelector("#message");
const errorNama = document.querySelector("#error-name");
const errorEmail = document.querySelector("#error-email");
const errorPesan = document.querySelector("#error-message");
const tombolKirim = document.querySelector("#tombol-kirim");

// --- LEMBAR B: Menyusun Kartu dari Data (createElement, textContent, append) ---
function buatKartu(film) {
  const article = document.createElement("article");
  article.className = "kartu";
  article.id = film.id;

  const divIsi = document.createElement("div");
  divIsi.className = "kartu__isi";

  const h2 = document.createElement("h2");
  h2.className = "kartu__judul";
  h2.textContent = film.judul;

  const figure = document.createElement("figure");
  const img = document.createElement("img");
  img.src = film.gambar;
  img.alt = film.alt;
  img.loading = "lazy";
  const figcaption = document.createElement("figcaption");
  figcaption.textContent = `Poster resmi ${film.judul}`;
  figure.append(img, figcaption);

  const p = document.createElement("p");
  p.textContent = film.ringkasan;

  divIsi.append(h2, figure, p);

  const divKaki = document.createElement("div");
  divKaki.className = "kartu__kaki";

  const spanTahun = document.createElement("span");
  spanTahun.textContent = `Tahun: ${film.tahun} | Genre: ${film.genre}`;

  const linkDetail = document.createElement("a");
  linkDetail.href = `#${film.id}`;
  linkDetail.className = "tombol-detail";
  linkDetail.textContent = "Detail";

  divKaki.append(spanTahun, linkDetail);
  article.append(divIsi, divKaki);

  return article;
}

// --- LEMBAR D.1: Fungsi Render Tunggal ---
function render(daftar) {
  // 1. Kosongkan wadah lebih dulu
  wadah.textContent = "";

  // 2. Periksa keadaan kosong
  if (daftar.length === 0) {
    kosong.hidden = false;
    return;
  }

  // 3. Render elemen baru
  kosong.hidden = true;
  const fragment = document.createDocumentFragment();
  daftar.forEach((film) => fragment.append(buatKartu(film)));
  wadah.append(fragment);
}

// --- LEMBAR C: Event Delegation pada Tombol Filter ---
function tandaiTombolAktif(tombolAktif) {
  barisFilter.querySelectorAll("button").forEach((tombol) => {
    tombol.classList.toggle("aktif", tombol === tombolAktif);
  });
}

barisFilter.addEventListener("click", (event) => {
  const tombol = event.target.closest("button");
  if (!tombol) return;

  const genre = tombol.dataset.genre;
  const terpilih = daftarFilm.filter((film) => {
    if (genre === "Semua") return true;
    if (genre === "Belum") return !film.sudahDitonton;
    return film.genre.includes(genre);
  });

  tandaiTombolAktif(tombol);
  render(terpilih);
});

// --- LEMBAR D.2: Validasi Form Tanpa Reload ---
function validasiForm() {
  const namaValid = inputNama.value.trim().length >= 3;
  const emailValid = inputEmail.value.trim().includes("@") && inputEmail.value.trim().includes(".");
  const pesanValid = inputPesan.value.trim().length >= 10;

  // Validasi Nama
  if (!namaValid && inputNama.value.trim() !== "") {
    errorNama.textContent = "Nama minimal 3 karakter tanpa spasi di tepi.";
    errorNama.style.display = "block";
    inputNama.setAttribute("aria-invalid", "true");
  } else {
    errorNama.textContent = "";
    errorNama.style.display = "none";
    inputNama.removeAttribute("aria-invalid");
  }

  // Validasi Email
  if (!emailValid && inputEmail.value.trim() !== "") {
    errorEmail.textContent = "Format email tidak valid (harus ada @ dan domain).";
    errorEmail.style.display = "block";
    inputEmail.setAttribute("aria-invalid", "true");
  } else {
    errorEmail.textContent = "";
    errorEmail.style.display = "none";
    inputEmail.removeAttribute("aria-invalid");
  }

  // Validasi Pesan
  if (!pesanValid && inputPesan.value.trim() !== "") {
    errorPesan.textContent = "Pesan minimal 10 karakter.";
    errorPesan.style.display = "block";
    inputPesan.setAttribute("aria-invalid", "true");
  } else {
    errorPesan.textContent = "";
    errorPesan.style.display = "none";
    inputPesan.removeAttribute("aria-invalid");
  }

  // Kunci tombol kirim sampai seluruh kolom layak
  tombolKirim.disabled = !(namaValid && emailValid && pesanValid);
}

inputNama.addEventListener("input", validasiForm);
inputEmail.addEventListener("input", validasiForm);
inputPesan.addEventListener("input", validasiForm);

form.addEventListener("submit", (event) => {
  event.preventDefault(); // Mencegah reload halaman
  alert("Pesan rewatch berhasil dikirim!");
  form.reset();
  tombolKirim.disabled = true;
});

// Render awal saat halaman dimuat
render(daftarFilm);