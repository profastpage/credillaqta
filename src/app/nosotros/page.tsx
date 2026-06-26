import type { Metadata } from "next";
import Image from "next/image";
import {
  Building2,
  ShieldCheck,
  Target,
  Eye,
  Heart,
  Scale,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { SITE_CONFIG } from "@/lib/constants";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import DeepLinking from "@/components/DeepLinking";

export const metadata: Metadata = {
  title: "Nosotros — Información Institucional",
  description:
    "Conoce CORPORACIÓN MANDI SAC (RUC: 20615991938). Tu aliado financiero de confianza con años de experiencia en soluciones crediticias en Perú.",
  alternates: { canonical: "/nosotros" },
};

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Transparencia",
    desc: "Operamos con total honestidad y claridad en cada transacción. Nuestras condiciones son comunicadas de manera directa, sin letras pequeñas ni sorpresas desagradables para nuestros clientes.",
  },
  {
    icon: Target,
    title: "Compromiso",
    desc: "Nos comprometemos con el éxito financiero de cada cliente. Trabajamos incansablemente para ofrecer soluciones que realmente se adapten a sus necesidades y posibilidades económicas.",
  },
  {
    icon: Heart,
    title: "Confianza",
    desc: "Construyendo relaciones a largo plazo basadas en la confiabilidad mutua. Cada cliente es parte fundamental de nuestra comunidad y merece un trato digno y respetuoso.",
  },
  {
    icon: Eye,
    title: "Innovación",
    desc: "Implementamos tecnología de punta para agilizar procesos y ofrecer una experiencia financiera moderna, accesible y eficiente a todos nuestros usuarios.",
  },
];

const LEGAL_ITEMS = [
  {
    title: "Política de Privacidad",
    desc: "Protegemos tus datos personales conforme a la Ley N.° 29733, Ley de Protección de Datos Personales. Tu información es tratada con estricta confidencialidad y solo se utiliza para los fines autorizados.",
  },
  {
    title: "Términos y Condiciones",
    desc: "Todas nuestras operaciones se rigen por la legislación peruana vigente, incluyendo las disposiciones de la Superintendencia de Banca, Seguros y AFP (SBS). Condiciones claras y justas para todas las partes.",
  },
  {
    title: "Libro de Reclamaciones",
    desc: "Garantizamos tu derecho a una atención justa. Contamos con un Libro de Reclamaciones disponible en todas nuestras agencias y a través de nuestros canales digitales para tu comodidad.",
  },
  {
    title: "Tasa de Costo Efectivo Anual (TCEA)",
    desc: "La TCEA varía según el monto, plazo y perfil del cliente. Te invitamos a comunicarte con nuestros asesores para obtener información detallada y personalizada sobre las tasas aplicables a tu caso.",
  },
];

export default function NosotrosPage() {
  return (
    <>
      <Navbar />
      <main>
        <DeepLinking>
        {/* Hero — Full Bleed Immersive */}
        <section id="inicio" className="relative h-screen w-full flex items-center overflow-hidden bg-slate-950">
          {/* Background Image */}
          <Image
            src="/hero-nosotros.webp"
            alt="Sobre MANDI CORP"
            fill
            priority
            quality={75}
            sizes="100vw"
            className="object-cover object-center opacity-45 pointer-events-none select-none"
          />
          {/* Asymmetric Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/50 to-transparent mix-blend-multiply" />
          {/* Bottom fade — dark blend */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <Building2 className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-medium text-white/80">
                  Sobre Nosotros
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.08] tracking-tight">
                Tu aliado financiero{" "}
                <span className="text-gold-metallic">
                  de confianza
                </span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-white/70 max-w-2xl leading-relaxed">
                En MANDI CORP creemos que cada persona merece acceso a
                soluciones financieras justas, transparentes y adaptadas a sus
                necesidades reales.
              </p>
            </div>
          </div>

          {/* Ver Más — scroll suave a Quiénes somos */}
          <a
            href="#nosotros-info"
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-slate-300 hover:text-orange-400 transition-colors group"
          >
            <span className="text-xs font-semibold tracking-wider uppercase">Ver más</span>
            <svg className="w-5 h-5 mt-1 animate-bounce text-orange-400 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </a>
        </section>

        {/* About */}
        <section id="nosotros-info" className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Team & Office Images */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="relative rounded-3xl overflow-hidden shadow-xl h-64 md:h-80">
                <Image
                  src="/images/team-meeting.jpg"
                  alt="Equipo de trabajo de MANDI CORP en reunión"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <p className="text-white font-bold text-lg">Nuestro Equipo</p>
                  <p className="text-white/70 text-sm">Profesionales dedicados</p>
                </div>
              </div>
              <div className="relative rounded-3xl overflow-hidden shadow-xl h-64 md:h-80">
                <Image
                  src="/images/office-building.jpg"
                  alt="Oficinas de MANDI CORP en Lima, Perú"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <p className="text-white font-bold text-lg">Nuestra Sede</p>
                  <p className="text-white/70 text-sm">Lima, Perú</p>
                </div>
              </div>
            </div>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gold-luxury tracking-tight mb-6">
                  ¿Quiénes somos?
                </h2>
                <div className="space-y-4 text-slate-300 leading-relaxed">
                  <p>
                    <strong className="text-white">MANDI CORP</strong> es una marca comercial de{" "}
                    <strong className="text-white">{SITE_CONFIG.businessName}</strong> (RUC: {SITE_CONFIG.ruc}),
                    una empresa peruana dedicada a brindar soluciones financieras
                    accesibles y confiables a miles de familias en todo el territorio
                    nacional.
                  </p>
                  <p>
                    Con años de experiencia en el sector financiero, hemos
                    desarrollado productos crediticios innovadores que se adaptan a
                    las necesidades reales de nuestros clientes. Nuestro compromiso
                    fundamental es la transparencia total en cada operación y el
                    trato digno y respetuoso que cada persona merece.
                  </p>
                  <p>
                    Contamos con un equipo de profesionales altamente capacitados
                    que trabajan incansablemente para simplificar el acceso al
                    crédito, eliminando barreras burocráticas y ofreciendo un
                    servicio personalizado que marca la diferencia en la experiencia
                    financiera de nuestros usuarios.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4 mt-8">
                  <div className="bg-white/[0.04] rounded-xl px-5 py-3">
                    <p className="text-2xl font-bold text-[#DCAA61]">5K+</p>
                    <p className="text-xs text-orange-400 mt-0.5">Clientes Atendidos</p>
                  </div>
                  <div className="bg-white/[0.04] rounded-xl px-5 py-3">
                    <p className="text-2xl font-bold text-green-400">98%</p>
                    <p className="text-xs text-green-400 mt-0.5">Satisfacción</p>
                  </div>
                  <div className="bg-white/[0.04] rounded-xl px-5 py-3">
                    <p className="text-2xl font-bold text-amber-400">24h</p>
                    <p className="text-xs text-amber-400 mt-0.5">Aprobación Express</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/[0.03] backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-2xl">
                <h3 className="text-xl font-bold text-gold-luxury-subtle mb-6">Información Legal</h3>
                <div className="space-y-4">
                  <div className="glass rounded-xl p-4">
                    <p className="text-xs text-slate-400">Razón Social</p>
                    <p className="text-sm font-semibold text-slate-100 mt-1">{SITE_CONFIG.businessName}</p>
                  </div>
                  <div className="glass rounded-xl p-4">
                    <p className="text-xs text-slate-400">RUC</p>
                    <p className="text-sm font-semibold text-slate-100 mt-1">{SITE_CONFIG.ruc}</p>
                  </div>
                  <div className="glass rounded-xl p-4">
                    <p className="text-xs text-slate-400">Marca Comercial</p>
                    <p className="text-sm font-semibold text-slate-100 mt-1">{SITE_CONFIG.name}</p>
                  </div>
                  <div className="glass rounded-xl p-4">
                    <p className="text-xs text-slate-400">Contacto Principal</p>
                    <p className="text-sm font-semibold text-slate-100 mt-1">{SITE_CONFIG.phone}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section id="valores" className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-12 items-start">
              <div className="lg:col-span-2">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gold-luxury tracking-tight mb-4">
                  Nuestros <span className="text-[#DCAA61]">Valores</span>
                </h2>
                <p className="text-slate-400 max-w-2xl mb-12">
                  Cada decisión que tomamos está guiada por estos principios fundamentales que definen nuestra identidad como empresa.
                </p>
                <div className="grid sm:grid-cols-2 gap-6">
                  {VALUES.map((v) => (
                    <div key={v.title} className="bg-white/[0.02] backdrop-blur-md rounded-2xl p-6 border border-white/5 hover:shadow-xl hover:shadow-black/20 transition-shadow duration-300">
                      <div className="w-12 h-12 rounded-xl bg-white/[0.06] flex items-center justify-center mb-4">
                        <v.icon className="w-6 h-6 text-[#DCAA61]" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">{v.title}</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">{v.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/30 sticky top-24">
                  <Image
                    src="/images/office-team.jpg"
                    alt="Equipo de trabajo colaborando en oficinas de MANDI CORP"
                    width={360}
                    height={480}
                    className="w-full h-auto object-cover rounded-3xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-orange-900/20 to-transparent rounded-3xl" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Legal */}
        <section id="legal" className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Scale className="w-10 h-10 text-[#DCAA61] mx-auto mb-4" />
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gold-luxury tracking-tight">
                Información <span className="text-[#DCAA61]">Legal</span>
              </h2>
              <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
                Cumplimos con todas las normativas legales vigentes para garantizar tu protección y seguridad como consumidor financiero.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {LEGAL_ITEMS.map((item) => (
                <div key={item.title} className="bg-white/[0.02] backdrop-blur-md border border-white/5 rounded-2xl p-6 shadow-xl shadow-black/10">
                  <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contacto" className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="bg-white/[0.02] backdrop-blur-md border border-white/5 rounded-3xl p-10 sm:p-16 text-center shadow-2xl relative overflow-hidden">
              <div className="absolute -top-20 -left-20 w-60 h-60 bg-[#DCAA61]/10 rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-[#A97631]/10 rounded-full blur-[80px] pointer-events-none" />
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gold-luxury tracking-tight">
                ¿Necesitas más información?
              </h2>
              <p className="mt-4 text-lg text-white/70 max-w-xl mx-auto mb-8">
                Estamos aquí para ayudarte. Contáctanos por el canal que prefieras.
              </p>
              <div className="grid sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
                <a
                  href={getWhatsAppUrl("contacto")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 glass rounded-2xl p-5 hover:bg-white/20 transition-colors duration-300"
                >
                  <Phone className="w-6 h-6 text-green-400" />
                  <span className="text-sm font-semibold text-white">WhatsApp</span>
                  <span className="text-xs text-white/60">{SITE_CONFIG.phone}</span>
                </a>
                <div className="flex flex-col items-center gap-2 glass rounded-2xl p-5">
                  <Phone className="w-6 h-6 text-orange-400" />
                  <span className="text-sm font-semibold text-white">Central</span>
                  <span className="text-xs text-white/60">{SITE_CONFIG.phoneDisplay}</span>
                </div>
                <div className="flex flex-col items-center gap-2 glass rounded-2xl p-5">
                  <Mail className="w-6 h-6 text-orange-400" />
                  <span className="text-sm font-semibold text-white">Email</span>
                  <span className="text-xs text-white/60">{SITE_CONFIG.email}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        </DeepLinking>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
