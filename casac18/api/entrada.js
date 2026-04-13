// api/entrada.js — POST nova entrada
import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { socio, data, valor } = req.body;
  const nova = { id: `e${Date.now()}`, socio, data, valor: Number(valor) };

  const entradas = (await kv.get('c18_entradas')) || [];
  entradas.push(nova);
  await kv.set('c18_entradas', entradas);

  return res.status(200).json(nova);
}
