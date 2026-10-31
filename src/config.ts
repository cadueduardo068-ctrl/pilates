export const config = {
  name: 'Pilates em Casa',
  video: { src: '/videos/pilates.mp4', poster: '/images/video-poster.svg', ready: true, dramatization: false },
  contact: import.meta.env.VITE_CONTACT_EMAIL || '',
  seller: import.meta.env.VITE_SELLER_NAME || '',
  support: import.meta.env.VITE_SUPPORT_TERMS || '',
  refund: import.meta.env.VITE_REFUND_TERMS || '',
  // Cadastre somente imagens extraídas dos PDFs finais, com descrição acessível.
  previews: [] as { src: string; title: string; alt: string }[],
  testimonials: [] as { name: string; quote: string; verified: boolean }[],
  plans: [
    { id: 'basico', name: 'Básico', price: 19.90, checkout: import.meta.env.VITE_CHECKOUT_BASICO || '', items: ['Guia digital de 25 páginas', '16 exercícios ilustrados', '3 rotinas organizadas', 'Plano de 4 semanas', 'Orientações básicas de postura e respiração', 'Entrega digital em PDF'] },
    { id: 'premium', name: 'Premium', price: 29.90, checkout: import.meta.env.VITE_CHECKOUT_PREMIUM || '', items: ['Guia ampliado de aproximadamente 40 páginas ou mais', '30 exercícios ilustrados', '5 rotinas organizadas', 'Plano de 6 semanas', 'Adaptações para iniciantes', 'Explicações detalhadas de postura e respiração', 'Diário de acompanhamento', 'Conteúdo complementar sobre organização da prática'] },
  ],
};
export function validCheckout(value: string) {
  try { const u = new URL(value); return u.protocol === 'https:' && (u.hostname === 'cakto.com.br' || u.hostname.endsWith('.cakto.com.br')) && u.pathname !== '/' && !/example|exemplo|placeholder|CHECKOUT/i.test(value); } catch { return false; }
}
export const checkoutReady = config.plans.every(p => validCheckout(p.checkout)) && config.plans[0].checkout !== config.plans[1].checkout;
export function checkoutUrl(value: string) {
  const url = new URL(value);
  new URLSearchParams(location.search).forEach((v, k) => { if (/^utm_(source|medium|campaign|term|content|id)$/.test(k)) url.searchParams.set(k, v); });
  return url.href;
}
// Integrações futuras escutam este evento. Nenhum pixel é instalado ou carregado.
export function trackCheckout(plan: string) {
  if (localStorage.getItem('pilates-analytics-consent') === 'granted') window.dispatchEvent(new CustomEvent('pilates:checkout', { detail: { plan } }));
}
