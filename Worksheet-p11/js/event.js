import { state, setKategoriAktif, toggleFavoritState, resetState } from './state.js';
import { render } from './dom.js';

export function pasangPendengar() {
  const barisFilter = document.querySelector("#filter");
  const wadah = document.querySelector("#daftar-film");
  const tombolAturUlang = document.querySelector("#atur-ulang");
  const form = document.querySelector("#form-kontak");
  const inputNama = document.querySelector("#name");
  const inputEmail = document.querySelector("#email");
  const inputPesan = document.querySelector("#message");
  const errorNama = document.querySelector("#error-name");
  const errorEmail = document.querySelector("#error-email");
  const errorPesan = document.querySelector("#error-message");
  const tombolKirim = document.querySelector("#tombol-kirim");

  // Filter Kategori
  if (barisFilter) {
    barisFilter.addEventListener("click", (event) => {
      const tombol = event.target.closest("button");
      if (!tombol || !tombol.dataset.genre) return;
      setKategoriAktif(tombol.dataset.genre);
      render(state);
    });
  }

  // Klik Bintang Favorit
  if (wadah) {
    wadah.addEventListener("click", (event) => {
      const tombol = event.target.closest(".favorit");
      if (!tombol) return;
      toggleFavoritState(tombol.dataset.id);
      render(state);
    });
  }

  // Atur Ulang
  if (tombolAturUlang) {
    tombolAturUlang.addEventListener("click", () => {
      resetState();
      render(state);
    });
  }

  // Validasi Formulir
  function validasiForm() {
    if (!inputNama || !inputEmail || !inputPesan || !tombolKirim) return;
    const namaValid = inputNama.value.trim().length >= 3;
    const emailValid = inputEmail.value.trim().includes("@") && inputEmail.value.trim().includes(".");
    const pesanValid = inputPesan.value.trim().length >= 10;

    if (errorNama) {
      errorNama.style.display = (!namaValid && inputNama.value.trim() !== "") ? "block" : "none";
      errorNama.textContent = (!namaValid && inputNama.value.trim() !== "") ? "Nama minimal 3 karakter." : "";
    }
    if (errorEmail) {
      errorEmail.style.display = (!emailValid && inputEmail.value.trim() !== "") ? "block" : "none";
      errorEmail.textContent = (!emailValid && inputEmail.value.trim() !== "") ? "Email tidak valid." : "";
    }
    if (errorPesan) {
      errorPesan.style.display = (!pesanValid && inputPesan.value.trim() !== "") ? "block" : "none";
      errorPesan.textContent = (!pesanValid && inputPesan.value.trim() !== "") ? "Pesan minimal 10 karakter." : "";
    }

    tombolKirim.disabled = !(namaValid && emailValid && pesanValid);
  }

  if (form) {
    inputNama?.addEventListener("input", validasiForm);
    inputEmail?.addEventListener("input", validasiForm);
    inputPesan?.addEventListener("input", validasiForm);
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      alert("Pesan rewatch berhasil dikirim!");
      form.reset();
      if (tombolKirim) tombolKirim.disabled = true;
    });
  }
}