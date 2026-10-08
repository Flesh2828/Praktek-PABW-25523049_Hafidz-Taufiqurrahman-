
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

const kuotaFilmMinimal = 3;     
let genreTerpilih = "Semua";     

const ringkasanProfil = `Kurator: ${profilPengguna.nama} (${profilPengguna.nim}) — ${profilPengguna.peran}`;
const batasDurasiMenit = profilPengguna.detail?.durasiMaksimal ?? 120; // Default jika undefined

console.log("--- LEMBAR B: Identitas & Variabel ---");
console.log(ringkasanProfil);
console.log(`Batas Durasi Default: ${batasDurasiMenit} menit`);
console.log(`Tipe data profilPengguna.nama: ${typeof profilPengguna.nama}`);
console.log(`Tipe data kuotaFilmMinimal: ${typeof kuotaFilmMinimal}`);


function buatPerkenalan({ nama, peran }) {
  return `${nama} — ${peran}`;
}

const formatGenre = (daftarGenre) => daftarGenre.join(" · ");

console.log("\n--- LEMBAR C: Dua Fungsi Murni ---");
console.log("Hasil buatPerkenalan:", buatPerkenalan(profilPengguna));
console.log("Hasil formatGenre:", formatGenre(profilPengguna.genreFavorit));


// Array of Object: Menampung data film sesuai profil.html
const daftarFilm = [
  {
    id: "silent-voice",
    judul: "Silent Voice",
    tahun: 2016,
    genre: "Drama, Romance",
    sudahDitonton: true,
    rating: 9.0
  },
  {
    id: "marry-me",
    judul: "Marry me!",
    tahun: 2022,
    genre: "Comedy, Romance",
    sudahDitonton: true,
    rating: 7.5
  },
  {
    id: "silent-love",
    judul: "Silent Love",
    tahun: 2020,
    genre: "Drama, Romance",
    sudahDitonton: false,
    rating: 8.2
  }
];

console.log("\n--- LEMBAR D: Struktur Data & Array Methods ---");

console.log("Koleksi Film Keseluruhan:");
console.table(daftarFilm);

const filmSudahDitonton = daftarFilm.filter((film) => film.sudahDitonton);
console.log("Film Selesai Rewatch (filter):");
console.table(filmSudahDitonton);

const filmDicari = daftarFilm.find((film) => film.judul === "Silent Voice");
console.log("Pencarian Film Spesifik (find):", filmDicari);

const ringkasanLabelFilm = daftarFilm.map(
  (film) => `${film.judul} (${film.tahun}) [${film.genre}] — Status: ${film.sudahDitonton ? "Selesai" : "Belum"}`
);
console.log("Ringkasan Label Film (map):", ringkasanLabelFilm);

const filmUrutTahun = [...daftarFilm].sort((a, b) => b.tahun - a.tahun);
console.log("Film Terurut Tahun Terbaru:", filmUrutTahun);
console.log("Apakah data asli tidak berubah?:", daftarFilm[0].judul === "Silent Voice");

console.log("\n--- LEMBAR E: Penanganan Kasus Galat ---");

const catatanKritikus = profilPengguna.review?.catatan ?? "Belum ada catatan khusus";
console.log("Catatan (Aman):", catatanKritikus);

const targetTambahanTeks = "2";
const totalTargetTahunDepan = Number(targetTambahanTeks) + profilPengguna.detail.koleksi.totalKoleksi;
console.log("Kalkulasi Target (Number conversion):", totalTargetTahunDepan);