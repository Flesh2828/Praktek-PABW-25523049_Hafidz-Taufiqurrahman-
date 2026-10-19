import { saring } from './data.js';

const wadah = document.querySelector("#daftar-film");
const barisFilter = document.querySelector("#filter");
const kosong = document.querySelector("#pesan-kosong");
const muatEl = document.querySelector("#muat");
const pesanJaringan = document.querySelector("#pesan-jaringan");

export function buatKartu(film, daftarFavorit = []) {
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
  img.alt = film.alt || film.judul;
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

  const isFav = daftarFavorit.includes(film.id);
  const tombolFav = document.createElement("button");
  tombolFav.type = "button";
  tombolFav.className = "favorit";
  tombolFav.dataset.id = film.id;
  tombolFav.textContent = isFav ? "★" : "☆";
  tombolFav.style.fontSize = "1.2rem";
  tombolFav.style.background = "none";
  tombolFav.style.border = "none";
  tombolFav.style.cursor = "pointer";
  tombolFav.style.color = isFav ? "#eab308" : "inherit";

  divKaki.append(spanTahun, linkDetail, tombolFav);
  article.append(divIsi, divKaki);

  return article;
}

export function tandaiTombolAktif(kategoriAktif) {
  if (!barisFilter) return;
  barisFilter.querySelectorAll("button").forEach((tombol) => {
    tombol.classList.toggle("aktif", tombol.dataset.genre === kategoriAktif);
  });
}

export function aturMemuat(sedangMemuat) {
  if (muatEl) muatEl.hidden = !sedangMemuat;
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
  if (wadah) wadah.textContent = "";
}

export function render(state) {
  if (!wadah) return;
  wadah.textContent = "";

  if (pesanJaringan) pesanJaringan.hidden = true;

  const daftarTampil = saring(state.daftarProyek, state.kategoriAktif);

  tandaiTombolAktif(state.kategoriAktif);

  if (!daftarTampil || daftarTampil.length === 0) {
    if (kosong) {
      kosong.textContent = "Tidak ada film dalam kategori ini.";
      kosong.hidden = false;
    }
    return;
  }

  if (kosong) kosong.hidden = true;

  const fragment = document.createDocumentFragment();
  daftarTampil.forEach((film) => fragment.append(buatKartu(film, state.favorit)));
  wadah.append(fragment);
}