import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  BookOpenCheck,
  Calculator,
  Cake,
  Check,
  Clock,
  Heart,
  MessageCircle,
  Package,
  Play,
  ShieldCheck,
  Sparkles,
  Star,
  Wallet,
} from "lucide-react";
import heroImage from "@/assets/hero-bolo-pote.jpg";
import ebookMockup from "@/assets/ebook-mockup.png";
import depoimento1 from "@/assets/depoimento1.jpg";
import depoimento2 from "@/assets/depoimento2.jpg";
import depoimento3 from "@/assets/depoimento3.jpg";
import depoimento4 from "@/assets/depoimento4.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Receitas de Bolo no Pote — Confeiteira Elisa" },
      {
        name: "description",
        content:
          "Aprenda a fazer bolo no pote e gere a sua própria renda, em Moçambique. Ebook com receitas testadas, embalagem e cálculo de preço.",
      },
      { property: "og:title", content: "Receitas de Bolo no Pote — Confeiteira Elisa" },
      {
        property: "og:description",
        content:
          "Aprenda a fazer bolo no pote e gere a sua própria renda, em Moçambique. Ebook com receitas testadas, embalagem e cálculo de preço.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const WHATSAPP_URL = "https://wa.me/258850289394";
const CHECKOUT_URL = "https://checkout.escalepay.com/9498618";

const quizQuestions = [
  {
    question: "Você quer vender o bolo no pote ou fazer só para a família?",
    options: ["Quero vender e ganhar a minha renda", "Só para a família, por agora"],
  },
  {
    question: "Você já faz doces em casa?",
    options: ["Sim, já faço doces", "Ainda não, mas quero aprender"],
  },
  {
    question: "Quanto tempo você tem disponível por semana para isso?",
    options: ["Menos de 5 horas", "Entre 5 e 10 horas", "Mais de 10 horas"],
  },
  {
    question: "Onde você imagina vender os seus potes?",
    options: ["No bairro, entre conhecidos", "Pelo WhatsApp e redes sociais", "Ainda não sei"],
  },
];

const testimonials = [
  {
    image: depoimento1,
    name: "Amina S.",
    location: "Maputo",
    badge: "15 potes vendidos no 1º dia",
    text: "Preparei a minha primeira grande encomenda da semana! 15 potes de chocolate com morango e creme. Vendi tudo no meu bairro em menos de 2 horas. Muito obrigada Elisa, o método de cálculo e as receitas funcionam mesmo!",
  },
  {
    image: depoimento2,
    name: "Délcia M.",
    location: "Matola",
    badge: "Criou a própria marca de doces",
    text: "Criei a minha própria marca de doces no pote em casa depois de estudar o ebook! Já tenho clientes fixas e faço entregas todos os dias pelo WhatsApp. Ter a minha renda própria não tem preço!",
  },
  {
    image: depoimento3,
    name: "Nelsa T.",
    location: "Beira",
    badge: "Geleira cheia de entregas",
    text: "Sempre quis ter o meu próprio negócio de doces mas não sabia por onde começar. Com as receitas do ebook e as dicas de embalagem bonita, os potes saem como água! Olhem a minha geleira hoje!",
  },
  {
    image: depoimento4,
    name: "Joana C.",
    location: "Nampula",
    badge: "Fornece para festas e escritórios",
    text: "Comecei pequena com apenas 500MT de material. Hoje forneço potes de bolo para festas, escritórios e revendedores! A minha geleira fica assim lotada todos os fins de semana. Gratidão Elisa!",
  },
];

function BrandMark() {
  return (
    <a href="#topo" className="flex items-center gap-2.5">
      <span className="flex size-10 items-center justify-center rounded-full bg-gradient-rose-gold text-white shadow-rose">
        <Cake className="size-5" strokeWidth={2} />
      </span>
      <span className="font-display text-xl leading-none text-foreground sm:text-2xl">
        Confeiteira <span className="text-gradient-gold">Elisa</span>
      </span>
    </a>
  );
}

function Header({ isRevealed }: { isRevealed: boolean }) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <BrandMark />
        {isRevealed && (
          <>
            <a
              href="#oferta"
              className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-rose transition hover:bg-pink-deep sm:inline-flex animate-in fade-in"
            >
              Quero o ebook
            </a>
            <a
              href="#oferta"
              className="inline-flex rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground shadow-rose sm:hidden animate-in fade-in"
            >
              Quero o ebook
            </a>
          </>
        )}
      </div>
    </header>
  );
}

function Hero({ isRevealed }: { isRevealed: boolean }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.vsltub.com/player.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <section id="topo" className="relative overflow-hidden">
      <div className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-pink-soft/50 blur-3xl" />
      <div className="pointer-events-none absolute top-40 -left-24 size-64 rounded-full bg-gold-soft/40 blur-3xl" />
      <div
        className={`mx-auto grid max-w-6xl items-center gap-10 px-4 pt-8 pb-10 sm:px-6 sm:pt-12 ${
          isRevealed ? "lg:grid-cols-2 lg:gap-8" : "max-w-3xl text-center"
        }`}
      >
        <div className={isRevealed ? "text-center lg:text-left" : "text-center"}>
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-cream px-4 py-1.5 text-xs font-bold tracking-wide text-gold-deep uppercase">
            <Sparkles className="size-3.5" />
            Ebook + passo a passo de vendas
          </span>
          <h1 className="mt-5 font-display text-4xl leading-tight font-bold text-foreground sm:text-5xl lg:text-[3.4rem]">
            Aprenda a fazer bolo no pote e{" "}
            <span className="text-gradient-gold">gere a sua própria renda</span>, em Moçambique.
          </h1>
          <div
            id="vslturb-player"
            className="vslturb-player mt-6 overflow-hidden rounded-2xl shadow-rose ring-1 ring-border"
            data-config='{"videoId":"MI9-8i4Mw6k","behavior":{"allowPlayPause":true,"autoplay":false,"customThumbnail":"","showProgressBar":true,"progressBarSpeed":4,"showVolumeControl":true,"allowFullscreen":false,"showTimeline":false,"showPlayButton":true,"showSmallPlayButton":true,"showBigPlayButton":true,"silentAutoplay":true},"texts":{"endTitle":"Parabéns🥳 por assistir até aqui após o pagamento receberás um ebook bónus no seu watsap !","endMessage":"Assistir novamente","initialText":"Clique para ouvir","externalLink":"https://checkout.escalepay.com/9498618","initialTitle":"Seu vídeo já começou","pauseMessage":"Você já começou a assistir esse vídeo","restartLabel":"Assistir do início?","continueLabel":"Continuar assistindo?","externalLinkText":"Visitar site"},"colors":{"textColor":"#ffffff","endOverlay":"#b72c33","progressBar":"#db3434","pauseOverlay":"#b72c33","controlsColor":"#ffffff","initialButton":"#db3434c4","endButtonColor":"#d11515","pauseTextColor":"#ffffff","buttonBorderColor":"#ffffff","endButtonTextColor":"#000000"},"fonts":{"textSize":"14","titleSize":"18","fontFamily":"Roboto, sans-serif","initialIconType":"muted"},"features":{"showEndButton":true,"showEndScreen":true,"showPauseScreen":true,"buttonBorderWidth":0,"pauseBackgroundImage":"","endScreenBackgroundImage":""},"idvideo":"vbUzVQrV6"}'
            data-idvideo="vbUzVQrV6"
          />

          {!isRevealed && (
            <p className="mt-5 text-center text-sm font-bold text-pink-deep animate-pulse">
              Assista ao vídeo até ao fim para ver a oferta
            </p>
          )}

          {isRevealed && (
            <div className="animate-in fade-in duration-1000">
              <p className="mx-auto mt-5 max-w-md text-base text-muted-foreground sm:text-lg lg:mx-0">
                Receitas testadas, embalagem bonita e o cálculo do preço certo — tudo num só ebook,
                feito para mulheres que querem começar com pouco.
              </p>
              <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
                <a
                  href="#quiz"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-cta px-7 py-3.5 text-base font-bold text-white shadow-rose transition hover:brightness-105 sm:w-auto"
                >
                  Fazer o teste rápido
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-whatsapp/40 px-7 py-3.5 text-base font-bold text-whatsapp-deep transition hover:bg-whatsapp/10 sm:w-auto"
                >
                  <MessageCircle className="size-5" />
                  Falar no WhatsApp
                </a>
              </div>
            </div>
          )}
        </div>

        {isRevealed && (
          <div className="relative mx-auto w-full max-w-md lg:max-w-none animate-in fade-in duration-1000">
            <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-rose-gold opacity-60 blur-xl" />
            <img
              src={heroImage}
              alt="Bolo no pote em camadas, servido num pote de vidro com morango"
              width={1216}
              height={864}
              className="relative w-full rounded-[2rem] object-cover shadow-rose ring-1 ring-white/60"
            />
            <div className="absolute -bottom-4 left-1/2 flex w-max -translate-x-1/2 items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-bold text-foreground shadow-gold-soft ring-1 ring-border">
              <Heart className="size-4 fill-primary text-primary" />
              Feito para confeiteiras de Moçambique
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const done = step >= quizQuestions.length;
  const progress = done ? 100 : Math.round((step / quizQuestions.length) * 100);

  const choose = (option: string) => {
    setAnswers((prev) => [...prev, option]);
    setStep((prev) => prev + 1);
  };

  return (
    <section id="quiz" className="scroll-mt-20 px-4 sm:px-6">
      <div className="mx-auto max-w-xl">
        <div className="rounded-4xl border border-border/70 bg-card p-6 shadow-rose sm:p-8">
          {!done ? (
            <>
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-bold tracking-wider text-pink-deep uppercase">
                  Teste rápido
                </span>
                <span className="text-xs font-semibold text-muted-foreground">
                  Pergunta {step + 1} de {quizQuestions.length}
                </span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-cream-deep">
                <div
                  className="h-full rounded-full bg-gradient-cta transition-all duration-500"
                  style={{ width: `${Math.max(progress, 8)}%` }}
                />
              </div>
              <h2 className="mt-6 font-display text-2xl leading-snug font-bold text-foreground">
                {quizQuestions[step]!.question}
              </h2>
              <div className="mt-6 flex flex-col gap-3">
                {quizQuestions[step]!.options.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => choose(option)}
                    className="group flex w-full items-center justify-between gap-3 rounded-2xl border-2 border-pink-soft/70 bg-background px-5 py-4 text-left text-sm font-semibold text-foreground transition hover:border-primary hover:bg-accent sm:text-base"
                  >
                    {option}
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full border-2 border-pink-soft text-transparent transition group-hover:border-primary group-hover:bg-primary group-hover:text-white">
                      <Check className="size-3.5" strokeWidth={3} />
                    </span>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center">
              <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-gradient-rose-gold text-white shadow-rose">
                <Heart className="size-7 fill-white" />
              </span>
              <h2 className="mt-5 font-display text-2xl leading-snug font-bold text-foreground sm:text-3xl">
                Perfeito! O nosso ebook foi feito para mulheres como você.
              </h2>
              <p className="mx-auto mt-3 max-w-sm text-sm text-muted-foreground sm:text-base">
                Com base nas suas respostas, o caminho do bolo no pote combina com a sua rotina.
                Assista ao vídeo abaixo e veja como começar ainda esta semana.
              </p>
              <a
                href="#oferta"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-cta px-7 py-3.5 text-base font-bold text-white shadow-rose transition hover:brightness-105"
              >
                <Play className="size-5 fill-white" />
                Ver a oferta agora
              </a>
              <button
                type="button"
                onClick={() => {
                  setStep(0);
                  setAnswers([]);
                }}
                className="mt-4 block w-full text-center text-xs font-semibold text-muted-foreground underline underline-offset-4"
              >
                Responder novamente
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

const benefits = [
  {
    icon: Wallet,
    title: "Renda extra todos os meses",
    text: "Comece com pouco e venda para o bairro, o trabalho e o WhatsApp.",
  },
  {
    icon: BookOpenCheck,
    title: "Receitas testadas",
    text: "Passo a passo simples, com ingredientes fáceis de encontrar em Moçambique.",
  },
  {
    icon: Package,
    title: "Embalagem que vende",
    text: "Como montar os potes com um acabamento bonito que valoriza o seu doce.",
  },
  {
    icon: Calculator,
    title: "Cálculo do preço certo",
    text: "Saiba exatamente quanto cobrar para ter lucro em cada pote.",
  },
];

function Benefits() {
  return (
    <section className="bg-cream px-4 py-14 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <span className="text-xs font-bold tracking-widest text-gold-deep uppercase">
            O que você recebe
          </span>
          <h2 className="mt-3 font-display text-3xl leading-tight font-bold text-foreground sm:text-4xl">
            Tudo o que precisa para começar
          </h2>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="flex items-start gap-4 rounded-3xl border border-gold/25 bg-background p-5 shadow-gold-soft sm:p-6"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-rose-gold text-white">
                <benefit.icon className="size-6" strokeWidth={2} />
              </span>
              <div>
                <h3 className="font-display text-lg font-bold text-foreground">{benefit.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{benefit.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="bg-background px-4 py-14 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-cream px-4 py-1.5 text-xs font-bold tracking-wide text-gold-deep uppercase">
            <Sparkles className="size-3.5" />
            Depoimentos Reais
          </span>
          <h2 className="mt-3 font-display text-3xl leading-tight font-bold text-foreground sm:text-4xl">
            Fotos enviadas pelas nossas alunas em Moçambique
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Veja o orgulho e o sucesso das mulheres que começaram do zero com o nosso ebook.
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="flex flex-col overflow-hidden rounded-3xl border border-border/70 bg-card shadow-rose transition hover:shadow-gold-soft"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-cream-deep">
                <img
                  src={item.image}
                  alt={`Potes de bolo de ${item.name}`}
                  className="h-full w-full object-cover transition duration-300 hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 rounded-full bg-primary/90 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-white shadow-rose">
                  {item.badge}
                </span>
              </div>
              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <div className="flex items-center gap-1 text-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="size-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground italic">
                    "{item.text}"
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-border/50">
                  <h4 className="font-display text-sm font-bold text-foreground">{item.name}</h4>
                  <p className="text-[11px] font-medium text-pink-deep">{item.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Offer() {
  return (
    <section id="oferta" className="scroll-mt-20 px-4 py-14 sm:px-6">
      <div className="mx-auto grid max-w-4xl items-center gap-10 rounded-4xl border border-border/70 bg-card p-6 shadow-rose sm:p-10 lg:grid-cols-2">
        <div className="relative mx-auto w-full max-w-xs">
          <div className="absolute -inset-3 rounded-3xl bg-gradient-rose-gold opacity-60 blur-lg" />
          <img
            src={ebookMockup}
            alt="Capa do ebook Receitas de Bolo no Pote"
            width={864}
            height={1024}
            loading="lazy"
            className="relative w-full rounded-2xl object-cover shadow-rose"
          />
        </div>
        <div className="text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-xs font-bold tracking-wide text-accent-foreground uppercase">
            <Sparkles className="size-3.5" />
            Oferta de lançamento
          </span>
          <h2 className="mt-4 font-display text-3xl leading-tight font-bold text-foreground sm:text-4xl">
            Ebook "Receitas de Bolo no Pote"
          </h2>
          <div className="mt-5 flex items-end justify-center gap-3 lg:justify-start">
            <span className="pb-2 text-lg font-semibold text-muted-foreground line-through">
              397MT
            </span>
            <span className="font-display text-6xl leading-none font-bold text-gradient-gold sm:text-7xl">
              199MT
            </span>
          </div>
          <p className="mt-2 text-sm font-semibold text-muted-foreground">
            Pagamento único · Acesso imediato no seu telemóvel
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col">
            <a
              href={CHECKOUT_URL}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-cta px-7 py-4 text-base font-bold text-white shadow-rose transition hover:brightness-105"
            >
              Quero garantir o meu ebook agora
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-7 py-4 text-base font-bold text-white shadow-gold-soft transition hover:bg-whatsapp-deep"
            >
              <MessageCircle className="size-5" />
              Falar com a Confeiteira Elisa no WhatsApp
            </a>
          </div>
          <div className="mt-5 flex items-center justify-center gap-2 text-xs font-semibold text-muted-foreground lg:justify-start">
            <ShieldCheck className="size-4 text-whatsapp" />
            Compra segura · Entrega imediata após o pagamento
          </div>
        </div>
      </div>
    </section>
  );
}

function Urgency() {
  return (
    <section className="px-4 pb-14 sm:px-6">
      <div className="mx-auto max-w-4xl rounded-3xl border border-gold/40 bg-gradient-rose-gold px-6 py-8 text-center">
        <Clock className="mx-auto size-7 text-pink-deep" />
        <p className="mx-auto mt-3 max-w-xl font-display text-xl leading-snug font-bold text-pink-deep sm:text-2xl">
          O preço de 199MT é apenas para as primeiras compradoras. Depois volta para 397MT.
        </p>
        <a
          href={CHECKOUT_URL}
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-pink-deep shadow-rose transition hover:bg-cream"
        >
          Garantir o meu ebook por 199MT
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/60 bg-cream px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-4xl text-center">
        <BrandMark />
        <p className="mt-4 text-sm text-muted-foreground">
          Produto digital — entrega imediata após a confirmação do pagamento. O ebook é enviado
          directamente para o seu WhatsApp ou e-mail.
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          Precisa de ajuda?{" "}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-whatsapp-deep underline underline-offset-4"
          >
            Fale com o suporte no WhatsApp
          </a>
        </p>
        <p className="mt-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Confeiteira Elisa · Todos os direitos reservados
        </p>
      </div>
    </footer>
  );
}

function Index() {
  const [isRevealed, setIsRevealed] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("vsl_pitch_revealed") === "true";
    }
    return false;
  });

  const triggerReveal = () => {
    setIsRevealed(true);
    try {
      localStorage.setItem("vsl_pitch_revealed", "true");
    } catch (e) {
      console.error(e);
    }
    setTimeout(() => {
      const offerElement = document.getElementById("oferta");
      if (offerElement) {
        offerElement.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);
  };

  useEffect(() => {
    if (isRevealed) return;

    // Timer de fallback: 180 segundos (3 minutos)
    const FALLBACK_DELAY_MS = 180 * 1000;
    const timer = setTimeout(() => {
      triggerReveal();
    }, FALLBACK_DELAY_MS);

    // Eventos do player vslTub e postMessage
    const handleMessage = (event: MessageEvent) => {
      if (!event.data) return;
      const dataStr = typeof event.data === "string" ? event.data : JSON.stringify(event.data);
      if (
        dataStr.includes("ended") ||
        dataStr.includes("finish") ||
        dataStr.includes("completed") ||
        dataStr.includes("vslTubEnded") ||
        dataStr.includes("pitch_reveal")
      ) {
        triggerReveal();
      }
    };

    const handleCustomEvent = () => {
      triggerReveal();
    };

    window.addEventListener("message", handleMessage);
    window.addEventListener("vslTubEnded", handleCustomEvent);
    window.addEventListener("videoEnded", handleCustomEvent);
    window.addEventListener("ended", handleCustomEvent);

    // Polling do player vslTub para elementos <video>
    const interval = setInterval(() => {
      const playerContainer = document.getElementById("vslturb-player");
      if (playerContainer) {
        const video = playerContainer.querySelector("video");
        if (video) {
          if (video.ended || (video.duration > 0 && video.currentTime >= video.duration - 1)) {
            triggerReveal();
          }
        }
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
      window.removeEventListener("message", handleMessage);
      window.removeEventListener("vslTubEnded", handleCustomEvent);
      window.removeEventListener("videoEnded", handleCustomEvent);
      window.removeEventListener("ended", handleCustomEvent);
    };
  }, [isRevealed]);

  return (
    <div className="min-h-screen bg-background">
      <Header isRevealed={isRevealed} />
      <main>
        <Hero isRevealed={isRevealed} />
        {isRevealed && (
          <div className="animate-in fade-in duration-1000">
            <Quiz />
            <Benefits />
            <Testimonials />
            <Offer />
            <Urgency />
          </div>
        )}
      </main>
      {isRevealed && <Footer />}
    </div>
  );
}
