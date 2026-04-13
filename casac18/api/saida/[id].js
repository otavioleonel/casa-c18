// api/saida/[id].js — DELETE saída
import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'DELETE, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'DELETE') return res.status(405).end();

  const { id } = req.query;
  const saidas = (await kv.get('c18_saidas')) || [];
  await kv.set('c18_saidas', saidas.filter(s => s.id !== id));

  return res.status(200).json({ ok: true });
}
