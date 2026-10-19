export const profil = {
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

export function buatPerkenalan({ nama, peran }) {
  return `Kurator: ${nama} | ${peran}`;
}

export const formatKeahlian = (daftar) => daftar.join(" · ");

export function saring(daftar, kategori) {
  if (!daftar || !Array.isArray(daftar)) return [];
  if (kategori === "Semua") return daftar;
  if (kategori === "Belum") return daftar.filter((film) => !film.sudahDitonton);
  return daftar.filter((film) => film.genre.includes(kategori));
}