import { ambilProyek } from './api.js';
import { state, setDaftarProyek, pulihkan, muat } from './state.js';
import { render, tampilkanGalat, aturMemuat } from './dom.js';
import { pasangPendengar } from './events.js';

async function mulai() {
  pulihkan(muat());
  pasangPendengar();
  aturMemuat(true);

  try {
    const data = await ambilProyek();
    setDaftarProyek(data);
    render(state);
  } catch (galat) {
    tampilkanGalat('Data gagal dimuat. Periksa koneksi internet atau jalur data.');
    console.error('Galat inisialisasi:', galat);
  } finally {
    aturMemuat(false);
  }
}

mulai();