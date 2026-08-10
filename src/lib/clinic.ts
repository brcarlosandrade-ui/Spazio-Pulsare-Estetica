export const clinic = {
  clinicName: "Seven Beauties",
  tagline: "Estética Integrativa",
  positioning: "Estética Avançada & Integrativa",
  positioningDescription:
    "Tratamentos faciais, corporais e terapias integrativas personalizados para você.",
  contact: {
    phone: "(41) 99610-6171",
    whatsapp: "5541996106171",
    whatsappMessage:
      "Olá! Gostaria de agendar uma avaliação na Seven Beauties Estética Integrativa.",
    address:
      "Rua Frederico Stadler Júnior, 456 - Capão da Imbuia, Curitiba - PR, 82210-230",
    hours: "Segunda a sexta, das 8h às 18h",
    mapsUrl: "https://maps.app.goo.gl/3mRjeqNLjDRRwJ3y7",
    email: undefined as string | undefined,
  },
  social: {
    instagram: undefined as string | undefined,
    facebook: undefined as string | undefined,
  },
};

export const whatsappUrl = `https://wa.me/${clinic.contact.whatsapp}?text=${encodeURIComponent(
  clinic.contact.whatsappMessage,
)}`;

export const responsibleTechnician = "Responsável técnica Crefito 8/75223-F";

export function getClinicOpenStatus(date: Date = new Date()): {
  open: boolean;
  label: string;
} {
  const day = date.getDay();
  const isWeekend = day === 0 || day === 6;
  return isWeekend
    ? { open: false, label: "Fechado, retorna segunda às 8h" }
    : { open: true, label: "Aberto" };
}

export type TreatmentGroup = {
  id: string;
  title: string;
  description: string;
  items: string[];
};

export const treatmentGroups: TreatmentGroup[] = [
  {
    id: "facial",
    title: "Estética Facial",
    description:
      "Protocolos de rejuvenescimento e harmonia da pele, com técnica e naturalidade.",
    items: [
      "Toxina Botulínica",
      "Fios de PDO",
      "Preenchedores Faciais",
      "Skinbooster",
      "Peeling Químico",
      "Dermaplaning",
      "Microagulhamento",
      "Rejuvenescimento Facial",
      "Limpeza de Pele",
      "Mesoterapia",
    ],
  },
  {
    id: "corporal",
    title: "Estética Corporal",
    description:
      "Contorno, drenagem e recuperação corporal com acompanhamento fisioterapêutico.",
    items: [
      "Criolipólise",
      "Drenagem Linfática",
      "Massagem Redutora",
      "Massagem Relaxante",
      "Massagem Terapêutica",
      "Massagem Miofascial",
      "Pós-Operatório",
    ],
  },
  {
    id: "procedimentos",
    title: "Procedimentos Estéticos",
    description:
      "Tecnologia e precisão clínica para resultados consistentes e seguros.",
    items: [
      "Eletroterapia na Estética",
      "PEIM – Microvasos",
      "Depilação a Laser",
      "Depilação com Cera",
    ],
  },
  {
    id: "integrativas",
    title: "Terapias Integrativas",
    description:
      "Abordagens que equilibram corpo e mente, potencializando cada tratamento.",
    items: ["Acupuntura", "Auriculoterapia", "Ventosaterapia", "Ozonioterapia"],
  },
];

export const differentials = [
  {
    title: "Avaliação individualizada",
    text: "Cada protocolo nasce de uma escuta atenta e de uma análise clínica completa.",
  },
  {
    title: "Visão integrativa",
    text: "Estética, fisioterapia e terapias complementares trabalhando em conjunto.",
  },
  {
    title: "Técnica e segurança",
    text: "Profissional habilitada, materiais certificados e protocolos atualizados.",
  },
  {
    title: "Resultados naturais",
    text: "Realçar a sua beleza — sem exageros, respeitando a sua identidade.",
  },
];

export const steps = [
  { n: "01", title: "Avaliação", text: "Conversamos sobre suas queixas, rotina e objetivos." },
  { n: "02", title: "Plano personalizado", text: "Montamos o protocolo ideal para o seu caso." },
  { n: "03", title: "Tratamento", text: "Sessões conduzidas com técnica, conforto e segurança." },
  { n: "04", title: "Acompanhamento", text: "Reavaliações e ajustes para manter os resultados." },
];

export const testimonials = [
  {
    name: "Ana Paula M.",
    text: "Me senti acolhida desde a primeira avaliação. O resultado ficou natural e exatamente como eu queria.",
  },
  {
    name: "Carla S.",
    text: "A abordagem integrativa fez diferença: além da estética, melhorei dores e qualidade de sono.",
  },
  {
    name: "Juliana R.",
    text: "Atendimento impecável e ambiente muito tranquilo. Recomendo de olhos fechados.",
  },
];

export const faqs = [
  {
    q: "Preciso de avaliação antes de iniciar um tratamento?",
    a: "Sim. Toda jornada começa com uma avaliação para entender seu histórico, objetivos e indicar o protocolo mais seguro e eficaz.",
  },
  {
    q: "O que é estética integrativa?",
    a: "É a união de procedimentos estéticos com terapias complementares — como acupuntura, auriculoterapia e ozonioterapia — cuidando da saúde como um todo, não apenas da aparência.",
  },
  {
    q: "Os procedimentos doem?",
    a: "A maioria é muito bem tolerada. Quando necessário, utilizamos anestésicos tópicos e técnicas de conforto para tornar a experiência tranquila.",
  },
  {
    q: "Em quanto tempo vejo resultados?",
    a: "Depende do protocolo. Alguns tratamentos apresentam efeito imediato; outros são progressivos e evoluem ao longo das sessões, com acompanhamento contínuo.",
  },
  {
    q: "Como faço para agendar?",
    a: "Pelo WhatsApp ou telefone (41) 99610-6171, de segunda a sexta, das 8h às 18h.",
  },
];
