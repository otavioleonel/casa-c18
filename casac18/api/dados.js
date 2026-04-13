import { put, get, list } from '@vercel/blob';

const DADOS_INICIAIS = {
  saidas: [
    {id:'s1',desc:'Plano Altimetrico',cat:'Admin',data:'2026-02-20',pagto:'Pagto',valor:600},
    {id:'s2',desc:'Taxa de Condominio',cat:'Admin',data:'2026-02-20',pagto:'Pagto',valor:300},
    {id:'s3',desc:'Taxa de Prefeitura',cat:'Admin',data:'2026-03-03',pagto:'Pagto',valor:380},
    {id:'s4',desc:'Retirada de Muros',cat:'Admin',data:'2026-03-20',pagto:'Pagto',valor:600},
    {id:'s5',desc:'1a Manoel',cat:'Mão de Obra',data:'2026-03-20',pagto:'Pagto',valor:1500},
    {id:'s6',desc:'Poste Padrão',cat:'Elétrica',data:'2026-03-24',pagto:'Pagto',valor:1700},
    {id:'s7',desc:'Tijolos 3.000',cat:'Tijolo',data:'2026-03-24',pagto:'Pagto',valor:5070},
    {id:'s8',desc:'2a Manoel',cat:'Mão de Obra',data:'2026-03-20',pagto:'Pagto',valor:2500},
    {id:'s9',desc:'Perfuração',cat:'Mão de Obra',data:'2026-03-31',pagto:'Pagto',valor:1720},
    {id:'s10',desc:'João (Engenharia)',cat:'Engenharia',data:'2026-03-31',pagto:'Pagto',valor:900},
    {id:'s11',desc:'Areia Média',cat:'Areia',data:'2026-04-01',pagto:'Pagto',valor:360},
    {id:'s12',desc:'3a Manoel',cat:'Mão de Obra',data:'2026-04-01',pagto:'Pagto',valor:2500},
    {id:'s13',desc:'Concreto Engemix 1',cat:'Concreto',data:'2026-04-21',pagto:'A Vencer',valor:900.58},
    {id:'s14',desc:'Concreto Engemix 2',cat:'Concreto',data:'2026-05-21',pagto:'A Vencer',valor:900.58},
    {id:'s15',desc:'Concreto Engemix 3',cat:'Concreto',data:'2026-05-06',pagto:'A Vencer',valor:900.58},
    {id:'s16',desc:'4a Manoel',cat:'Mão de Obra',data:'2026-04-10',pagto:'A Vencer',valor:3000},
    {id:'s17',desc:'5a Manoel',cat:'Mão de Obra',data:'2026-04-17',pagto:'A Vencer',valor:3000},
    {id:'s18',desc:'6a Manoel',cat:'Mão de Obra',data:'2026-04-24',pagto:'A Vencer',valor:3000},
    {id:'s19',desc:'1 Ferros',cat:'Ferro',data:'2026-04-14',pagto:'A Vencer',valor:4433},
    {id:'s20',desc:'2 Ferros',cat:'Ferro',data:'2026-05-14',pagto:'A Vencer',valor:4433},
    {id:'s21',desc:'3 Ferros',cat:'Ferro',data:'2026-06-14',pagto:'A Vencer',valor:4433},
    {id:'s22',desc:'João (Engenharia)',cat:'Engenharia',data:'2026-04-30',pagto:'A Vencer',valor:900},
    {id:'s23',desc:'Menk Material',cat:'Material',data:'2026-04-30',pagto:'A Vencer',valor:7000}
  ],
  entradas: [
    {id:'e1',socio:'O&V',data:'2026-02-20',valor:600},{id:'e2',socio:'L&C',data:'2026-02-20',valor:600},
    {id:'e3',socio:'F&M',data:'2026-02-20',valor:600},{id:'e4',socio:'A&F',data:'2026-02-20',valor:600},
    {id:'e5',socio:'O&V',data:'2026-03-20',valor:500},{id:'e6',socio:'L&C',data:'2026-03-20',valor:500},
    {id:'e7',socio:'F&M',data:'2026-03-20',valor:500},{id:'e8',socio:'A&F',data:'2026-03-20',valor:500},
    {id:'e9',socio:'L&C',data:'2026-03-24',valor:6770},
    {id:'e10',socio:'O&V',data:'2026-03-27',valor:500},{id:'e11',socio:'F&M',data:'2026-03-27',valor:500},{id:'e12',socio:'A&F',data:'2026-03-27',valor:500},
    {id:'e13',socio:'O&V',data:'2026-03-31',valor:1000},{id:'e14',socio:'F&M',data:'2026-03-31',valor:1000},{id:'e15',socio:'A&F',data:'2026-03-31',valor:1000},
    {id:'e16',socio:'O&V',data:'2026-04-01',valor:615},{id:'e17',socio:'F&M',data:'2026-04-01',valor:615},{id:'e18',socio:'A&F',data:'2026-04-01',valor:615},{id:'e19',socio:'L&C',data:'2026-04-01',valor:615}
  ]
};

async function lerDados() {
  try {
    const { blobs } = await list({ prefix: 'c18_dados' });
    if (blobs.length === 0) return null;
    const blob = blobs.sort((a,b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))[0];
    const res = await fetch(blob.url);
    return await res.json();
  } catch(e) { return null; }
}

async function salvarDados(dados) {
  await put('c18_dados.json', JSON.stringify(dados), { access: 'public', addRandomSuffix: false });
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();
  let dados = await lerDados();
  if (!dados) {
    dados = DADOS_INICIAIS;
    await salvarDados(dados);
  }
  return res.status(200).json(dados);
}
