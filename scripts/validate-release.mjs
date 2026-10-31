import { loadEnv } from 'vite';
import { existsSync } from 'node:fs';
const env = { ...loadEnv('production', process.cwd(), ''), ...process.env };
const errors = [];
const keys = ['VITE_CHECKOUT_BASICO', 'VITE_CHECKOUT_PREMIUM'];
for (const key of keys) {
  try { const u = new URL(env[key]); if (u.protocol !== 'https:' || !(u.hostname === 'cakto.com.br' || u.hostname.endsWith('.cakto.com.br')) || u.pathname === '/' || /example|exemplo|placeholder|CHECKOUT/i.test(env[key])) throw Error(); }
  catch { errors.push(`${key}: informe um checkout HTTPS real da Cakto.`); }
}
if (env[keys[0]] && env[keys[0]] === env[keys[1]]) errors.push('Os pacotes precisam de checkouts diferentes.');
for (const key of ['VITE_CONTACT_EMAIL', 'VITE_SELLER_NAME', 'VITE_SUPPORT_TERMS', 'VITE_REFUND_TERMS']) if (!env[key]?.trim()) errors.push(`${key}: informação comercial obrigatória.`);
if (env.VITE_CONTACT_EMAIL && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(env.VITE_CONTACT_EMAIL)) errors.push('E-mail comercial inválido.');
if (env.VITE_COMMERCIAL_REVIEWED !== 'true') errors.push('Revise conteúdo final, políticas, condições e prévias; então defina VITE_COMMERCIAL_REVIEWED=true.');
if (!existsSync('public/videos/pilates.mp4')) errors.push('Adicione public/videos/pilates.mp4.');
if (errors.length) { console.error('Publicação bloqueada:\n- ' + errors.join('\n- ')); process.exit(1); }
console.log('Configuração comercial validada.');
