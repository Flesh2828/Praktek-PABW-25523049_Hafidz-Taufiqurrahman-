import { ambilProyek } from './api.js';
import { render, tampilkanGalat, aturMemuat, inisialisasiFilter } from './dom.js';

const profilPengguna = {
  nama: "Hafidz Taufiqurrahman",
  nim: "25523049",
  peran: "Penyusun Kurasi Annual Movie Rewatch",
  genreFavorit: ["Drama", "Romance", "Anime", "Comedy"],
  detail: {
    status: "Aktif",
    targetTahun: 2026,
    koleksi: {
      totalKoleksi: 3
    }
  }
};

const ringkasanProfil = `Kurator: ${profilPengguna.nama} (${profilPengguna.nim}) | ${profilPengguna.peran}`;
const batasDurasiMenit = profilPengguna.detail?.durasiMaksimal ?? 120;

console.log("--- LEMBAR B: Identitas & Variabel ---");
console.log(ringkasanProfil);
console.log(`Batas Durasi Default: ${batasDurasiMenit} menit`);

let koleksiFilm = [];

async function muat() {
  aturMemuat(true);
  try {
    const data = await ambilProyek();
    koleksiFilm = data;
    render(koleksiFilm);
    inisialisasiFilter(koleksiFilm);
  } catch (galat) {
    tampilkanGalat('Data gagal dimuat. Periksa koneksi internet atau jalur data, lalu muat ulang halaman.');
    console.error('Pesan log internal pengembang:', galat.message);
  } finally {
    aturMemuat(false);
  }
}

muat();