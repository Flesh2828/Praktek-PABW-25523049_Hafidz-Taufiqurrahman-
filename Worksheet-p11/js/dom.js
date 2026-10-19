const wadah = document.querySelector("#daftar-film");
const barisFilter = document.querySelector("#filter");
const kosong = document.querySelector("#pesan-kosong");
const muat = document.querySelector("#muat");
const pesanJaringan = document.querySelector("#pesan-jaringan");

const form = document.querySelector("#form-kontak");
const inputNama = document.querySelector("#name");
const inputEmail = document.querySelector("#email");
const inputPesan = document.querySelector("#message");
const errorNama = document.querySelector("#error-name");
const errorEmail = document.querySelector("#error-email");
const errorPesan = document.querySelector("#error-message");
const tombolKirim = document.querySelector("#tombol-kirim");

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

export function aturMemuat(sedangMemuat) {
  if (muat) muat.hidden = !sedangMemuat;
  if (sedangMemuat) {
    if (pesanJaringan) pesanJaringan.hidden = true;
    if (kosong) kosong.hidden = true;
  }
}

export function tampilkanGalat(pesan) {
  if (pesanJaringan) {
    pesanJaringan.textContent = pesan;
    pesanJaringan.hidden = false;
  }
  wadah.textContent = "";
}

export function render(daftar) {
  wadah.textContent = "";
  if (pesanJaringan) pesanJaringan.hidden = true;

  if (!daftar || daftar.length === 0) {
    kosong.textContent = "Belum ada data.";
    kosong.hidden = false;
    return;
  }

  kosong.hidden = true;
  const fragment = document.createDocumentFragment();
  daftar.forEach((film) => fragment.append(buatKartu(film)));
  wadah.append(fragment);
}

export function inisialisasiFilter(dataFilmUtama) {
  if (!barisFilter) return;

  function tandaiTombolAktif(tombolAktif) {
    barisFilter.querySelectorAll("button").forEach((tombol) => {
      tombol.classList.toggle("aktif", tombol === tombolAktif);
    });
  }

  barisFilter.addEventListener("click", (event) => {
    const tombol = event.target.closest("button");
    if (!tombol) return;

    const genre = tombol.dataset.genre;
    const terpilih = dataFilmUtama.filter((film) => {
      if (genre === "Semua") return true;
      if (genre === "Belum") return !film.sudahDitonton;
      return film.genre.includes(genre);
    });

    tandaiTombolAktif(tombol);
    render(terpilih);
  });
}

// Validasi formulir kontak
function validasiForm() {
  const namaValid = inputNama.value.trim().length >= 3;
  const emailValid = inputEmail.value.trim().includes("@") && inputEmail.value.trim().includes(".");
  const pesanValid = inputPesan.value.trim().length >= 10;

  if (!namaValid && inputNama.value.trim() !== "") {
    errorNama.textContent = "Nama minimal 3 karakter tanpa spasi di tepi.";
    errorNama.style.display = "block";
  } else {
    errorNama.textContent = "";
    errorNama.style.display = "none";
  }

  if (!emailValid && inputEmail.value.trim() !== "") {
    errorEmail.textContent = "Format email tidak valid (harus ada @ dan domain).";
    errorEmail.style.display = "block";
  } else {
    errorEmail.textContent = "";
    errorEmail.style.display = "none";
  }

  if (!pesanValid && inputPesan.value.trim() !== "") {
    errorPesan.textContent = "Pesan minimal 10 karakter.";
    errorPesan.style.display = "block";
  } else {
    errorPesan.textContent = "";
    errorPesan.style.display = "none";
  }

  tombolKirim.disabled = !(namaValid && emailValid && pesanValid);
}

if (form) {
  inputNama.addEventListener("input", validasiForm);
  inputEmail.addEventListener("input", validasiForm);
  inputPesan.addEventListener("input", validasiForm);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    alert("Pesan rewatch berhasil dikirim!");
    form.reset();
    tombolKirim.disabled = true;
  });
}