import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Check, Copy } from 'lucide-react';
import { COMPANY_INFO } from '../../data/companyData';
import { INFO_VERTICAL_LIST, type InfoRoutePath } from '../../data/infoLandingData';

interface InfoClosingSectionProps {
  contextLabel: string;
  whatsappPrefill: string;
  onNavigate: (route: string) => void;
}

interface ContactFields {
  nombre: string;
  empresa: string;
  email: string;
  telefono: string;
  mensaje: string;
}

export const InfoClosingSection: React.FC<InfoClosingSectionProps> = ({
  contextLabel,
  whatsappPrefill,
  onNavigate,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [form, setForm] = useState<ContactFields>({
    nombre: '',
    empresa: '',
    email: '',
    telefono: '',
    mensaje: '',
  });
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [preparedBody, setPreparedBody] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const buildSummary = () =>
    [
      `Consulta desde /info (${contextLabel})`,
      `Nombre: ${form.nombre.trim()}`,
      `Empresa: ${form.empresa.trim() || 'No especificada'}`,
      `Email: ${form.email.trim()}`,
      `Teléfono: ${form.telefono.trim() || 'No especificado'}`,
      '',
      'Cuéntanos en qué te podemos ayudar:',
      form.mensaje.trim(),
    ].join('\n');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!form.nombre.trim()) {
      setErrorMsg('Por favor ingresa tu nombre.');
      return;
    }
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setErrorMsg('Por favor ingresa un correo electrónico válido.');
      return;
    }
    if (!form.mensaje.trim()) {
      setErrorMsg('Cuéntanos brevemente en qué te podemos ayudar.');
      return;
    }

    const body = buildSummary();
    setPreparedBody(body);

    const subject = `Nueva consulta (${contextLabel}) — ${form.nombre.trim()}`;
    window.location.href = `mailto:${COMPANY_INFO.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  const handleWhatsApp = () => {
    const hasDetails = Boolean(form.nombre.trim() || form.mensaje.trim());
    const text = hasDetails ? buildSummary() : whatsappPrefill;
    window.open(
      `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const handleCopy = async () => {
    if (!preparedBody) return;
    try {
      await navigator.clipboard.writeText(preparedBody);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      // Clipboard unavailable
    }
  };

  return (
    <div id="contacto-info">
      {/* Monumental Corporate Color Closing Poster Block */}
      <section className="w-full bg-[#0A8A37] dark:bg-[#0D963F] text-white overflow-hidden select-none">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pt-14 sm:pt-20 lg:pt-24 pb-6 sm:pb-10 lg:pb-12">
          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(2.4rem,9.2vw,8.6rem)] font-light uppercase tracking-[-0.04em] leading-[0.9] text-[#052912] dark:text-[#041F0D]"
          >
            CREAMOS
            <br />
            BUENA
            <br />
            IMPRESIÓN
          </motion.p>
        </div>
      </section>

      {/* Contrasting Minimalist Contact Form Section */}
      <section className="bg-white dark:bg-[#07090D] text-[#262D38] dark:text-[#F5F7FA] border-t border-slate-200 dark:border-white/10">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pt-14 sm:pt-20 pb-20">
          <div className="max-w-3xl">
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-light tracking-[-0.025em] leading-none text-[#262D38] dark:text-white">
              ¿CREAMOS{' '}
              <span className="text-[#0B7E32] dark:text-[#21E45B]">JUNTOS?</span>
            </h2>

            <form onSubmit={handleSubmit} className="mt-10 sm:mt-12 space-y-8" noValidate>
              {/* Row 1: Nombre & Empresa (opcional) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10">
                <div>
                  <label
                    htmlFor="priamo-info-nombre"
                    className="block text-[10px] font-medium uppercase tracking-[0.18em] text-[#262D38]/70 dark:text-slate-400 mb-2"
                  >
                    NOMBRE
                  </label>
                  <input
                    id="priamo-info-nombre"
                    type="text"
                    required
                    value={form.nombre}
                    onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                    className="w-full bg-transparent border-0 border-b border-slate-300 dark:border-white/25 focus:border-[#0B7E32] dark:focus:border-[#21E45B] focus:outline-none py-2.5 text-sm text-[#262D38] dark:text-white transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="priamo-info-empresa"
                    className="block text-[10px] font-medium uppercase tracking-[0.18em] text-[#262D38]/70 dark:text-slate-400 mb-2"
                  >
                    EMPRESA <span className="normal-case opacity-70">(opcional)</span>
                  </label>
                  <input
                    id="priamo-info-empresa"
                    type="text"
                    value={form.empresa}
                    onChange={(e) => setForm({ ...form, empresa: e.target.value })}
                    className="w-full bg-transparent border-0 border-b border-slate-300 dark:border-white/25 focus:border-[#0B7E32] dark:focus:border-[#21E45B] focus:outline-none py-2.5 text-sm text-[#262D38] dark:text-white transition-colors"
                  />
                </div>
              </div>

              {/* Row 2: Email & Teléfono (opcional) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10">
                <div>
                  <label
                    htmlFor="priamo-info-email"
                    className="block text-[10px] font-medium uppercase tracking-[0.18em] text-[#262D38]/70 dark:text-slate-400 mb-2"
                  >
                    EMAIL
                  </label>
                  <input
                    id="priamo-info-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-transparent border-0 border-b border-slate-300 dark:border-white/25 focus:border-[#0B7E32] dark:focus:border-[#21E45B] focus:outline-none py-2.5 text-sm text-[#262D38] dark:text-white transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="priamo-info-telefono"
                    className="block text-[10px] font-medium uppercase tracking-[0.18em] text-[#262D38]/70 dark:text-slate-400 mb-2"
                  >
                    TELÉFONO <span className="normal-case opacity-70">(opcional)</span>
                  </label>
                  <input
                    id="priamo-info-telefono"
                    type="tel"
                    value={form.telefono}
                    onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                    className="w-full bg-transparent border-0 border-b border-slate-300 dark:border-white/25 focus:border-[#0B7E32] dark:focus:border-[#21E45B] focus:outline-none py-2.5 text-sm text-[#262D38] dark:text-white transition-colors"
                  />
                </div>
              </div>

              {/* Row 3: Cuéntanos en qué te podemos ayudar */}
              <div>
                <label
                  htmlFor="priamo-info-mensaje"
                  className="block text-[10px] font-medium uppercase tracking-[0.18em] text-[#262D38]/70 dark:text-slate-400 mb-2"
                >
                  CUÉNTANOS EN QUÉ TE PODEMOS AYUDAR
                </label>
                <textarea
                  id="priamo-info-mensaje"
                  rows={3}
                  required
                  value={form.mensaje}
                  onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                  className="w-full bg-transparent border-0 border-b border-slate-300 dark:border-white/25 focus:border-[#0B7E32] dark:focus:border-[#21E45B] focus:outline-none py-2.5 text-sm text-[#262D38] dark:text-white resize-y transition-colors"
                />
              </div>

              {errorMsg && (
                <p
                  role="alert"
                  className="text-xs font-semibold text-red-600 dark:text-red-400"
                >
                  {errorMsg}
                </p>
              )}

              {/* Submit + Direct WhatsApp CTA */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  className="px-7 py-2.5 bg-[#0B7E32] hover:bg-[#096A2A] dark:bg-[#21E45B] dark:hover:bg-[#19CC4E] text-white dark:text-[#07182B] text-[11px] font-bold uppercase tracking-[0.18em] transition-colors cursor-pointer"
                >
                  ENVIAR
                </button>

                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="px-6 py-2.5 border border-[#0B7E32] dark:border-[#21E45B] text-[#0B7E32] dark:text-[#21E45B] hover:bg-[#0B7E32]/10 dark:hover:bg-[#21E45B]/10 text-[11px] font-bold uppercase tracking-[0.18em] transition-colors cursor-pointer"
                >
                  WHATSAPP DIRECTO
                </button>

                <span className="text-[11px] text-[#262D38]/60 dark:text-slate-400">
                  Prepara tu solicitud directa por correo o WhatsApp corporativo.
                </span>
              </div>

              {preparedBody && (
                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-[#0B7E32] dark:text-[#21E45B]">
                  <span>
                    Mensaje preparado para {COMPANY_INFO.email}. También puedes enviarlo por WhatsApp o copiarlo:
                  </span>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 underline underline-offset-4 font-semibold cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copiado' : 'Copiar texto'}
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Minimal Bottom Editorial Footer Row */}
          <footer className="mt-20 pt-8 border-t border-slate-200 dark:border-white/10 flex flex-col md:flex-row items-start md:items-end justify-between gap-8 text-xs">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="font-semibold text-[#0B7E32] dark:text-[#21E45B] hover:underline"
                >
                  {COMPANY_INFO.email}
                </a>
                <span className="font-medium text-[#262D38] dark:text-slate-200">
                  {COMPANY_INFO.whatsappDisplay}
                </span>
              </div>
              <p className="text-[#262D38]/65 dark:text-slate-400">
                {COMPANY_INFO.name} · RIF: {COMPANY_INFO.rif} · Venezuela
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-10 gap-y-1.5 text-[11px] uppercase tracking-[0.16em]">
              <div className="space-y-1.5">
                {INFO_VERTICAL_LIST.map((v) => (
                  <a
                    key={v.route}
                    href={v.route}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(v.route as InfoRoutePath);
                    }}
                    className="block font-medium text-[#0B7E32] dark:text-[#21E45B] hover:opacity-75 transition-opacity"
                  >
                    {v.navLabel}
                  </a>
                ))}
              </div>
              <div className="space-y-1.5">
                <a
                  href="/info"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/info');
                  }}
                  className="block text-[#262D38]/75 dark:text-slate-300 hover:text-[#262D38] dark:hover:text-white transition-colors"
                >
                  Portada /info
                </a>
                <a
                  href={COMPANY_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-[#262D38]/75 dark:text-slate-300 hover:text-[#262D38] dark:hover:text-white transition-colors"
                >
                  Instagram
                </a>
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/');
                  }}
                  className="block text-[#262D38]/75 dark:text-slate-300 hover:text-[#262D38] dark:hover:text-white transition-colors"
                >
                  Web Principal
                </a>
              </div>
            </div>
          </footer>
        </div>
      </section>
    </div>
  );
};
