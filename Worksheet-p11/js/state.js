const KUNCI = "pabw-p11";
const VERSI = 2;

export const state = {
  kategoriAktif: "Semua",
  favorit: [],
  daftarProyek: []
};

export function simpan(s) {
  const isi = {
    versi: VERSI,
    kategoriAktif: s.kategoriAktif,
    favorit: s.favorit
  };
  localStorage.setItem(KUNCI, JSON.stringify(isi));
}

export function muat() {
  try {
    const raw = localStorage.getItem(KUNCI);
    if (!raw) return null;
    const isi = JSON.parse(raw);
    if (isi?.versi !== VERSI) {
      localStorage.removeItem(KUNCI);
      return null;
    }
    return isi;
  } catch {
    localStorage.removeItem(KUNCI);
    return null;
  }
}

export function pulihkan(isi) {
  if (!isi) {
    state.kategoriAktif = "Semua";
    state.favorit = [];
    return;
  }
  state.kategoriAktif = isi.kategoriAktif ?? "Semua";
  state.favorit = Array.isArray(isi.favorit) ? isi.favorit : [];
}

// Fungsi mutasi murni state
export function setDaftarProyek(daftar) {
  state.daftarProyek = daftar;
}

export function setKategoriAktif(kategori) {
  state.kategoriAktif = kategori;
  simpan(state);
}

export function toggleFavoritState(id) {
  if (state.favorit.includes(id)) {
    state.favorit = state.favorit.filter((favId) => favId !== id);
  } else {
    state.favorit = [...state.favorit, id];
  }
  simpan(state);
}

export function resetState() {
  localStorage.removeItem(KUNCI);
  state.kategoriAktif = "Semua";
  state.favorit = [];
}