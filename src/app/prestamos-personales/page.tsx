import type { Metadata } from "next";
import Link from "next/link";
import {
  Zap,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  FileText,
  Banknote,
  Users,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Préstamos Personales al Instante",
  description:
    "Obtén tu préstamo personal rápido y sin complicaciones. Montos desde S/. 500 hasta S/. 20,000 con aprobación en menos de 24 horas. Unión El Progreso - Grupo El Progreso Perú S.A.C.",
  alternates: { canonical: "/prestamos-personales" },
};

const BENEFITS = [
  {
    icon: Clock,
    title: "Aprobación Express",
    desc: "Recibe una respuesta en menos de 24 horas hábiles desde que presentas tu documentación completa. Sin esperas interminables ni trámites burocráticos.",
  },
  {
    icon: Banknote,
    title: "Montos Flexibles",
    desc: "Accede a montos desde S/. 500 hasta S/. 20,000 según tu perfil y capacidad de pago. Elige el monto que mejor se adapte a tus necesidades financieras.",
  },
  {
    icon: ShieldCheck,
    title: "Trámites Simplificados",
    desc: "Solo necesitas tu DNI vigente, un recibo de servicio y tus datos de ingresos. Proceso 100% digital y sin complicaciones innecesarias.",
  },
  {
    icon: Users,
    title: "Asesoría Personalizada",
    desc: "Un asesor dedicado te acompaña en todo el proceso, aclarando cada duda y garantizando que obtengas la mejor condición para tu préstamo.",
  },
];

const REQUIREMENTS = [
  "Documento Nacional de Identidad (DNI) vigente",
  "Recibo de servicio reciente (agua, luz o internet)",
  "Información sobre tus ingresos actuales",
  "Ser mayor de 18 años y menor de 65 años",
  "No tener registros negativos en centrales de riesgo impeditivos",
];

const STEPS = [
  {
    step: "01",
    title: "Envía tu Solicitud",
    desc: "Comunícate con nosotros por WhatsApp o completa el formulario en línea con tus datos básicos. El proceso toma solo 5 minutos.",
  },
  {
    step: "02",
    title: "Evaluación Rápida",
    desc: "Nuestro equipo analiza tu solicitud y tu capacidad de pago de forma integral. Te contactamos con la respuesta en menos de 24 horas.",
  },
  {
    step: "03",
    title: "Recepción de Fondos",
    desc: "Una vez aprobado, el dinero se deposita directamente en tu cuenta bancaria. Sin demoras ni intermediarios.",
  },
];

export default function PrestamosPersonalesPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-24 hero-gradient overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <Zap className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-medium text-white/80">
                  Préstamo Personal
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.08] tracking-tight">
                Préstamos al{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
                  Instante
                </span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-white/70 max-w-2xl leading-relaxed">
                Dinero rápido cuando más lo necesitas. Montos desde S/. 500
                hasta S/. 20,000 con aprobación en menos de 24 horas. Sin
                trámites complicados.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <a
                  href={getWhatsAppUrl("prestamos-personales")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-brand-green hover:bg-green-600 text-white px-8 py-4 rounded-2xl text-base font-bold shadow-2xl shadow-green-900/30 transition-all duration-300 hover:scale-[1.03]"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                  Solicitar Mi Préstamo
                </a>
                <Link href="#calculadora" className="inline-flex items-center justify-center gap-2 glass text-white px-8 py-4 rounded-2xl text-base font-semibold hover:bg-white/20 transition-all duration-300">
                  Calcular Cuota
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50 to-transparent" />
        </section>

        {/* Benefits */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight text-center mb-12">
              ¿Por qué elegir nuestro{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700">
                préstamo personal
              </span>
              ?
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {BENEFITS.map((b) => (
                <div key={b.title} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-lg shadow-slate-900/5 hover:shadow-xl transition-shadow duration-300">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                    <b.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{b.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Requirements */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-6">
                  Requisitos <span className="text-blue-600">Simples</span>
                </h2>
                <p className="text-slate-500 mb-8 leading-relaxed">
                  Hemos simplificado nuestros requisitos al mínimo para que puedas acceder a tu préstamo de forma ágil. No necesitas avales ni garantías adicionales.
                </p>
                <ul className="space-y-4">
                  {REQUIREMENTS.map((req) => (
                    <li key={req} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-sm text-slate-700">{req}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={getWhatsAppUrl("prestamos-personales")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-brand-green hover:bg-green-700 text-white px-6 py-3 rounded-xl text-sm font-bold mt-8 transition-colors duration-300"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                  Verificar Mis Requisitos
                </a>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 sm:p-10">
                <FileText className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-4">Documentos Necesarios</h3>
                <div className="space-y-3">
                  <div className="bg-white rounded-xl p-4 border border-slate-100">
                    <p className="text-sm font-semibold text-slate-800">DNI Vigente</p>
                    <p className="text-xs text-slate-400 mt-1">Documento Nacional de Identidad actualizado</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-slate-100">
                    <p className="text-sm font-semibold text-slate-800">Recibo de Servicio</p>
                    <p className="text-xs text-slate-400 mt-1">Agua, luz o internet (no mayor a 2 meses)</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-slate-100">
                    <p className="text-sm font-semibold text-slate-800">Información de Ingresos</p>
                    <p className="text-xs text-slate-400 mt-1">Boletas, recibos por honorarios o declaraciones</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight text-center mb-4">
              Proceso en <span className="text-blue-600">3 Pasos</span>
            </h2>
            <p className="text-slate-500 text-center max-w-2xl mx-auto mb-12">
              Solicitar tu préstamo personal nunca fue tan sencillo. Sigue estos tres pasos y obtén tu dinero.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {STEPS.map((s) => (
                <div key={s.step} className="bg-white rounded-3xl p-8 shadow-lg shadow-slate-900/5 border border-slate-100">
                  <span className="text-5xl font-black text-blue-100">{s.step}</span>
                  <h3 className="text-xl font-bold text-slate-900 mt-3 mb-3">{s.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="hero-gradient rounded-3xl p-10 sm:p-16 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                ¿Listo para obtener tu préstamo?
              </h2>
              <p className="mt-4 text-lg text-white/70 max-w-xl mx-auto">
                Habla con un asesor ahora y recibe tu aprobación hoy mismo.
              </p>
              <a
                href={getWhatsAppUrl("prestamos-personales")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-brand-green hover:bg-green-600 text-white px-10 py-4 rounded-2xl text-lg font-bold shadow-2xl shadow-green-900/30 mt-8 transition-all duration-300 hover:scale-[1.03]"
              >
                Solicitar Préstamo Personal
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
