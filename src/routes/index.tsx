import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Check,
  ChevronDown,
  Heart,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  Wallet,
  Clock,
  BookOpen,
} from "lucide-react";
import depoimento1 from "@/assets/depoimento1.jpg";
import depoimento2 from "@/assets/depoimento2.jpg";
import depoimento3 from "@/assets/depoimento3.jpg";
import depoimento4 from "@/assets/depoimento4.jpg";
import seloGarantia from "@/assets/selo-garantia.jpg";

/* =====================================================================
 * CONFIGURAÇÕES — altere aqui
 * ===================================================================== */
const REQUIRE_QUIZ = true; // false = página de vendas aparece logo
const REQUIRE_VIDEO_FIRST = false; // true = compra só aparece após ver o vídeo
const VIDEO_UNLOCK_SECONDS = 60; // segundos de vídeo antes de desbloquear

const COURSE_NAME = "Confeiteira Elisa - Bolo no Pote";
const PRICE = "97 MT";
const OLD_PRICE = "197 MT";
const CHECKOUT_URL = "https://checkout.escalepay.com/9498618";
const WHATSAPP_NUMBER = "258850289394";
const WHATSAPP_MESSAGE = "Olá! Fiz o quiz e quero saber mais sobre o curso de bolo no pote.";
const PAYMENT_METHODS = ["M-Pesa", "e-Mola", "Cartão"];
const INCOME_RANGES = ["Até 5.000 MT", "5.000 a 15.000 MT", "Mais de 15.000 MT"];

// Vídeo: deixe VIDEO_URL vazio para usar o player VSLTub abaixo.
// Ou cole um link do YouTube (ex: https://youtu.be/XXXX) — carrega só ao tocar.
const VIDEO_URL = "";
const VSL_ID = "vbUzVQrV6";
const VSL_CONFIG =
  '{"videoId":"MI9-8i4Mw6k","behavior":{"allowPlayPause":true,"autoplay":false,"customThumbnail":"","showProgressBar":true,"progressBarSpeed":4,"showVolumeControl":true,"allowFullscreen":false,"showTimeline":false,"showPlayButton":true,"showSmallPlayButton":true,"showBigPlayButton":true,"silentAutoplay":true},"texts":{"endTitle":"Parabéns🥳 por assistir até aqui após o pagamento receberás um ebook bónus no seu watsap !","endMessage":"Assistir novamente","initialText":"Clique para ouvir","externalLink":"https://checkout.escalepay.com/9498618","initialTitle":"Seu vídeo já começou","pauseMessage":"Você já começou a assistir esse vídeo","restartLabel":"Assistir do início?","continueLabel":"Continuar assistindo?","externalLinkText":"Visitar site"},"colors":{"textColor":"#ffffff","endOverlay":"#b72c33","progressBar":"#db3434","pauseOverlay":"#b72c33","controlsColor":"#ffffff","initialButton":"#db3434c4","endButtonColor":"#d11515","pauseTextColor":"#ffffff","buttonBorderColor":"#ffffff","endButtonTextColor":"#000000"},"fonts":{"textSize":"14","titleSize":"18","fontFamily":"Roboto, sans-serif","initialIconType":"muted"},"features":{"showEndButton":true,"showEndScreen":true,"showPauseScreen":true,"buttonBorderWidth":0,"pauseBackgroundImage":"","endScreenBackgroundImage":""},"idvideo":"vbUzVQrV6"}';

// Meta Pixel: cole aqui o ID do seu Pixel (só números). Vazio = desligado.
const META_PIXEL_ID = "";
/* ===================================================================== */

const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
const STORAGE_KEY = "bolo-pote-quiz";

type FbqFn = ((...args: unknown[]) => void) & { queue?: unknown[][]; loaded?: boolean };
declare global {
  interface Window {
    fbq?: FbqFn;
    _fbq?: FbqFn;
  }
}

function loadPixel() {
  if (!META_PIXEL_ID || window.fbq) return;
  const f: FbqFn = function (...args: unknown[]) {
    f.queue!.push(args);
  } as FbqFn;
  f.queue = [];
  window.fbq = f;
  window._fbq = f;
  const s = document.createElement("script");
  s.async = true;
  s.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(s);
  window.fbq("init", META_PIXEL_ID);
}

function track(event: string, custom = false) {
  if (typeof window === "undefined") return;
  window.fbq?.(custom ? "trackCustom" : "track", event);
}

const questions = [
  { q: "Já fazes bolos?", opts: ["Nunca fiz", "Faço para a família", "Já vendo"] },
  { q: "Qual é o teu objetivo?", opts: ["Renda extra", "Negócio principal", "Só aprender"] },
  { q: "Quanto gostarias de ganhar por mês?", opts: INCOME_RANGES },
  { q: "Quanto tempo tens por dia?", opts: ["1 hora", "2 a 3 horas", "O dia todo"] },
  {
    q: "O que mais te preocupa?",
    opts: ["Não saber receitas", "Não saber vender", "Falta de dinheiro para começar"],
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Curso Bolo no Pote — Renda extra em Moçambique" },
      {
        name: "description",
        content:
          "Faz o quiz e descobre como começar a vender bolo no pote em Moçambique. Curso online com receitas, preços e vendas.",
      },
      { property: "og:title", content: "Curso Bolo no Pote — Renda extra em Moçambique" },
      {
        property: "og:description",
        content: "Faz o quiz grátis e recebe o teu plano para ganhar dinheiro com bolo no pote.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

type Phase = "loading" | "quiz" | "preparing" | "result" | "sales";

function Page() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [answers, setAnswers] = useState<string[]>([]);

  useEffect(() => {
    loadPixel();
    track("PageView");
    let done = false;
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY) ?? localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setAnswers(JSON.parse(saved));
        done = true;
      }
    } catch {
      /* ignore */
    }
    if (!REQUIRE_QUIZ || done) setPhase("sales");
    else {
      setPhase("quiz");
      track("QuizStart", true);
    }
  }, []);

  useEffect(() => {
    if (phase === "sales") {
      track("ViewContent");
      window.scrollTo(0, 0);
    }
  }, [phase]);

  const answer = (a: string) => {
    const next = [...answers, a];
    setAnswers(next);
    if (next.length === questions.length) {
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      track("QuizComplete", true);
      setPhase("preparing");
      setTimeout(() => setPhase("result"), 2000);
    }
  };

  if (phase === "loading") return <div className="min-h-screen bg-cream" />;
  if (phase === "quiz") return <Quiz step={answers.length} onAnswer={answer} />;
  if (phase === "preparing") return <Preparing />;
  if (phase === "result") return <Result answers={answers} onNext={() => setPhase("sales")} />;
  return <Sales />;
}

/* ---------------- QUIZ ---------------- */

function Quiz({ step, onAnswer }: { step: number; onAnswer: (a: string) => void }) {
  const q = questions[step]!;
  const pct = ((step + 1) / questions.length) * 100;
  return (
    <main className="flex min-h-screen flex-col bg-cream px-5 py-6">
      <div className="mx-auto w-full max-w-md">
        <p className="text-center text-base font-bold text-pink-deep">
          Pergunta {step + 1} de {questions.length}
        </p>
        <div className="mt-2 h-3 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
      <div
        key={step}
        className="mx-auto mt-10 flex w-full max-w-md flex-1 flex-col animate-in fade-in slide-in-from-right-6 duration-500"
      >
        <h1 className="text-center font-display text-3xl font-bold leading-tight text-foreground">
          {q.q}
        </h1>
        <div className="mt-8 flex flex-col gap-4">
          {q.opts.map((o) => (
            <button
              key={o}
              onClick={() => onAnswer(o)}
              className="min-h-16 rounded-2xl border-2 border-border bg-card px-5 py-4 text-left text-xl font-bold text-foreground shadow-sm transition active:scale-[0.98] active:border-primary active:bg-secondary"
            >
              {o}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}

function Preparing() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-cream px-6 text-center">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-secondary border-t-primary" />
      <p className="mt-6 font-display text-2xl font-bold text-foreground">
        A preparar o teu plano...
      </p>
    </main>
  );
}

function buildResult(a: string[]) {
  const [exp, goal, , time, worry] = a;
  const speed =
    exp === "Já vendo"
      ? "podes aumentar as tuas vendas já esta semana"
      : time === "1 hora"
        ? "mesmo com 1 hora por dia, podes fazer os primeiros potes em poucos dias"
        : "podes fazer os primeiros potes em poucos dias";
  const focus =
    worry === "Não saber receitas"
      ? "As receitas testadas do curso resolvem a tua maior preocupação."
      : worry === "Não saber vender"
        ? "O módulo de vendas pelo WhatsApp mostra-te exatamente como conseguir clientes."
        : "Vais aprender a começar com pouco dinheiro e ingredientes simples.";
  const g =
    goal === "Negócio principal"
      ? "construir o teu próprio negócio"
      : goal === "Só aprender"
        ? "aprender com confiança"
        : "ganhar uma renda extra";
  return { title: `Com o teu perfil, ${speed}.`, text: `O teu objetivo é ${g}. ${focus}` };
}

function Result({ answers, onNext }: { answers: string[]; onNext: () => void }) {
  const r = buildResult(answers);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-cream px-6 text-center animate-in fade-in duration-500">
      <div className="grid h-20 w-20 place-items-center rounded-full bg-primary text-primary-foreground">
        <Sparkles className="h-10 w-10" />
      </div>
      <h1 className="mt-6 max-w-md font-display text-3xl font-bold leading-tight text-foreground">
        {r.title}
      </h1>
      <p className="mt-4 max-w-md text-lg text-muted-foreground">{r.text}</p>
      <button
        onClick={onNext}
        className="mt-8 w-full max-w-md rounded-full bg-gradient-cta px-6 py-5 text-xl font-extrabold text-primary-foreground shadow-rose animate-pulse-ring"
      >
        Ver o meu plano
      </button>
    </main>
  );
}

/* ---------------- VENDAS ---------------- */

function Sales() {
  const [unlocked, setUnlocked] = useState(!REQUIRE_VIDEO_FIRST);

  return (
    <main className="min-h-screen bg-background pb-36">
      <section className="bg-cream px-5 pb-8 pt-6">
        <div className="mx-auto max-w-md">
          <p className="text-center text-sm font-bold uppercase tracking-wide text-pink-deep">
            {COURSE_NAME}
          </p>
          <h1 className="mt-3 text-center font-display text-3xl font-bold leading-tight text-foreground">
            Aprende a fazer bolo no pote e ganha a tua própria renda em casa
          </h1>
          <Video onUnlock={() => setUnlocked(true)} />
          {!unlocked && (
            <p className="mt-4 rounded-xl bg-secondary p-4 text-center text-base font-semibold text-secondary-foreground">
              Assiste ao vídeo para desbloquear a tua oferta especial 👆
            </p>
          )}
        </div>
      </section>

      {unlocked && (
        <>
          <Benefits />
          <Includes />
          <Price />
          <Social />
          <Guarantee />
          <Faq />
          <footer className="px-5 py-8 text-center text-sm text-muted-foreground">
            Produto digital · Acesso imediato · Suporte pelo WhatsApp
          </footer>
          <StickyCta />
        </>
      )}
    </main>
  );
}

function Video({ onUnlock }: { onUnlock: () => void }) {
  const [playing, setPlaying] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timerStarted = useRef(false);

  const startTimer = () => {
    if (!REQUIRE_VIDEO_FIRST || timerStarted.current) return;
    timerStarted.current = true;
    setTimeout(onUnlock, VIDEO_UNLOCK_SECONDS * 1000);
  };

  // VSLTub: carrega o script só quando o vídeo aparece no ecrã
  useEffect(() => {
    if (VIDEO_URL || !ref.current) return;
    const el = ref.current;
    const obs = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) {
        obs.disconnect();
        if (!document.querySelector('script[src="https://app.vsltub.com/player.js"]')) {
          const s = document.createElement("script");
          s.src = "https://app.vsltub.com/player.js";
          s.async = true;
          document.body.appendChild(s);
        }
      }
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  if (!VIDEO_URL) {
    return (
      <div
        ref={ref}
        onClick={startTimer}
        onTouchStart={startTimer}
        className="mt-6 overflow-hidden rounded-2xl shadow-rose ring-1 ring-border"
      >
        <div id="vslturb-player" data-config={VSL_CONFIG} data-idvideo={VSL_ID} />
      </div>
    );
  }

  const ytId = VIDEO_URL.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/)?.[1];
  return (
    <div className="mt-6 aspect-video overflow-hidden rounded-2xl bg-foreground shadow-rose">
      {playing && ytId ? (
        <iframe
          className="h-full w-full"
          src={`https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0`}
          allow="autoplay; encrypted-media"
          title="Vídeo de apresentação"
        />
      ) : (
        <button
          onClick={() => {
            setPlaying(true);
            startTimer();
          }}
          className="relative grid h-full w-full place-items-center"
          aria-label="Ver vídeo"
        >
          {ytId && (
            <img
              src={`https://i.ytimg.com/vi/${ytId}/hqdefault.jpg`}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
          <span className="relative grid h-20 w-20 place-items-center rounded-full bg-primary text-3xl text-primary-foreground">
            ▶
          </span>
        </button>
      )}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-center font-display text-2xl font-bold leading-tight text-foreground">
      {children}
    </h2>
  );
}

function Benefits() {
  const items = [
    { icon: Wallet, t: "Renda extra em casa", d: "Vende para vizinhas, colegas e pelo WhatsApp." },
    { icon: BookOpen, t: "Receitas testadas", d: "Passo a passo simples, mesmo para quem nunca fez." },
    { icon: TrendingUp, t: "Preço certo", d: "Aprende a calcular o preço e a ter lucro em cada pote." },
    { icon: Clock, t: "No teu ritmo", d: "Estuda pelo telemóvel, quando quiseres." },
  ];
  return (
    <section className="px-5 py-10">
      <div className="mx-auto max-w-md">
        <SectionTitle>O que vais conseguir</SectionTitle>
        <div className="mt-6 flex flex-col gap-4">
          {items.map(({ icon: Icon, t, d }) => (
            <div key={t} className="flex gap-4 rounded-2xl bg-cream p-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                <Icon className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <p className="text-lg font-bold text-foreground">{t}</p>
                <p className="text-base text-muted-foreground">{d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Includes() {
  const items = [
    "Aulas em vídeo do básico ao avançado",
    "Receitas de massas, recheios e coberturas",
    "Como embalar e apresentar os potes",
    "Tabela para calcular preços e lucro",
    "Como vender pelo WhatsApp e redes sociais",
    "Bónus: ebook de receitas no teu WhatsApp",
  ];
  return (
    <section className="bg-cream px-5 py-10">
      <div className="mx-auto max-w-md">
        <SectionTitle>O que inclui o curso</SectionTitle>
        <ul className="mt-6 flex flex-col gap-3">
          {items.map((i) => (
            <li key={i} className="flex items-start gap-3 text-lg text-foreground">
              <Check className="mt-1 h-6 w-6 shrink-0 text-primary" />
              <span>{i}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function CheckoutButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={CHECKOUT_URL}
      onClick={() => track("InitiateCheckout")}
      className={`block w-full rounded-full bg-gradient-cta px-6 py-5 text-center text-xl font-extrabold text-primary-foreground shadow-rose ${className}`}
    >
      Quero começar agora
    </a>
  );
}

function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-whatsapp bg-background px-6 py-4 text-lg font-bold text-whatsapp-deep"
    >
      <MessageCircle className="h-6 w-6" /> Falar no WhatsApp
    </a>
  );
}

function Price() {
  return (
    <section className="px-5 py-10">
      <div className="mx-auto max-w-md rounded-3xl border-2 border-primary bg-card p-6 text-center shadow-rose">
        <p className="text-lg font-bold text-foreground">Acesso completo ao curso</p>
        <p className="mt-3 text-xl text-muted-foreground line-through">{OLD_PRICE}</p>
        <p className="font-display text-6xl font-extrabold text-pink-deep">{PRICE}</p>
        <p className="mt-1 text-base text-muted-foreground">Pagamento único · Acesso imediato</p>
        <CheckoutButton className="mt-6" />
        <div className="mt-3">
          <WhatsAppButton />
        </div>
        <p className="mt-5 text-sm font-semibold text-muted-foreground">Pagas com:</p>
        <div className="mt-2 flex flex-wrap justify-center gap-2">
          {PAYMENT_METHODS.map((m) => (
            <span
              key={m}
              className="rounded-full bg-secondary px-4 py-2 text-base font-bold text-secondary-foreground"
            >
              {m}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Social() {
  const photos = [depoimento1, depoimento2, depoimento3, depoimento4];
  return (
    <section className="bg-cream px-5 py-10">
      <div className="mx-auto max-w-md">
        <SectionTitle>O que dizem as alunas</SectionTitle>
        <div className="mt-2 flex justify-center gap-1 text-gold">
          {[0, 1, 2, 3, 4].map((i) => (
            <Star key={i} className="h-5 w-5 fill-current" />
          ))}
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3">
          {photos.map((p, i) => (
            <img
              key={i}
              src={p}
              alt={`Resultado de aluna ${i + 1}`}
              loading="lazy"
              decoding="async"
              className="aspect-[3/4] w-full rounded-2xl object-cover ring-1 ring-border"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Guarantee() {
  return (
    <section className="px-5 py-10">
      <div className="mx-auto flex max-w-md flex-col items-center text-center">
        <img
          src={seloGarantia}
          alt="Selo de garantia"
          loading="lazy"
          className="h-28 w-28 rounded-full object-cover"
        />
        <h2 className="mt-4 flex items-center gap-2 font-display text-2xl font-bold text-foreground">
          <ShieldCheck className="h-7 w-7 text-primary" /> Garantia de 7 dias
        </h2>
        <p className="mt-2 text-lg text-muted-foreground">
          Se não gostares, devolvemos o teu dinheiro. Sem perguntas.
        </p>
      </div>
    </section>
  );
}

function Faq() {
  const faqs = [
    { q: "Como recebo o curso?", a: "Logo após o pagamento recebes o acesso no teu WhatsApp e email." },
    { q: "Nunca fiz bolos. Consigo?", a: "Sim! O curso começa do zero, com passos simples." },
    { q: "Preciso de muito dinheiro para começar?", a: "Não. Ensinamos a começar com poucos ingredientes." },
    { q: "Como pago?", a: `Podes pagar com ${PAYMENT_METHODS.join(", ")}.` },
    { q: "Tenho suporte?", a: "Sim, tiras as tuas dúvidas pelo WhatsApp." },
  ];
  return (
    <section className="bg-cream px-5 py-10">
      <div className="mx-auto max-w-md">
        <SectionTitle>Perguntas frequentes</SectionTitle>
        <div className="mt-6 flex flex-col gap-3">
          {faqs.map((f) => (
            <details key={f.q} className="group rounded-2xl bg-card p-4 ring-1 ring-border">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-lg font-bold text-foreground">
                {f.q}
                <ChevronDown className="h-5 w-5 shrink-0 transition group-open:rotate-180" />
              </summary>
              <p className="mt-2 text-base text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
        <p className="mt-8 flex items-center justify-center gap-2 text-base font-semibold text-pink-deep">
          <Heart className="h-5 w-5 fill-current" /> Feito com carinho para ti
        </p>
      </div>
    </section>
  );
}

function StickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 px-4 pb-4 pt-3 backdrop-blur">
      <div className="mx-auto flex max-w-md flex-col gap-2">
        <CheckoutButton className="py-4" />
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 text-base font-bold text-whatsapp-deep"
        >
          <MessageCircle className="h-5 w-5" /> Falar no WhatsApp
        </a>
      </div>
    </div>
  );
}
