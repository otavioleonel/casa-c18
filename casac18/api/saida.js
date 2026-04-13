// api/saida.js — POST nova saída
import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { desc, cat, pagto, data, valor } = req.body;
  const nova = { id: `s${Date.now()}`, desc, cat, pagto, data, valor: Number(valor) };

  const saidas = (await kv.get('c18_saidas')) || [];
  saidas.push(nova);
  await kv.set('c18_saidas', saidas);

  return res.status(200).json(nova);
}
