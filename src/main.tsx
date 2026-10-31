import React, { useRef, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { BookOpen, Smartphone, Sparkles, House, CircleCheck, Heart, Clock, ArrowRight, Check, ChevronDown, ChevronLeft, ChevronRight, ShieldCheck, FileText, Leaf, Info, X } from 'lucide-react';
import { config, checkoutReady, checkoutUrl, trackCheckout } from './config';
import './styles.css';

const receive = [
  [BookOpen, 'Exercícios Ilustrados', 'Aprenda posições e movimentos com orientações passo a passo, imagens e cuidados de execução.'],
  [Smartphone, 'Acesso Digital', 'Consulte o material pelo celular, tablet ou computador e imprima as páginas que desejar.'],
  [Sparkles, 'Rotinas Organizadas', 'Tenha sequências de exercícios e um planejamento para acompanhar sua prática.'],
] as const;
const benefits = [
  [House, 'Pratique no conforto de casa', 'Organize sua prática sem depender de deslocamentos.'],
  [CircleCheck, 'Movimentos explicados', 'Consulte orientações, ilustrações e adaptações para iniciantes.'],
  [Heart, 'Mobilidade e consciência corporal', 'Conheça exercícios que trabalham controle, equilíbrio e coordenação.'],
  [Clock, 'Uma rotina que cabe no seu dia', 'Escolha sequências compatíveis com sua disponibilidade e respeite seus limites.'],
] as const;
const questions = [
  ['Preciso ter experiência com Pilates?', 'O guia foi pensado também para quem deseja conhecer a prática. Leia as orientações e respeite seus limites; o material educativo não oferece avaliação individual.'],
  ['Preciso comprar equipamentos?', 'A lista definitiva de acessórios será apresentada junto ao material final. Confira as necessidades de cada exercício antes de iniciar.'],
  ['Como recebo o material?', 'O produto é digital, em PDF. O canal e o prazo de liberação devem ser conferidos nas informações do checkout antes do pagamento.'],
  ['Posso acessar pelo celular?', 'Sim. Os arquivos PDF podem ser consultados no celular, tablet ou computador com um leitor de PDF.'],
  ['Qual é a diferença entre Básico e Premium?', 'O Básico reúne 16 exercícios, 3 rotinas e um plano de 4 semanas. O Premium amplia para 30 exercícios, 5 rotinas e 6 semanas, com adaptações e diário de acompanhamento.'],
  ['Os exercícios substituem fisioterapia?', 'Não. Este é um material educativo e não substitui avaliação, fisioterapia ou acompanhamento profissional individual.'],
  ['Como funciona o suporte e o reembolso?', config.support && config.refund ? `${config.support} ${config.refund}` : 'As condições comerciais ainda não foram cadastradas. As compras estão indisponíveis até a inclusão das informações de suporte e reembolso.'],
];
function CTA({ children = 'QUERO COMEÇAR MEU PILATES' }: { children?: React.ReactNode }) { return <a className="cta" href="#pacotes">{children}<ArrowRight size={18}/></a>; }
function Title({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) { return <header className="section-title"><h2>{children}</h2><span className="line"/>{subtitle && <p>{subtitle}</p>}</header>; }
function Video() {
  const [error, setError] = useState(false);
  return <div className="video-wrap"><div className="video">
    {config.video.ready ? <video src={`${config.video.src}#t=0.001`} playsInline controls preload="auto" aria-label="Vídeo Pilates em Casa" onError={() => setError(true)}/> : <img src={config.video.poster} alt="Pilates em Casa — apresentação do guia digital"/>}
    {config.video.dramatization && <span className="video-label">Dramatização publicitária</span>}
  </div>{error && <p role="status" className="small">Não foi possível carregar o vídeo.</p>}</div>;
}
function Preview() {
  const slider = useRef<HTMLDivElement>(null); const [index, setIndex] = useState(0);
  function move(i: number) { const next = (i + config.previews.length) % config.previews.length; slider.current?.children[next]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' }); }
  if (!config.previews.length) return <div className="preview-empty"><span className="preview-icon"><BookOpen size={34}/></span><h3>Um olhar por dentro do guia</h3><p>As prévias reais serão disponibilizadas aqui após o envio dos PDFs finais.</p><div className="preview-tags"><span>Exercícios ilustrados</span><span>Rotinas e planejamento</span></div><p className="small">Nenhuma página demonstrativa foi criada para representar o produto.</p></div>;
  return <div aria-roledescription="carrossel" aria-label="Prévia do material"><div className="slides" ref={slider} onScroll={() => { const s = slider.current; if (s) setIndex(Math.round(s.scrollLeft / s.clientWidth)); }}>{config.previews.map(p => <figure key={p.src}><img src={p.src} alt={p.alt} loading="lazy"/><figcaption>{p.title}</figcaption></figure>)}</div><div className="slider-controls"><button aria-label="Prévia anterior" onClick={() => move(index - 1)}><ChevronLeft/></button>{config.previews.map((p, i) => <button key={p.src} className={`dot ${index === i ? 'active' : ''}`} aria-label={`Ver prévia ${i + 1}`} aria-current={index === i} onClick={() => move(i)}/>)}<button aria-label="Próxima prévia" onClick={() => move(index + 1)}><ChevronRight/></button></div></div>;
}
function FAQ() { const [open, setOpen] = useState<number | null>(0); return <div className="faq">{questions.map(([q, a], i) => <article key={q}><h3><button aria-expanded={open === i} aria-controls={`answer-${i}`} id={`question-${i}`} onClick={() => setOpen(open === i ? null : i)}>{q}<ChevronDown className={open === i ? 'rotate' : ''} size={20}/></button></h3><AnimatePresence initial={false}>{open === i && <motion.div id={`answer-${i}`} role="region" aria-labelledby={`question-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="answer"><p>{a}</p></motion.div>}</AnimatePresence></article>)}</div>; }
function App() {
  const [legal, setLegal] = useState<string | null>(null);
  const legalRef = useRef<HTMLDialogElement>(null);
  useEffect(() => { if (legal) legalRef.current?.showModal(); }, [legal]);
  return <MotionConfig reducedMotion="user"><a className="skip" href="#conteudo">Pular para o conteúdo</a><main className="site" id="conteudo">
    <div className="topbar"><Leaf size={14}/> COMECE SUA ROTINA DE PILATES EM CASA</div>
    {import.meta.env.DEV && !checkoutReady && <aside className="dev-notice"><Info size={16}/> Ambiente de desenvolvimento: checkouts pendentes.</aside>}
    <section className="hero"><span className="badge"><i/> GUIA DIGITAL • ACESSO APÓS A COMPRA</span><h1>PILATES EM CASA <span>Mais movimento e bem-estar para sua rotina</span></h1><p className="intro">Conheça exercícios ilustrados, rotinas organizadas e orientações práticas para começar a explorar o Pilates no conforto de casa.</p><Video/><CTA/><p className="hero-note"><FileText size={14}/> Material digital em PDF <span>•</span> Consulte onde quiser</p></section>
    <section><Title subtitle="Um guia organizado para aprender exercícios e criar uma rotina de movimento em casa.">O que você vai receber</Title><div className="cards">{receive.map(([Icon, title, text]) => <article className="feature" key={title}><span className="icon"><Icon size={25}/></span><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section><Title>Por que escolher o Pilates em Casa?</Title><div className="cards">{benefits.map(([Icon, title, text]) => <article className="feature green" key={title}><span className="icon"><Icon size={25}/></span><h3>{title}</h3><p>{text}</p></article>)}</div><CTA/></section>
    <section className="soft"><span className="eyebrow">CONTEÚDO DIGITAL</span><Title subtitle="Conheça o conteúdo antes de escolher seu pacote.">Conheça o material</Title><Preview/></section>
    <section id="pacotes" className="soft pricing"><Title subtitle="Compare o que está incluído e escolha o guia para sua rotina.">Escolha seu pacote</Title><div className="plans">{config.plans.map((p, i) => <article className={`plan ${i ? 'premium' : ''}`} key={p.id}>{i === 1 && <span className="plan-badge">MAIS COMPLETO</span>}<h3>Pacote {p.name}</h3><p className="payment-label">Pagamento único</p><p className="price">{p.price.toLocaleString('pt-BR', {style:'currency',currency:'BRL'})}</p><span className="pdf-tag">Guia digital em PDF</span><ul>{p.items.map(item => <li key={item}><Check size={17}/><span>{item}</span></li>)}</ul>{checkoutReady ? <a className="cta" href={checkoutUrl(p.checkout)} onClick={() => trackCheckout(p.id)}>QUERO O {p.name.toUpperCase()}</a> : <button className="cta" disabled>QUERO O {p.name.toUpperCase()}</button>}</article>)}</div>{!checkoutReady && <p className="purchase-status" role="status">Compras indisponíveis enquanto os links oficiais são configurados.</p>}<p className="small secure"><ShieldCheck size={16}/> Confira os dados e as condições no checkout antes de pagar.</p></section>
    <section><Title>Para quem é o guia?</Title><div className="audience">{['Pessoas que desejam conhecer o Pilates.', 'Iniciantes que preferem instruções organizadas.', 'Pessoas que querem incluir movimentos leves na rotina.', 'Quem procura um guia digital para consultar em casa.'].map(t => <article key={t}><CircleCheck size={22}/><p>{t}</p></article>)}</div><aside className="health"><Info size={22}/><p>Pessoas com dores persistentes, lesões, limitações importantes ou condições de saúde devem procurar orientação profissional antes de começar.</p></aside></section>
    <section className="soft"><Title subtitle="Informações claras para você decidir com tranquilidade.">Confiança e transparência</Title><div className="transparency">{[[BookOpen, 'Conteúdo à vista', 'As prévias exibidas serão extraídas do material final.'], [Check, 'Inclusões bem definidas', 'Compare os exercícios, rotinas e planos de cada pacote.'], [Smartphone, 'Entrega digital', 'Material em PDF. Consulte o canal de liberação no checkout.'], [ShieldCheck, 'Prática consciente', 'Material educativo, sem avaliação individual ou promessa de resultados.']].map(([Icon, title, text]) => { const I = Icon as typeof BookOpen; return <article key={String(title)}><I size={23}/><div><h3>{String(title)}</h3><p>{String(text)}</p></div></article>; })}</div>{config.testimonials.filter(t => t.verified).map(t => <blockquote key={t.name}><p>{t.quote}</p><cite>{t.name}</cite></blockquote>)}</section>
    <section><Title subtitle="Tire suas principais dúvidas sobre o material.">Dúvidas frequentes</Title><FAQ/><CTA>VER OS PACOTES</CTA></section>
    <footer><div className="brand"><Leaf size={23}/> Pilates em Casa</div><p>Produto digital educativo.</p><p>Não substitui avaliação ou acompanhamento profissional.</p>{config.seller && <p>{config.seller}</p>}{config.contact ? <a href={`mailto:${config.contact}`}>{config.contact}</a> : <p className="small">Contato comercial em configuração.</p>}<nav aria-label="Informações legais"><button onClick={() => setLegal('privacidade')}>Política de privacidade</button><button onClick={() => setLegal('termos')}>Termos de uso</button><button onClick={() => setLegal('reembolso')}>Reembolso</button></nav><p className="small">© {new Date().getFullYear()} Pilates em Casa</p></footer>
    <a className="floating" href="#pacotes" aria-label="Visualizar os pacotes"><BookOpen size={17}/> Ver pacotes</a>
    {legal && <dialog ref={legalRef} className="legal" aria-labelledby="legal-title" onCancel={() => setLegal(null)}><button className="close" aria-label="Fechar" onClick={() => setLegal(null)} autoFocus><X/></button><h2 id="legal-title">{legal === 'privacidade' ? 'Política de privacidade' : legal === 'termos' ? 'Termos de uso' : 'Reembolso'}</h2><p>{legal === 'privacidade' ? 'Esta página não possui formulário, não instala pixels e não envia eventos de análise sem consentimento. Parâmetros UTM presentes na URL podem acompanhar sua navegação para o checkout. O processamento de dados na compra é regido também pelas políticas do prestador do checkout. Os dados do responsável e a política comercial definitiva ainda aguardam cadastro.' : legal === 'termos' ? 'Pilates em Casa é um produto digital educativo em PDF. O conteúdo não substitui orientação individual de um profissional. Confira o pacote escolhido e todas as condições na página de pagamento. Os termos comerciais definitivos aguardam validação pelo responsável antes da abertura das vendas.' : config.refund || 'As condições e o canal de solicitação de reembolso aguardam cadastro pelo responsável. As vendas permanecerão indisponíveis até essa configuração.'}</p></dialog>}
  </main></MotionConfig>;
}
createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);


