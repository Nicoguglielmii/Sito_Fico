import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, ChevronDown, Home, Building2, Briefcase, Phone } from "lucide-react";

// Le immagini accompagnano le card del menu Servizi e offrono un riferimento visivo
// immediato alle aree disponibili. Gli import statici permettono al bundler di gestire
// correttamente gli asset anche nella build di produzione.
import fibraMobileImg from "@/assets/fibraotticaemobile.jpg";
import networkingImg from "@/assets/networking.jpg";
import energiaImg from "@/assets/Energia.jpg";

export function Navbar() {
  // I menu desktop e mobile hanno stati separati perché presentano interazioni diverse.
  // Il primo stato controlla la sidebar, gli altri due gestiscono i rispettivi dropdown.
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileServiziOpen, setIsMobileServiziOpen] = useState(false);
  const [isDesktopServiziOpen, setIsDesktopServiziOpen] = useState(false);

  // Riporta tutta la navigazione a una condizione chiusa dopo un cambio pagina o un click esterno.
  const closeAllMenus = () => {
    setIsOpen(false);
    setIsMobileServiziOpen(false);
    setIsDesktopServiziOpen(false);
  };

  // Se l'utente seleziona la pagina già aperta, sostituisce la navigazione con uno scroll
  // morbido verso l'inizio; in ogni caso chiude i menu eventualmente ancora visibili.
  const handleNavClick = (e: React.MouseEvent, path: string) => {
    if (window.location.pathname === path) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    closeAllMenus();
  };

  const menuItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "L'azienda", path: "/chi-siamo", icon: Building2 },
  ];

  // active distingue i servizi navigabili dalle voci ancora in sviluppo. Lo stesso elenco
  // alimenta sia il dropdown desktop sia il menu espandibile della sidebar mobile.
  const serviziMenu = [
    { name: "Fibra & Mobile", path: "/servizi/fibra-mobile", image: fibraMobileImg, active: true },
    { name: "IT & Software", path: "/servizi/it-software", image: networkingImg, active: true },
    { name: "Energia", path: "#", image: energiaImg, active: false },
  ];

  return (
    <>
      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>

      <nav className="fixed top-0 left-0 right-0 z-40 bg-[#011C27] border-b border-[#0e7490]/20 h-20 md:h-24 lg:h-[100px] flex items-center justify-between px-4 md:px-6 lg:px-12">
        <div className="flex items-center gap-4 md:gap-5 shrink-0">
          <button onClick={() => setIsOpen(true)} className="text-[#fde047] hover:text-yellow-200 transition-colors shrink-0">
            <Menu size={32} />
          </button>
          <Link to="/" onClick={(e) => handleNavClick(e, "/")} className="flex items-center group">
            <img src="/fico-logo.png" alt="FI.CO. SRL" className="h-10 md:h-12 lg:h-[52px] w-auto object-contain transition-transform group-hover:scale-105" />
          </Link>
        </div>

        {/* Navigazione desktop: mostra i collegamenti principali nella barra superiore da md in poi. */}
        <div className="hidden md:flex flex-1 items-center justify-center gap-6 lg:gap-10 h-full">
          {menuItems.map((item) => (
            <Link key={item.name} to={item.path} onClick={(e) => handleNavClick(e, item.path)} className="text-[16px] lg:text-[18px] font-semibold text-[#fde047] hover:text-yellow-200 flex items-center gap-2">
              <item.icon size={20} /> {item.name}
            </Link>
          ))}

          {/* Il menu Servizi desktop separa il link all'indice dal pulsante che apre il dropdown. */}
          <div className="relative shrink-0 flex items-center h-full">
            <div className={`fixed top-20 md:top-24 lg:top-[100px] inset-x-0 bottom-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 -z-10 ${isDesktopServiziOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} onClick={() => setIsDesktopServiziOpen(false)} />
            
            <div className="flex items-center gap-0.5">
              <Link to="/servizi" onClick={(e) => handleNavClick(e, "/servizi")} className="text-[16px] lg:text-[18px] font-semibold text-[#fde047] hover:text-yellow-200 flex items-center gap-2">
                <Briefcase size={20} /> Servizi
              </Link>
              <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsDesktopServiziOpen(!isDesktopServiziOpen); }} className="p-1 text-[#fde047] hover:text-yellow-200 outline-none transition-colors">
                <ChevronDown size={18} className={`transition-transform duration-300 ${isDesktopServiziOpen ? "rotate-180" : ""}`} />
              </button>
            </div>

            {/* La tendina mostra immagini, titoli e stato dei servizi in una griglia a tre colonne. */}
            <div className={`absolute top-[80%] left-1/2 -translate-x-1/2 w-[760px] pt-4 transition-all duration-500 z-[999] ${isDesktopServiziOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"}`}>
              <div className="bg-[#011C27] border border-[#0e7490]/30 rounded-2xl shadow-2xl p-5 grid grid-cols-3 gap-4">
                {serviziMenu.map((item) => 
                  item.active ? (
                    <Link key={item.name} to={item.path} onClick={(e) => handleNavClick(e, item.path)} className="flex flex-col gap-3 p-3 rounded-xl hover:bg-[#0e7490]/20 text-white group transition-all">
                      <div className="w-full aspect-video rounded-lg overflow-hidden border border-[#0e7490]/30 shadow-md">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      </div>
                      <span className="font-semibold text-base group-hover:text-[#fde047] transition-colors">{item.name}</span>
                    </Link>
                  ) : (
                    <div key={item.name} className="flex flex-col gap-3 p-3 rounded-xl text-white/40 cursor-not-allowed">
                      <div className="w-full aspect-video rounded-lg overflow-hidden border border-white/5 shadow-md relative">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-40 grayscale-[50%]" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-base">{item.name}</span>
                        <span className="bg-[#facc15] text-[#011C27] text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                          In Sviluppo
                        </span>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          <Link to="/contatti" onClick={(e) => handleNavClick(e, "/contatti")} className="text-[16px] lg:text-[18px] font-semibold text-[#fde047] hover:text-yellow-200 flex items-center gap-2">
            <Phone size={20} /> Contatti
          </Link>
        </div>
        <div className="hidden md:block w-[120px] shrink-0"></div>
      </nav>

      {/* Sidebar mobile: il backdrop chiude il pannello con un click esterno e la sidebar contiene i link touch-friendly. */}
      {isOpen && <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] transition-opacity" onClick={closeAllMenus} />}
      
      <div className={`fixed top-0 left-0 bottom-0 w-[280px] bg-[#011C27] z-[10000] transform transition-transform duration-300 border-r border-[#0e7490]/20 flex flex-col ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        
        {/* Intestazione della sidebar: Modificata altezza del logo (da h-8 a h-12) */}
        <div className="flex justify-between items-start p-6 border-b border-[#0e7490]/20 shrink-0">
          <div className="flex flex-col gap-8">
            {/* <-- MODIFICA QUI: classe h-12 invece di h-8 per un logo più grande --> */}
            <img src="/fico-logo.png" alt="FI.CO. SRL" className="h-12 w-auto object-contain" />
            <span className="text-sm font-bold tracking-widest text-[#38bdf8] uppercase">MENU</span>
          </div>
          <button onClick={closeAllMenus} className="text-[#fde047] pt-1">
            <X size={26} />
          </button>
        </div>

        <div className="flex flex-col p-6 space-y-6 overflow-y-auto flex-1 no-scrollbar">
          {/* Link principali: condividono le destinazioni desktop con spaziature adatte al touch. */}
          {menuItems.map((item) => (
            <Link key={item.name} to={item.path} onClick={(e) => handleNavClick(e, item.path)} className="text-xl font-medium text-[#fde047] flex items-center gap-3">
              <item.icon size={22} /> {item.name}
            </Link>
          ))}
          
          {/* Il dropdown mobile apre le card dei servizi senza rimuovere il link all'indice. */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <Link to="/servizi" onClick={(e) => handleNavClick(e, "/servizi")} className="text-xl font-medium text-[#fde047] flex items-center gap-3 py-2 flex-1">
                <Briefcase size={22} /> Servizi
              </Link>
              <button onClick={() => setIsMobileServiziOpen(!isMobileServiziOpen)} className="p-2 text-[#fde047] bg-white/5 rounded-lg">
                <ChevronDown size={22} className={`transition-transform duration-300 ${isMobileServiziOpen ? "rotate-180" : ""}`} />
              </button>
            </div>
            {/* L'altezza massima accoglie le tre card e permette una transizione fluida in apertura. */}
            <div className={`overflow-hidden transition-all duration-300 ${isMobileServiziOpen ? "max-h-[800px]" : "max-h-0"}`}>
              <div className="flex flex-col gap-6 pl-4 border-l border-[#0e7490]/30 ml-3 py-3">
                {serviziMenu.map((item) => 
                  item.active ? (
                    <Link key={item.name} to={item.path} onClick={(e) => handleNavClick(e, item.path)} className="flex flex-col gap-2 text-base text-gray-200 group">
                      <div className="w-full aspect-video shrink-0 rounded-lg overflow-hidden border border-[#0e7490]/30 shadow-sm">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      </div>
                      <span className="font-medium group-hover:text-[#fde047] transition-colors">{item.name}</span>
                    </Link>
                  ) : (
                    <div key={item.name} className="flex flex-col gap-2 text-base text-gray-500 cursor-not-allowed">
                      <div className="w-full aspect-video shrink-0 rounded-lg overflow-hidden border border-white/5 shadow-sm">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-40 grayscale-[50%]" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{item.name}</span>
                        <span className="bg-[#facc15] text-[#011C27] text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                          In Sviluppo
                        </span>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
          
          <Link to="/contatti" onClick={(e) => handleNavClick(e, "/contatti")} className="text-xl font-medium text-[#fde047] flex items-center gap-3">
            <Phone size={22} /> Contatti
          </Link>

          {/* Footer della sidebar: completa il menu mobile con identita del brand, social e copyright. */}
          <div className="mt-auto pt-10 flex flex-col items-start">
            <p className="text-[12px] text-gray-400 leading-relaxed mb-5">
              Telecomunicazioni, reti in fibra ottica, ingegneria, permitting e servizi IT per enti pubblici e privati.
            </p>
            <div className="w-full h-px bg-[#0e7490]/20 mb-4"></div>
            <p className="text-[11px] text-gray-500">
              © {new Date().getFullYear()} FI.CO. SRL. Tutti i diritti riservati.
            </p>
          </div>

        </div>
      </div>
    </>
  );
}