import { put, list } from '@vercel/blob';

async function lerDados() {
  try {
    const { blobs } = await list({ prefix: 'c18_dados' });
    if (blobs.length === 0) return { saidas: [], entradas: [] };
    const blob = blobs.sort((a,b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))[0];
    const res = await fetch(blob.url);
    return await res.json();
  } catch(e) { return { saidas: [], entradas: [] }; }
}

async function salvarDados(dados) {
  await put('c18_dados.json', JSON.stringify(dados), { access: 'public', addRandomSuffix: false });
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'DELETE, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'DELETE') return res.status(405).end();

  const { id } = req.query;
  const dados = await lerDados();
  dados.saidas = dados.saidas.filter(s => s.id !== id);
  await salvarDados(dados);

  return res.status(200).json({ ok: true });
}
