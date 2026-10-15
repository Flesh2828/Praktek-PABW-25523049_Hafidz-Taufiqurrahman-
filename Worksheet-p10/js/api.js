// Alamat relatif lokal (ganti ke raw.githubusercontent.com saat uji D.5)
const ALAMAT = 'data/proyek.json';

export async function ambilProyek() {
  try {
    const respons = await fetch(ALAMAT);
    if (!respons.ok) {
      throw new Error(`Gagal mengambil data, status peladen: ${respons.status}`);
    }
    const data = await respons.json();
    return data;
  } catch (galat) {
    console.error('Terjadi galat pada lapisan API:', galat.message);
    throw galat;
  }
}