import React, { useState, useEffect } from 'react';
import { COMPANY_INFO, SERVICES } from '../../data/companyData';
import { Mail, Instagram, Globe, Phone, Send, CheckCircle2, Copy, MessageSquare, AlertCircle, Sparkles } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface QuoteContactFormProps {
  initialService?: string;
  initialProject?: string;
}

export const QuoteContactForm: React.FC<QuoteContactFormProps> = ({
  initialService,
  initialProject,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    service: initialService || SERVICES[0].title,
    description: initialProject ? `Deseo cotizar una solución similar al proyecto: ${initialProject}` : '',
    dimensions: '',
    location: '',
    deadline: '',
    hasFiles: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedBrief, setSubmittedBrief] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, service: initialService }));
    }
  }, [initialService]);

  useEffect(() => {
    if (initialProject) {
      setFormData((prev) => ({
        ...prev,
        description: `Deseo cotizar una solución similar al proyecto: ${initialProject}`,
      }));
    }
  }, [initialProject]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Por favor ingresa tu nombre y apellido.';
    if (!formData.email.trim() || !formData.email.includes('@')) {
      newErrors.email = 'Por favor ingresa un correo electrónico válido.';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Por favor ingresa un número de teléfono de contacto.';
    if (!formData.description.trim()) {
      newErrors.description = 'Por favor describe brevemente tu requerimiento publicitario.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateBriefText = () => {
    return `SOLICITUD DE COTIZACIÓN - PRIAMO PUBLICIDAD 2026
--------------------------------------------------
Cliente: ${formData.fullName}
Empresa / Marca: ${formData.company || 'No especificada'}
Correo: ${formData.email}
Teléfono: ${formData.phone}
Línea de Servicio: ${formData.service}
Ubicación del Proyecto: ${formData.location || 'Por definir'}
Fecha Requerida: ${formData.deadline || 'Flexible'}
Medidas y Cantidad: ${formData.dimensions || 'A evaluar con asesor'}
Detalle del Proyecto:
${formData.description}
--------------------------------------------------
* Los archivos adjuntos o artes finales se enviarán en seguimiento.`;
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const brief = generateBriefText();
    setSubmittedBrief(brief);

    const subject = encodeURIComponent(`Cotización: ${formData.service} - ${formData.company || formData.fullName}`);
    const body = encodeURIComponent(brief);
    
    // Open mail client with prefilled formal data
    window.location.href = `mailto:${COMPANY_INFO.email}?subject=${subject}&body=${body}`;
  };

  const handleSendWhatsApp = () => {
    if (!validate()) return;
    const brief = generateBriefText();
    const encoded = encodeURIComponent(brief);
    // WhatsApp direct API (using company configuration)
    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encoded}`, '_blank');
  };

  const handleCopyClipboard = () => {
    const brief = submittedBrief || generateBriefText();
    navigator.clipboard.writeText(brief).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  return (
    <section id="contacto" className="py-24 sm:py-32 lg:pt-32 lg:pb-0 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#07090D] border-t border-neutral-200 dark:border-white/10 relative transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <ScrollReveal variant="clip" delay={0}>
            <div>
              <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#0B7E32] dark:text-[#21E45B] uppercase mb-2">
                <span>SOLICITUD DE COTIZACIÓN & CONTACTO</span>
                <span>·</span>
                <span>ATENCIÓN DIRECTA</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#0F172A] dark:text-white uppercase leading-none">
                HABLEMOS DE TU <br />
                <span className="text-[#0B7E32] dark:text-[#21E45B] neon-text-glow">PRÓXIMO PROYECTO</span>
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal variant="up" delay={110}>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-md">
              De la idea a la realidad. Hagamos que tu marca destaque con acabados profesionales, asesoría técnica y precisión Roland.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start lg:items-stretch">
          {/* Left Column: Form */}
          <ScrollReveal variant="scale" delay={80} className="lg:col-span-7 lg:pb-32">
            <div className="bg-[#F8FAFC] dark:bg-[#0D1522] border border-neutral-200 dark:border-white/10 rounded-2xl p-6 sm:p-10 shadow-lg dark:shadow-2xl">
            <form onSubmit={handleSendEmail} className="flex flex-col gap-5">
              {/* Row 1: Name and Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Nombre y Apellido *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Ej. Carlos Mendoza"
                    className={`w-full px-4 py-3 rounded-lg bg-white dark:bg-[#07090D] border text-sm text-[#0F172A] dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-[#0B7E32] dark:focus:border-[#21E45B] transition-colors ${
                      errors.fullName ? 'border-red-500' : 'border-neutral-300 dark:border-white/10'
                    }`}
                  />
                  {errors.fullName && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Empresa o Marca
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Ej. Thundernet C.A."
                    className="w-full px-4 py-3 rounded-lg bg-white dark:bg-[#07090D] border border-neutral-300 dark:border-white/10 text-sm text-[#0F172A] dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-[#0B7E32] dark:focus:border-[#21E45B] transition-colors"
                  />
                </div>
              </div>

              {/* Row 2: Email and Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ejemplo@empresa.com"
                    className={`w-full px-4 py-3 rounded-lg bg-white dark:bg-[#07090D] border text-sm text-[#0F172A] dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-[#0B7E32] dark:focus:border-[#21E45B] transition-colors ${
                      errors.email ? 'border-red-500' : 'border-neutral-300 dark:border-white/10'
                    }`}
                  />
                  {errors.email && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Teléfono / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+58 412 1234567"
                    className={`w-full px-4 py-3 rounded-lg bg-white dark:bg-[#07090D] border text-sm text-[#0F172A] dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-[#0B7E32] dark:focus:border-[#21E45B] transition-colors ${
                      errors.phone ? 'border-red-500' : 'border-neutral-300 dark:border-white/10'
                    }`}
                  />
                  {errors.phone && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* Row 3: Service Selector */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Línea de Servicio de Interés
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white dark:bg-[#07090D] border border-neutral-300 dark:border-white/10 text-sm text-[#0F172A] dark:text-white focus:outline-none focus:border-[#0B7E32] dark:focus:border-[#21E45B] transition-colors cursor-pointer"
                >
                  {SERVICES.map((srv) => (
                    <option key={srv.id} value={srv.title} className="bg-white dark:bg-[#07090D] text-[#0F172A] dark:text-white">
                      {srv.index}. {srv.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Row 4: Dimensions & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Medidas y Cantidad (aprox)
                  </label>
                  <input
                    type="text"
                    value={formData.dimensions}
                    onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                    placeholder="Ej. 6 x 3 metros, 2 unidades"
                    className="w-full px-4 py-3 rounded-lg bg-white dark:bg-[#07090D] border border-neutral-300 dark:border-white/10 text-sm text-[#0F172A] dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-[#0B7E32] dark:focus:border-[#21E45B] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Ubicación / Ciudad
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Ej. Caracas, Las Mercedes"
                    className="w-full px-4 py-3 rounded-lg bg-white dark:bg-[#07090D] border border-neutral-300 dark:border-white/10 text-sm text-[#0F172A] dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-[#0B7E32] dark:focus:border-[#21E45B] transition-colors"
                  />
                </div>
              </div>

              {/* Row 5: Deadline & Attachments Note */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Fecha Requerida de Entrega
                  </label>
                  <input
                    type="text"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    placeholder="Ej. 15 de Diciembre 2026"
                    className="w-full px-4 py-3 rounded-lg bg-white dark:bg-[#07090D] border border-neutral-300 dark:border-white/10 text-sm text-[#0F172A] dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-[#0B7E32] dark:focus:border-[#21E45B] transition-colors"
                  />
                </div>

                <div className="flex flex-col justify-end">
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-xs text-neutral-600 dark:text-neutral-300">
                    <AlertCircle className="w-4 h-4 text-[#0B7E32] dark:text-[#21E45B] shrink-0" />
                    <span>Archivos pesados / artes se adjuntan en el correo de respuesta.</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Descripción del Proyecto *
                </label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detalles sobre superficie, tipo de acabado deseado, si requiere instalación en sitio, o si ya cuentas con arte final..."
                  className={`w-full px-4 py-3 rounded-lg bg-white dark:bg-[#07090D] border text-sm text-[#0F172A] dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-[#0B7E32] dark:focus:border-[#21E45B] transition-colors ${
                    errors.description ? 'border-red-500' : 'border-neutral-300 dark:border-white/10'
                  }`}
                />
                {errors.description && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.description}</p>}
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  className="w-full sm:flex-1 py-3.5 px-6 rounded-lg bg-[#21E45B] text-[#07090D] font-black uppercase tracking-wider text-sm hover:bg-[#1ED153] dark:hover:bg-[#2bf56b] shadow-[0_4px_16px_rgba(33,228,91,0.3)] dark:shadow-[0_0_20px_rgba(33,228,91,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar por Correo Formal</span>
                </button>

                <button
                  type="button"
                  onClick={handleSendWhatsApp}
                  className="w-full sm:w-auto py-3.5 px-5 rounded-lg bg-[#0F172A] hover:bg-[#1E293B] dark:bg-[#102744] dark:hover:bg-[#183963] text-white font-bold text-xs uppercase tracking-wider border border-neutral-800 dark:border-white/10 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-[#21E45B]" />
                  <span>Vía WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyClipboard}
                  title="Copiar resumen del requerimiento"
                  className="w-full sm:w-auto p-3.5 rounded-lg bg-white dark:bg-white/5 hover:bg-neutral-100 dark:hover:bg-white/10 text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-white/10 transition-colors flex items-center justify-center cursor-pointer"
                >
                  {copied ? <CheckCircle2 className="w-4 h-4 text-[#0B7E32] dark:text-[#21E45B]" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {copied && (
                <p className="text-xs text-[#0B7E32] dark:text-[#21E45B] text-center font-mono">
                  ✓ Resumen técnico copiado al portapapeles con éxito.
                </p>
              )}
            </form>
            </div>
          </ScrollReveal>

          {/* Right Column: Corporate Info & Channels */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6 lg:gap-0">
            {/* Corporate Sheet */}
            <ScrollReveal variant="scale" delay={160}>
              <div className="p-8 rounded-2xl bg-[#F8FAFC] dark:bg-[#0D1522] border border-neutral-200 dark:border-white/10 relative overflow-hidden shadow-sm dark:shadow-none">
              <span className="text-xs font-mono text-[#0B7E32] dark:text-[#21E45B] uppercase tracking-wider block mb-2">
                DATOS CORPORATIVOS
              </span>
              <h3 className="text-2xl font-black text-[#0F172A] dark:text-white uppercase tracking-tight mb-4">
                {COMPANY_INFO.name}
              </h3>

              <div className="flex flex-col gap-4 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-neutral-500 w-16">RIF:</span>
                  <span className="font-mono text-[#0F172A] dark:text-white font-bold">{COMPANY_INFO.rif}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-neutral-500 w-16">WHATSAPP:</span>
                  <a
                    href={COMPANY_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0E8A38] dark:text-[#25D366] hover:underline font-mono font-bold"
                  >
                    {COMPANY_INFO.whatsappDisplay}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-neutral-500 w-16">EMAIL:</span>
                  <a href={`mailto:${COMPANY_INFO.email}`} className="text-[#0B7E32] dark:text-[#21E45B] hover:underline font-mono">
                    {COMPANY_INFO.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-neutral-500 w-16">INSTAGRAM:</span>
                  <a
                    href={COMPANY_INFO.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0F172A] dark:text-white hover:text-[#0B7E32] dark:hover:text-[#21E45B] transition-colors font-mono"
                  >
                    {COMPANY_INFO.instagram}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-neutral-500 w-16">WEB:</span>
                  <span className="font-mono text-neutral-700 dark:text-neutral-300">{COMPANY_INFO.website}</span>
                </div>
              </div>
            </div>
            </ScrollReveal>

            {/* Priamo Rollup Banner centered in vertical space between Datos Corporativos and Footer */}
            <ScrollReveal
              variant="scale"
              delay={230}
              className="lg:flex-1 flex items-center justify-center pt-2 pb-2 lg:py-0"
            >
              <img
                src="/assets/aistudio/Rollup_Priamo_5363491f.png"
                alt="Pendón Roll-Up Priamo Publicidad"
                className="h-[320px] sm:h-[365px] lg:h-[410px] w-auto max-w-full object-contain mx-auto block select-none"
                draggable={false}
              />
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};
