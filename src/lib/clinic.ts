export const clinic = {
  clinicName: "Spazio Pulsare",
  tagline: "Estética & Bem-Estar",
  positioning: "Cuidado que valoriza sua beleza natural",
  positioningDescription:
    "Tratamentos exclusivos e planejados para realçar sua beleza com naturalidade, confiança e bem-estar.",
  contact: {
    phone: "+55 41 9528-9824",
    whatsapp: "554195289824",
    whatsappMessage:
      "Olá! Gostaria de agendar uma avaliação na Spazio Pulsare.",
    address:
      "R. Prof. Nivaldo Braga, 1692 - Capão da Imbuia, Curitiba - PR, 82810-150",
    hours: "Atendimento sob agendamento",
    mapsUrl: "https://maps.app.goo.gl/r9ob79wt9gsAph6s8",
    email: undefined as string | undefined,
  },
  social: {
    instagram: "https://www.instagram.com/dra.jessicaosc/",
    facebook: undefined as string | undefined,
  },
};

export const whatsappUrl = `https://wa.me/${clinic.contact.whatsapp}?text=${encodeURIComponent(
  clinic.contact.whatsappMessage,
)}`;

// Domínio público do site, usado nas tags og:url/canonical e na imagem de
// prévia (og:image/twitter:image) compartilhada em WhatsApp, etc.
// Ao trocar para um domínio próprio, atualize só esta linha (ver README).
export const siteUrl = "https://spaziopulsare.com.br";

export const responsibleTechnician = "Dra. Jéssica Oliveira · CRBM 0625";

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
    id: "bem-estar",
    title: "Estética & Bem-Estar",
    description:
      "Cuidado pensado para valorizar sua beleza natural com conforto, técnica e atenção individualizada.",
    items: [
      "Estética facial",
      "Harmonização natural",
      "Cuidados personalizados",
      "Embelezamento consciente",
      "Bem-estar como prioridade",
    ],
  },
  {
    id: "lavieen",
    title: "Lavieen",
    description:
      "Rejuvenescimento facial com foco em luminosidade, textura e suavização de sinais da pele.",
    items: [
      "Rejuvenescimento Facial",
      "Clareamento de melasma e manchas de pele",
      "Redução de poros dilatados",
      "Melhora viço e textura da pele",
      "Ameniza linhas finas",
      "Efeito BB cream",
    ],
  },
  {
    id: "botox",
    title: "Botox",
    description:
      "Tratamento para suavizar linhas de expressão e manter uma aparência leve, natural e renovada.",
    items: ["Botox", "Linhas de expressão", "Naturalidade", "Resultado discreto"],
  },
  {
    id: "envelhecimento",
    title: "Controle do envelhecimento",
    description:
      "Protocolos pensados para prévenir sinais, melhorar a pele e preservar a sua identidade.",
    items: [
      "Prevenção do envelhecimento",
      "Tratamentos exclusivos",
      "Melhora da luminosidade",
      "Acompanhamento individualizado",
    ],
  },
];

export const differentials = [
  {
    title: "Estética & Bem-Estar",
    text: "Um cuidado que alia estética, conforto e bem-estar em cada etapa do tratamento.",
  },
  {
    title: "Cuidado que valoriza sua beleza natural",
    text: "A proposta é realçar o que você já tem de bonito, com naturalidade e elegância.",
  },
  {
    title: "Tratamentos exclusivos e planejados",
    text: "Cada protocolo é pensado a partir do seu caso, objetivo e rotina para oferecer melhores resultados.",
  },
  {
    title: "Controle do envelhecimento",
    text: "Estratégias para melhorar a qualidade da pele, suavizar sinais e manter um aspecto saudável e luminoso.",
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
    name: "Ana P.",
    text: "Senti que fui muito bem acolhida. O resultado ficou natural, elegante e exatamente no meu estilo.",
  },
  {
    name: "Carla S.",
    text: "O cuidado foi super personalizado. A pele ficou mais luminosa, saudável e muito mais bonita.",
  },
  {
    name: "Juliana R.",
    text: "Ambiente acolhedor, atendimento excelente e um resultado que realmente valoriza a minha beleza natural.",
  },
];

export const faqs = [
  {
    q: "Preciso de avaliação antes de iniciar um tratamento?",
    a: "Sim. A primeira consulta é essencial para entender seu objetivo, avaliar sua pele e indicar o protocolo mais adequado para você.",
  },
  {
    q: "O que é o Lavieen?",
    a: "É um protocolo de rejuvenescimento facial voltado para melhorar a luminosidade, textura, poros e linhas finas, com um efeito natural e sofisticado.",
  },
  {
    q: "O Botox é indicado para todo mundo?",
    a: "O Botox é indicado para quem deseja suavizar linhas de expressão com naturalidade, desde que seja feito por uma profissional qualificada e com planejamento adequado.",
  },
  {
    q: "Em quanto tempo vejo resultados?",
    a: "Depende do tratamento. Alguns protocolos trazem melhora rápida, enquanto outros evoluem ao longo das sessões com acompanhamento contínuo.",
  },
  {
    q: "Como faço para agendar?",
    a: "Você pode entrar em contato pelo WhatsApp ou pelo telefone +55 41 9528-9824 para agendar sua avaliação.",
  },
];
