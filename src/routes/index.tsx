import { useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Search, PenTool, GitMerge, FileText, TrendingUp } from "lucide-react";
import heroImg from "@/assets/hero-fiber.jpg";
import fibraMobileImg from "@/assets/fibraotticaemobile.jpg";
import networkingImg from "@/assets/project-it.jpg";
import energiaImg from "@/assets/Energia.jpg";
import { Reveal } from "@/components/site/Reveal";
import { HeroParticles } from "@/components/site/Interactive";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Home — FI.CO. SRL" },
      {
        name: "description",
        content: "FI.CO. SRL: Uniamo competenze tecniche, progettuali e digitali per trasformare esigenze complesse in infrastrutture, sistemi e soluzioni capaci di evolvere.",
      },
      { property: "og:title", content: "FI.CO. SRL — Tutto parte da una connessione" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

// Pittogramma interattivo: i tre nodi restano sempre visibili, mentre i tracciati
// vengono disegnati quando l'utente entra nell'area o la attiva su un dispositivo touch.
// L'animazione e isolata in questo componente per non appesantire la pagina principale
// e per mantenere locale il controllo della timeline GSAP.
function InteractiveHeroLogo() {
  const container = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    // Stato iniziale: nasconde i tracciati e prepara l'effetto di disegno progressivo.
    gsap.set(".hero-piktogramma-path", { opacity: 0, strokeDashoffset: 100 });

    // La timeline resta in pausa finche l'utente non interagisce con il pittogramma.
    tl.current = gsap.timeline({ paused: true });
    tl.current
      .set(".hero-piktogramma-path", { opacity: 1 })
      .to(".hero-piktogramma-path", {
        strokeDashoffset: 0,
        duration: 2.5,
        ease: "power2.inOut",
      });
  }, { scope: container });

  const handleMouseEnter = () => tl.current?.play();
  const handleMouseLeave = () => tl.current?.reverse();

  return (
    <div 
      ref={container}
      className="relative w-full max-w-full sm:max-w-xl mx-auto cursor-pointer flex flex-col items-center justify-center pt-0 pb-10 group overflow-hidden sm:overflow-visible"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0 bg-[#0e7490]/10 rounded-full blur-[60px] sm:blur-[80px] group-hover:bg-[#0e7490]/25 transition-colors duration-[2000ms] pointer-events-none" />
      
      <svg viewBox="0 -40 170 170" className="w-full h-auto overflow-hidden sm:overflow-visible z-10 relative px-4 sm:px-0">
        <g className="hero-piktogramma-container">
          <path 
            className="hero-piktogramma-path" 
            pathLength="100"
            d="M 20,70 C 60,10 130,-30 150,115" 
            stroke="#38bdf8" 
            strokeWidth="9" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeDasharray="100"
            strokeDashoffset="100"
            opacity="0" 
          />
          <path 
            className="hero-piktogramma-path" 
            pathLength="100"
            d="M 20,70 C 25,-20 55,0 55,115 C 80,45 125,45 150,115" 
            stroke="#0e7490" 
            strokeWidth="9" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeDasharray="100"
            strokeDashoffset="100"
            opacity="0" 
          />
          
          <circle cx="20" cy="70" r="10" fill="#facc15" />   
          <circle cx="55" cy="115" r="10" fill="#facc15" />  
          <circle cx="150" cy="115" r="10" fill="#facc15" /> 
        </g>
      </svg>

      <div className="mt-8 sm:mt-12 text-xs sm:text-sm font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase text-white/40 group-hover:text-[#facc15] transition-colors duration-1000 text-center">
        Passa il mouse o tocca lo schermo per connettere
      </div>
    </div>
  );
}

function Index() {
  return (
    // Il wrapper limita la larghezza alla viewport e nasconde eventuali sbordamenti
    // generati da immagini, animazioni o sezioni con dimensioni responsive.
    <div className="bg-[#011C27] w-full max-w-[100vw] min-h-screen overflow-x-hidden flex flex-col">
      
      {/*
        HERO: stabilisce il messaggio principale della home e combina immagine,
        particelle e contenuti testuali in un'unica prima schermata orientata all'azione.
      */}
      <section className="relative pt-24 sm:pt-32 lg:pt-48 pb-8 sm:pb-12 flex flex-col justify-center overflow-hidden w-full max-w-[100vw]">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt=""
            width={1920}
            height={1080}
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#011C27]/90 via-[#011C27]/70 to-[#011C27]" />
        </div>
        <HeroParticles />

        <div className="container-x relative z-10 flex flex-col items-start text-left w-full">
          <Reveal delay={100}>
            {/* La scala tipografica parte compatta per evitare overflow sui display stretti. */}
            <h1 className="font-[var(--font-display)] text-4xl sm:text-5xl md:text-7xl lg:text-[90px] font-bold leading-[1.05] tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#38bdf8] to-[#facc15] max-w-5xl pb-2 mt-8 sm:mt-0">
              Tutto parte da una connessione.
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed">
              Uniamo competenze tecniche, progettuali e digitali per trasformare esigenze complesse in infrastrutture, sistemi e soluzioni capaci di evolvere.
            </p>
          </Reveal>
          <Reveal delay={300}>
            {/* Su mobile i pulsanti occupano tutta la riga; da sm in poi tornano a larghezza naturale. */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row flex-wrap justify-start items-stretch sm:items-center gap-4 w-full">
              <Link to="/chi-siamo" className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 font-bold rounded-xl bg-[#facc15] text-[#001724] hover:bg-yellow-300 hover:scale-105 transition-all shadow-lg w-full sm:w-auto text-center">
                Scopri cosa facciamo
              </Link>
              <Link to="/contatti" className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 font-bold rounded-xl bg-[#facc15] text-[#001724] hover:bg-yellow-300 hover:scale-105 transition-all shadow-lg w-full sm:w-auto text-center">
                Parlaci del tuo progetto <ArrowRight size={20} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/*
        PITTOGRAMMA INTERATTIVO: estende il messaggio della hero con un elemento
        identitario che reagisce al passaggio del mouse e al tocco dello schermo.
      */}
      <section className="relative z-20 pb-4 w-full max-w-[100vw] overflow-hidden">
        <div className="container-x px-4">
          <Reveal delay={400}>
            <InteractiveHeroLogo />
          </Reveal>
        </div>
      </section>

      {/*
        INTRODUZIONE: sintetizza il ruolo di Fi.Co. e prepara il passaggio dalle
        informazioni generali alla panoramica delle aree di attività.
      */}
      <section className="pt-8 md:pt-12 pb-8 md:pb-12 relative z-20 w-full overflow-hidden">
        <div className="container-x">
          <div className="max-w-4xl text-left">
            <Reveal>
              <span className="text-xs sm:text-sm uppercase tracking-[0.3em] text-[#facc15] font-bold">
                FI.CO., IN SINTESI
              </span>
              <h2 className="mt-4 sm:mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-[var(--font-display)] text-transparent bg-clip-text bg-gradient-to-r from-[#38bdf8] to-[#facc15] pb-2">
                Dalla complessità,<br/>una direzione chiara.
              </h2>
              <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-6 text-white/70 text-base sm:text-lg md:text-xl leading-relaxed text-justify">
                <p>
                  Fi.Co. affianca operatori, imprese, enti e privati nello sviluppo di infrastrutture e soluzioni tecnologiche.
                  Mettiamo in relazione progettazione, coordinamento e capacità operativa per governare ogni fase: dall'analisi dell'esigenza alla documentazione del risultato.
                  Un interlocutore. Una visione d'insieme. Un processo verificabile.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/*
        AREE DI ATTIVITA: presenta i tre ambiti principali con sintesi, immagine e
        collegamento dedicato. Energia resta informativa finche la pagina non sara disponibile.
      */}
      <section className="pt-0 md:pt-0 pb-0 relative z-20 w-full overflow-hidden">
        <div className="container-x">
          <Reveal>
            <div className="mb-7 md:mb-10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[5.5rem] font-bold leading-[1.05] tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#38bdf8] to-[#dfe7d3] pb-2">
                Tre aree, un unico approccio.
              </h2>
              <p className="mt-4 sm:mt-6 max-w-[1700px] text-base sm:text-lg md:text-xl lg:text-2xl text-white/70 leading-relaxed text-justify">
                Competenze diverse, lo stesso metodo: comprendere il contesto, progettare con precisione e portare ogni attività verso un risultato concreto.
              </p>
            </div>
          </Reveal>

          <div className="flex flex-col gap-2 md:gap-3">
            {/* 1. FIBRA & MOBILE: servizio infrastrutturale con approfondimento navigabile. */}
            <Reveal delay={100}>
              <div className="flex flex-col md:flex-row md:items-start gap-5 md:gap-8 py-1 border-b border-white/10 last:border-b-0">
                <Link 
                  to="/servizi/fibra-mobile" 
                  className="block group overflow-hidden rounded-2xl shrink-0 w-full md:max-w-[420px] border border-white/10"
                >
                  <img
                    src={fibraMobileImg}
                    alt="Fibra & Mobile"
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </Link>
                <div className="flex-1 max-w-4xl text-left">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-0 sm:mb-1 pb-2 bg-gradient-to-r from-[#38bdf8] to-[#dfe7d3] bg-clip-text text-transparent">Fibra & Mobile</h3>
                  <p className="text-sm sm:text-base md:text-lg text-white/70 leading-relaxed mb-1 sm:mb-2 max-w-3xl text-justify">
                    Dalla survey al network design, dal permitting all'implementazione, fino agli As-Built e al supporto: gestiamo l'intero ciclo di sviluppo delle infrastrutture di telecomunicazione.
                  </p>
                  <Link to="/servizi/fibra-mobile" className="inline-flex items-center text-[#facc15] text-sm sm:text-base md:text-lg font-bold hover:text-yellow-300 gap-2">
                    Scopri Fibra & Mobile <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </Reveal>

            {/* 2. IT, NETWORKING & SOFTWARE: servizio digitale con approfondimento navigabile. */}
            <Reveal delay={200}>
              <div className="flex flex-col md:flex-row md:items-start gap-5 md:gap-8 py-4 border-b border-white/10 last:border-b-0">
                <Link 
                  to="/servizi/it-software" 
                  className="block group overflow-hidden rounded-2xl shrink-0 w-full md:max-w-[420px] border border-white/10"
                >
                  <img
                    src={networkingImg}
                    alt="IT, Networking & Software"
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </Link>
                <div className="flex-1 max-w-4xl text-left">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 pb-2 bg-gradient-to-r from-[#38bdf8] to-[#dfe7d3] bg-clip-text text-transparent">IT, Networking & Software</h3>
                  <p className="text-sm sm:text-base md:text-lg text-white/70 leading-relaxed mb-4 sm:mb-5 max-w-3xl text-justify">
                    Integriamo infrastrutture IT, networking, assistenza e sviluppo software per costruire strumenti digitali su misura e rispondere a esigenze operative concrete.
                  </p>
                  <Link to="/servizi/it-software" className="inline-flex items-center text-[#facc15] text-sm sm:text-base md:text-lg font-bold hover:text-yellow-300 gap-2">
                    Scopri IT, Networking & Software <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </Reveal>

            {/* 3. ENERGIA: area in sviluppo, resa volutamente non interattiva. */}
            <Reveal delay={300}>
              <div className="flex flex-col md:flex-row md:items-start gap-5 md:gap-8 py-4 border-b border-white/10 last:border-b-0 relative">
                <div className="overflow-hidden rounded-2xl shrink-0 w-full md:max-w-[420px] border border-white/10">
                  <img
                    src={energiaImg}
                    alt="Energia"
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="flex-1 max-w-4xl text-left">
                  <div className="flex items-center justify-between gap-4 flex-wrap mb-3 sm:mb-4">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold pb-2 bg-gradient-to-r from-[#38bdf8] to-[#dfe7d3] bg-clip-text text-transparent">Energia</h3>
                    <span className="bg-[#facc15] text-[#011C27] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">In Sviluppo</span>
                  </div>
                  <p className="text-sm sm:text-base md:text-lg text-white/70 leading-relaxed mb-4 sm:mb-5 max-w-3xl text-justify">
                    Stiamo costruendo nuove competenze e partnership nel settore energetico, con l'obiettivo di integrare progettazione, tecnologia e infrastrutture.
                  </p>
                  <span className="inline-flex items-center text-white/40 text-sm sm:text-base md:text-lg font-bold gap-2 cursor-not-allowed">
                    Pagina in arrivo
                  </span>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={400}>
            <div className="mt-4 sm:mt-5 text-left">
              <p className="text-lg sm:text-xl font-medium tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#38bdf8] to-[#facc15]">
                Ricerca e innovazione attraversano ogni area, connettendo infrastrutture, dati e nuove tecnologie.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/*
        IL NOSTRO METODO: mostra le cinque fasi che trasformano un'esigenza in un
        risultato verificabile, dall'analisi iniziale all'evoluzione della soluzione.
      */}
      <section className="pt-4 md:pt-6 pb-0 md:pb-8 relative z-20 w-full overflow-hidden">
        <div className="container-x">
          <div className="max-w-3xl mb-12 md:mb-20 text-left">
            <Reveal>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-[var(--font-display)] text-transparent bg-clip-text bg-gradient-to-r from-[#38bdf8] to-[#facc15] pb-2">
                Il risultato non è un caso,<br/>
                è un processo.
              </h2>
              <p className="mt-4 sm:mt-6 text-base sm:text-lg text-white/70 leading-relaxed text-justify">
                Ogni progetto parte da un'esigenza e prende forma attraverso passaggi chiari, responsabilità definite e risultati verificabili.
              </p>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <div className="relative">
              <div className="hidden lg:block absolute top-10 left-[5%] right-[5%] h-[2px] bg-gradient-to-r from-[#38bdf8]/20 via-[#facc15]/40 to-[#38bdf8]/20" />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4 relative z-10">
                {[
                  { step: "01", icon: Search, title: "Analizziamo", desc: "Mettiamo a fuoco contesto, esigenze, vincoli e obiettivi." },
                  { step: "02", icon: PenTool, title: "Progettiamo", desc: "Traduciamo l'analisi in una soluzione tecnica chiara, sostenibile e realizzabile." },
                  { step: "03", icon: GitMerge, title: "Coordiniamo", desc: "Governiamo attività, partner, interlocutori e fasi operative." },
                  { step: "04", icon: FileText, title: "Documentiamo", desc: "Rendiamo ogni passaggio tracciabile e ogni risultato verificabile." },
                  { step: "05", icon: TrendingUp, title: "Evolviamo", desc: "Miglioriamo processi e soluzioni facendo tesoro dell'esperienza." }
                ].map((item) => (
                  <div key={item.step} className="flex flex-col items-center lg:items-start text-center lg:text-left group">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#01425f] border border-[#38bdf8]/50 flex items-center justify-center text-[#facc15] mb-4 sm:mb-6 shadow-lg group-hover:scale-110 group-hover:bg-[#38bdf8] group-hover:text-[#011C27] transition-all mx-auto lg:mx-0">
                      <item.icon size={28} className="sm:w-8 sm:h-8" />
                    </div>
                    <span className="text-[#38bdf8] font-bold text-xs sm:text-sm tracking-widest mb-2">FASE {item.step}</span>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">{item.title}</h3>
                    <p className="text-white/60 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/*
        IDENTITA: chiarisce i principi che collegano tecnica, responsabilita e valore
        concreto, con un invito finale alla pagina di approfondimento aziendale.
      */}
      <section className="pt-12 md:pt-12 pb-12 md:pb-20 relative z-20 w-full overflow-hidden">
        <div className="container-x">
          <div className="max-w-4xl text-left">
            <Reveal>
              <span className="text-xs sm:text-sm uppercase tracking-[0.3em] text-[#facc15] font-bold">
                CIÒ CHE CI GUIDA
              </span>
              <h2 className="mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight font-[var(--font-display)] text-white">
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38bdf8] to-[#facc15] inline-block pb-2"> La tecnica è il punto di partenza, </span> <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38bdf8] to-[#facc15] inline-block pb-2">il valore è l'obiettivo.</span>
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <div className="mt-8 sm:mt-10 space-y-4 sm:space-y-6 text-white/70 text-base sm:text-lg md:text-xl leading-relaxed text-justify">
                <p>
                  Competenza, responsabilità e capacità di adattamento guidano il nostro lavoro.
              
                  Operiamo in contesti in continua evoluzione, costruendo soluzioni solide per il presente e capaci di crescere nel tempo.
                
                  Per noi innovare significa applicare la tecnologia dove può generare un beneficio reale.
                </p>
                <Link to="/chi-siamo" className="inline-flex items-center gap-2 text-[#facc15] font-bold hover:text-white transition-all uppercase tracking-widest text-xs sm:text-sm mt-4">
                  Conosci Fi.Co. <ArrowRight size={18} />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/*
        CALL TO ACTION FINALE: chiude il percorso con un invito al contatto e porta
        l'utente dalla panoramica della home a una conversazione sul progetto.
      */}
      <section className="container-x pb-12 sm:pb-16 md:pb-24 relative z-30 w-full overflow-hidden">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0e7490]/40 to-[#001724] border border-[#0e7490]/60 p-6 sm:p-10 md:p-20 text-center shadow-2xl">
            <div className="absolute -top-20 -right-20 w-64 sm:w-80 h-64 sm:h-80 rounded-full bg-[#facc15]/10 blur-3xl" />
            <div className="relative z-10 flex flex-col items-center">
              <span className="text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[#facc15] font-bold block mb-3 sm:mb-4">
                INIZIAMO DA QUI
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold max-w-3xl mx-auto leading-tight mb-4 sm:mb-6 font-[var(--font-display)] text-transparent bg-clip-text bg-gradient-to-r from-[#38bdf8] to-[#facc15] pb-2">
                Il prossimo progetto parte da una conversazione.
              </h2>
              <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto mb-8 sm:mb-10 text-justify sm:text-center">
                Raccontaci l'esigenza, il contesto o l'obiettivo. Metteremo in campo le competenze giuste per costruire un percorso chiaro, concreto e realizzabile.
              </p>
              <Link to="/contatti" className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 font-bold rounded-xl bg-[#facc15] text-[#001724] hover:bg-yellow-300 hover:scale-105 transition-all shadow-lg w-full sm:w-auto">
                Parliamo del tuo progetto <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}