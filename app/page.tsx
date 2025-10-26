"use client";
import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Globe, BookOpen, Rocket, Search, Filter, ExternalLink, BadgeCheck, MapPin, Sparkles, Heart, Menu, X } from "lucide-react";
import { getProjects, getPathSteps, type Project, type PathStep } from "../lib/sanity";
import Image from "next/image";

// ————————————————————————————————————————————————
// CRIPTOCHINGADERAS — Dynamic React page with Sanity CMS
// Data dinámicamente cargada desde Sanity Studio
// ————————————————————————————————————————————————

// PathSteps ahora vienen desde Sanity CMS

// Utilidades de UI
const Chip: React.FC<{ active?: boolean; onClick?: () => void; children: React.ReactNode }> = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1 rounded-full text-sm border transition-all ${
      active
        ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-blue-400 shadow"
        : "bg-black/30 backdrop-blur border-white/20 text-white hover:bg-blue-500/10 hover:border-blue-400/30"
    }`}
  >
    {children}
  </button>
);

const SectionTitle: React.FC<{ icon: React.ReactNode; title: string; subtitle?: string }> = ({ icon, title, subtitle }) => (
  <div className="flex items-end justify-between gap-4 mb-6">
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-xl bg-white/10 border border-white/20">{icon}</div>
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h2>
    </div>
    {subtitle && <p className="text-sm text-white/70 hidden md:block">{subtitle}</p>}
  </div>
);

// Componente principal
export default function CriptochingaderasSite() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string>("todos");
  const [menuOpen, setMenuOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [pathSteps, setPathSteps] = useState<PathStep[]>([]);
  const [loading, setLoading] = useState(true);
  const [pathLoading, setPathLoading] = useState(true);

  // Cargar proyectos desde Sanity
  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error('Error loading projects:', error);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  // Cargar path steps desde Sanity
  useEffect(() => {
    async function loadPathSteps() {
      try {
        const data = await getPathSteps();
        setPathSteps(data);
      } catch (error) {
        console.error('Error loading path steps:', error);
      } finally {
        setPathLoading(false);
      }
    }
    loadPathSteps();
  }, []);

  const tags = useMemo(() => {
    const t = new Set<string>();
    projects.forEach((p) => p.tags?.forEach((tag) => t.add(tag)));
    return ["todos", ...Array.from(t).sort()];
  }, [projects]);

  const filtered = useMemo(() => {
    return projects
      .filter((p) =>
        activeTag === "todos" ? true : p.tags?.includes(activeTag)
      )
      .filter((p) =>
        query.trim()
          ? (p.title + " " + p.description + " " + (p.tags?.join(" ") || "")).toLowerCase().includes(query.toLowerCase())
          : true
      )
      .sort((a, b) => b.year - a.year);
  }, [query, activeTag, projects]);

  return (
    <div className="min-h-screen text-white bg-[radial-gradient(1200px_600px_at_50%_-200px,rgba(93,173,226,0.35),transparent_60%),radial-gradient(1200px_600px_at_-20%_20%,rgba(52,152,219,0.25),transparent_60%),#0c0c0e]">
      {/* NAV */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/40 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="#home" className="flex items-center">
            <Image 
              src="/criptochingaderas_horizontal_white.png" 
              alt="CriptoChingaderas Logo" 
              width={200} 
              height={36}
              className="h-9 w-auto"
            />
          </a>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#projects" className="opacity-80 hover:opacity-100">Proyectos</a>
            <a href="#path" className="opacity-80 hover:opacity-100">Camino Web2 → Web3</a>
            <a href="#about" className="opacity-80 hover:opacity-100">Acerca</a>
          </nav>

          <button className="md:hidden p-2 rounded-lg hover:bg-white/10" onClick={() => setMenuOpen((v) => !v)}>
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-2">
              <a href="#projects" className="py-2" onClick={() => setMenuOpen(false)}>Proyectos</a>
              <a href="#path" className="py-2" onClick={() => setMenuOpen(false)}>Camino Web2 → Web3</a>
              <a href="#about" className="py-2" onClick={() => setMenuOpen(false)}>Acerca</a>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="max-w-7xl mx-auto px-4 pt-14 md:pt-20 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-[1.2fr_0.8fr] gap-8 items-center"
        >
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Criptochingaderas que <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-400">sí jalan</span>
            </h1>
            <p className="mt-4 text-lg md:text-xl text-white/80">
              Proyectos reales, experimentos sabrosos y una guía para brincar de <span className="font-semibold">web2 → web3</span> sin romperte la <span className="italic">madre</span>. Puro código fino.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href="#projects" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:shadow-md hover:from-blue-600 hover:to-cyan-600 transition">
                <Rocket className="h-4 w-4" /> Ver proyectos
              </a>
              <a href="#path" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-blue-400/30 hover:bg-blue-500/10 hover:border-blue-400/50 transition">
                <BookOpen className="h-4 w-4" /> Camino Web2 → Web3
              </a>
            </div>
            
          </div>

          <div className="relative">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-blue-500/40 via-cyan-400/40 to-blue-600/40 blur-2xl"/>
            <div className="relative rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="aspect-video rounded-2xl bg-gradient-to-br from-black/60 to-black/30 flex flex-col items-center justify-center text-center p-6">
                <div className="mb-4">
                  <Image 
                    src="/criptochingaderas_conletras_white.png" 
                    alt="CriptoChingaderas Logo" 
                    width={200} 
                    height={200}
                    className="rounded-lg opacity-90"
                  />
                </div>
                <p className="text-white/80 max-w-sm text-sm">
                  "La neta no venimos a hablar, venimos a <span className="font-semibold">construir</span>. Si queda feo, se vuelve a hacer hasta que quede mamalón."
                </p>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-white/70">
                <span>v0.1 — barrio edition</span>
                <span>Hecho con <span className="opacity-80">React + Sanity</span></span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* PROYECTOS */}
      <section id="projects" className="max-w-7xl mx-auto px-4 py-10 md:py-14">
        <SectionTitle icon={<Rocket className="h-5 w-5" />} title="Proyectos" subtitle="Experimentos, productos y ñeri-hacks" />

        {/* Filtros */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex gap-2 flex-wrap">
            {tags.map((t) => (
              <Chip key={t} active={t === activeTag} onClick={() => setActiveTag(t)}>
                {t}
              </Chip>
            ))}
          </div>
          <div className="relative md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-70" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar criptochingadera..."
              className="w-full pl-10 pr-3 py-2 rounded-xl bg-black/30 border border-white/20 outline-none focus:ring-2 focus:ring-white/30"
            />
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-5 animate-pulse">
                <div className="h-6 bg-white/10 rounded mb-2"></div>
                <div className="h-4 bg-white/10 rounded mb-4"></div>
                <div className="flex gap-2">
                  <div className="h-6 w-16 bg-white/10 rounded"></div>
                  <div className="h-6 w-12 bg-white/10 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filtered.map((p, idx) => (
              <motion.article
                layout
                key={p._id || `${p.title}-${idx}`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.03 }}
                className="group rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/[0.08] hover:border-white/20 transition"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold leading-snug">{p.title}</h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-white/10 border border-white/10">{p.year}</span>
                </div>
                <p className="mt-2 text-sm text-white/80 min-h-[3.5rem]">{p.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tags?.map((t) => (
                    <span key={t} className="text-xs px-2 py-1 rounded-full bg-black/30 border border-white/10">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-3 text-sm">
                  {p.siteUrl ? (
                    <a href={p.siteUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:underline">
                      <Globe className="h-4 w-4" /> sitio
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1 opacity-60">
                      <Globe className="h-4 w-4" /> pronto
                    </span>
                  )}
                  {p.repoUrl ? (
                    <a href={p.repoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:underline">
                      <Github className="h-4 w-4" /> repo
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1 opacity-60">
                      <Github className="h-4 w-4" /> privado/por subir
                    </span>
                  )}
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}

        {filtered.length === 0 && (
          <div className="mt-6 text-white/70 text-sm flex items-center gap-2">
            <Filter className="h-4 w-4"/> No hay nada con ese filtro. Quita tantita mamonería y vuelve a intentar.
          </div>
        )}
      </section>

      {/* CAMINO WEB2 → WEB3 */}
      <section id="path" className="max-w-7xl mx-auto px-4 py-10 md:py-14">
        <SectionTitle icon={<BookOpen className="h-5 w-5" />} title="Camino Web2 → Web3" subtitle="Aprende sin llorar, construye sin permiso" />

        {pathLoading ? (
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="p-5 rounded-2xl border border-white/10 bg-white/5 animate-pulse">
                <div className="h-6 bg-white/10 rounded mb-2"></div>
                <div className="h-4 bg-white/10 rounded mb-4"></div>
                <div className="h-8 bg-white/10 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <ol className="space-y-4">
            {pathSteps.map((step, i) => (
              <motion.li
                key={step._id}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: i * 0.02 }}
                className="relative p-5 rounded-2xl border border-white/10 bg-white/5"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-semibold text-lg">
                    <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10 border border-white/20 text-xs">
                      {step.stepNumber}
                    </span>
                    {step.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs opacity-70">
                    {step.estimatedTime && (
                      <span className="px-2 py-1 rounded-full bg-white/10">
                        {step.estimatedTime}h
                      </span>
                    )}
                    <span className="hidden md:inline-flex items-center gap-1">
                      <ExternalLink className="h-4 w-4"/> Haz el hands-on, ñero
                    </span>
                  </div>
                </div>
                <p className="mt-1 text-white/80">{step.summary}</p>

                <details className="mt-3 group open:shadow-inner open:bg-black/20 rounded-xl">
                  <summary className="cursor-pointer list-none flex items-center justify-between p-3 rounded-xl border border-white/10 hover:bg-white/5">
                    <span className="text-sm opacity-90">Ver temario y práctica</span>
                    <span className="text-xs opacity-60 group-open:rotate-180 transition">▼</span>
                  </summary>
                  <div className="p-4 grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-semibold mb-2">Qué aprender</h4>
                      <ul className="list-disc list-inside text-sm space-y-1 opacity-90">
                        {step.learn?.map((l, idx) => (
                          <li key={idx}>{l}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold mb-2">Hands-on</h4>
                      <ul className="list-disc list-inside text-sm space-y-1 opacity-90">
                        {step.handsOn?.map((h, idx) => (
                          <li key={idx}>{h}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {step.resources && step.resources.length > 0 && (
                    <div className="px-4 pb-4">
                      <h4 className="text-sm font-semibold mb-2">Recursos adicionales</h4>
                      <div className="flex flex-wrap gap-2">
                        {step.resources.map((resource, idx) => (
                          <a
                            key={idx}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs px-2 py-1 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition"
                          >
                            {resource.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </details>
              </motion.li>
            ))}
          </ol>
        )}

        {!pathLoading && (
          <div className="mt-6 text-sm text-white/70">
            Tip de compas: aprende lo justo para entregar un MVP, publícalo, recibe putazos (feedback) y vuelve a iterar. La práctica paga mejor que mil cursos.
          </div>
        )}
      </section>

      {/* ACERCA */}
      <section id="about" className="max-w-7xl mx-auto px-4 py-10 md:py-14">
        <SectionTitle icon={<Sparkles className="h-5 w-5" />} title="Acerca del proyecto" subtitle="Quién ch*ng@d@s hizo esto y por qué" />

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="font-semibold text-lg">La filosofía</h3>
            <p className="mt-2 text-white/80">
              criptochingaderas.com es el garage público de proyectos: algunos terminados, otros en el
              horno, todos con la intención de <span className="font-semibold">resolver cosas reales</span> y aprender en voz alta.
              Aquí no vendemos humo: mostramos código, procesos y cag*das de las que se aprende.
            </p>
            <p className="mt-3 text-white/70 text-sm">
              ¿Quieres colaborar o caguamear? Échame DM, arma PR o lánzate con un meme y una idea.
            </p>
            <div className="mt-4 flex items-center gap-3 text-sm">
              <a href="#projects" className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:from-blue-600 hover:to-cyan-600 transition">
                <Rocket className="h-4 w-4"/> Ver todo
              </a>
              <a href="https://github.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-blue-400/30 hover:bg-blue-500/10 hover:border-blue-400/50 transition">
                <Github className="h-4 w-4"/> GitHub
              </a>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="font-semibold text-lg">Créditos</h3>
            <ul className="mt-2 text-sm space-y-2 opacity-90">
              <li>Diseño: minimal.</li>
              <li>Stack: Next.js + TypeScript + Tailwind + Framer Motion + Sanity CMS.</li>
              <li>Licencia: MIT pa' que lo forkeen a gusto.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/70">
          <div>© {new Date().getFullYear()} criptochingaderas.com —  Hecho en 🇲🇽 con amor y otras sustancias </div>
          <div className="flex items-center gap-4">
            
            <a href="https://github.com/" className="inline-flex items-center gap-1 hover:opacity-100 opacity-80">
              <Github className="h-4 w-4"/> repo
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
