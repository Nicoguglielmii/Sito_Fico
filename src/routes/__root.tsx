// Root route shell: qui si costruisce il layout globale del sito, il document head
// condiviso e i provider applicativi che devono essere disponibili a tutte le route.
// Questo file e il punto di ingresso comune: le pagine figlie vengono inserite nel
// suo Outlet e condividono navigazione, footer, stili globali e gestione degli errori.
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Preloader } from "../components/site/Preloader";

// TanStack Router: tutti gli elementi fondamentali per il rendering delle route,
// la gestione del document head e l'inserimento degli script necessari all'app.
// HeadContent e Scripts vengono mantenuti nella shell HTML per supportare sia il
// rendering lato server sia l'idratazione lato client con una struttura coerente.
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

// React utilities: ReactNode serve al shell HTML, mentre useEffect ci permette di
// registrare gli errori una sola volta per ogni boundary che li cattura.
// L'annotazione del tipo del nodo mantiene esplicito il contratto del componente
// che riceve e restituisce l'intero documento applicativo.
import { useEffect, type ReactNode } from "react";

// CSS globale applicato all'intera applicazione: lo importiamo come asset URL per
// farlo passare correttamente nel document head della route root.
// Il riferimento generato dal bundler resta valido anche quando gli asset hanno un
// nome con hash nella build di produzione.
import appCss from "../styles.css?url";

// Servizi e componenti globali che devono essere presenti in tutte le pagine del sito.
// Tenerli qui evita duplicazioni nelle singole route e garantisce che ogni pagina
// parta dalla stessa cornice visiva e dagli stessi comportamenti condivisi.
import { reportError } from "../lib/error-reporting";
import { Navbar } from "../components/site/Navbar";
import { Footer } from "../components/site/Footer";

import { CookieBanner } from "../components/site/Interactive";

// Fallback visivo per le URL che non corrispondono a nessuna route.
// Il messaggio resta volutamente breve e offre un unico percorso di recupero verso
// la home, cosi l'utente non rimane bloccato su un indirizzo non valido.
function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#011C27] px-4">
      <div className="max-w-md text-center text-white">
        <h1 className="text-7xl font-bold">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Pagina non trovata</h2>
        <p className="mt-2 text-sm text-white/70">
          La pagina che stai cercando non esiste o è stata spostata.
        </p>

        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xl bg-[#facc15] text-[#011C27] px-6 py-3 font-bold transition-all hover:bg-yellow-300 hover:scale-105"
          >
            Torna alla Home
          </Link>
        </div>
      </div>
    </div>
  );
}

// Error boundary della root route: intercetta gli errori non gestiti della pagina,
// li registra per il monitoraggio e mantiene disponibile un'interfaccia di recupero.
function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  useEffect(() => {
    reportError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#011C27] px-4">
      <div className="max-w-md text-center text-white">
        <h1 className="text-xl font-semibold tracking-tight">
          Impossibile caricare la pagina
        </h1>
        <p className="mt-2 text-sm text-white/70">
          Si è verificato un errore inaspettato. Puoi riprovare a caricare la pagina o tornare alla Home.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-xl bg-[#facc15] text-[#011C27] px-6 py-3 font-bold transition-all hover:bg-yellow-300"
          >
            Riprova
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-xl border border-[#0e7490]/50 bg-transparent text-white px-6 py-3 font-bold transition-all hover:bg-[#0e7490]/20"
          >
            Torna alla Home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" },
      { title: "FI.CO. SRL — Telecomunicazioni, Fibra Ottica e Servizi IT" },
      {
        name: "description",
        content:
          "FI.CO. SRL: progettazione, gestione e sviluppo di reti in fibra ottica, permitting, ingegneria e servizi IT per imprese pubbliche e private.",
      },
      { name: "author", content: "FI.CO. SRL" },
      {
        property: "og:title",
        content: "FI.CO. SRL — Telecomunicazioni, Fibra Ottica e Servizi IT",
      },
      {
        property: "og:description",
        content:
          "FI.CO. SRL: progettazione, gestione e sviluppo di reti in fibra ottica, permitting, ingegneria e servizi IT per imprese pubbliche e private.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "" },
      {
        name: "twitter:title",
        content: "FI.CO. SRL — Telecomunicazioni, Fibra Ottica e Servizi IT",
      },
      {
        name: "twitter:description",
        content:
          "FI.CO. SRL: progettazione, gestione e sviluppo di reti in fibra ottica, permitting, ingegneria e servizi IT per imprese pubbliche e private.",
      },
      { property: "og:image", content: "/fico-logo.png" },
      { name: "twitter:image", content: "/fico-logo.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="it">
      <head>
        <HeadContent />
      </head>
      <body className="overflow-x-hidden bg-[#011C27] text-white antialiased w-full h-full m-0 p-0">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const router = useRouter();

  // Navigazione iniziale: forza l'apertura della Home al caricamento dell'app.
  // Questa scelta mantiene il punto di ingresso del sito coerente anche quando il
  // browser ripristina una scheda o una sessione lasciata su un'altra URL.
  useEffect(() => {
    // Il redirect viene eseguito al mount iniziale, dopo un caricamento normale,
    // un refresh o il ripristino di una scheda mobile rimasta inattiva.
    // replace: true evita di aggiungere una voce artificiale alla cronologia del browser,
    // quindi il pulsante Indietro non ripropone la URL di ingresso precedente.
    router.navigate({ to: '/', replace: true });
  }, [router]);

  return (
    <QueryClientProvider client={queryClient}>
      <Preloader />

      <div className="relative flex flex-col min-h-screen w-full max-w-[100vw] overflow-x-hidden">
        <Navbar />

        <main className="flex-1 w-full relative">
          <Outlet />
        </main>

        <Footer />
        
        <CookieBanner />
      </div>
    </QueryClientProvider>
  );
}