export type IconName =
  | "sparkles"
  | "waves"
  | "zap"
  | "leaf"
  | "heartpulse"
  | "shield"
  | "users"
  | "gem";

export interface Pillar {
  icon: IconName;
  title: string;
  text: string;
}

export interface ProcedureItem {
  name: string;
  description: string;
}

export interface ProcedureCategory {
  id: string;
  icon: IconName;
  title: string;
  items: ProcedureItem[];
}

export interface Differentiator {
  icon: IconName;
  title: string;
  text: string;
}

export interface Testimonial {
  name: string;
  avatarUrl: string;
  rating: number;
  text: string;
}

export interface SiteConfig {
  clinicName: string;
  tagline: string;
  positioning: string;
  positioningDescription: string;
  contact: {
    phone: string;
    whatsapp: string;
    email?: string;
    address: string;
    hours: string;
    mapsUrl: string;
  };
  social: {
    instagram?: string;
    facebook?: string;
  };
  nav: { label: string; href: string }[];
  sections: {
    pillarsTitle: string;
    proceduresEyebrow: string;
    proceduresTitle: string;
    differentiatorsEyebrow: string;
    differentiatorsTitle: string;
    leadershipEyebrow: string;
    leadershipTitle: string;
    testimonialsEyebrow: string;
    testimonialsTitle: string;
    locationEyebrow: string;
    locationTitle: string;
    footerEyebrow: string;
  };
  hero: {
    title: string;
    subtitle: string;
    ctaPrimaryLabel: string;
    ctaSecondaryLabel: string;
  };
  pillars: Pillar[];
  about: {
    eyebrow: string;
    title: string;
    paragraph: string;
    signatureName: string;
    signatureRole: string;
    imageUrl: string;
  };
  procedureCategories: ProcedureCategory[];
  differentiators: Differentiator[];
  leadership: {
    name: string;
    role: string;
    credential: string;
    imageUrl: string;
    text: string;
  };
  testimonials: Testimonial[];
  cta: {
    eyebrow: string;
    title: string;
    subtitle: string;
    buttonLabel: string;
  };
}

export const siteConfig: SiteConfig = {
  clinicName: "Seven Beauties",
  tagline: "Estética Integrativa",
  positioning: "Estética Avançada & Integrativa",
  positioningDescription:
    "Tratamentos faciais, corporais e terapias integrativas personalizados para você.",
  contact: {
    phone: "(41) 99610-6171",
    whatsapp: `https://wa.me/5541996106171?text=${encodeURIComponent(
      "Olá, vi o site e quero agendar uma avaliação"
    )}`,
    address:
      "Rua Frederico Stadler Júnior, 456 - Capão da Imbuia, Curitiba - PR, 82210-230",
    hours: "Segunda a sexta, das 8h às 18h",
    mapsUrl: "https://maps.app.goo.gl/3mRjeqNLjDRRwJ3y7",
  },
  social: {},
  nav: [
    { label: "Sobre", href: "#sobre" },
    { label: "Procedimentos", href: "#procedimentos" },
    { label: "Equipe", href: "#equipe" },
    { label: "Depoimentos", href: "#depoimentos" },
  ],
  sections: {
    pillarsTitle: "Um cuidado que olha para você por inteiro",
    proceduresEyebrow: "Tratamentos",
    proceduresTitle: "Procedimentos",
    differentiatorsEyebrow: "Por que escolher",
    differentiatorsTitle: "Uma clínica que cuida de você, não só da pele",
    leadershipEyebrow: "Quem cuida",
    leadershipTitle: "À frente da Seven Beauties",
    testimonialsEyebrow: "Depoimentos",
    testimonialsTitle: "O que dizem sobre nós",
    locationEyebrow: "Onde estamos",
    locationTitle: "Venha nos conhecer",
    footerEyebrow: "Contato",
  },
  hero: {
    title: "Estética, saúde e bem-estar em um só lugar.",
    subtitle:
      "Tratamentos faciais, corporais e terapias integrativas personalizados para você.",
    ctaPrimaryLabel: "Agendar Avaliação",
    ctaSecondaryLabel: "Conheça nossos tratamentos",
  },
  pillars: [
    {
      icon: "sparkles",
      title: "Estética",
      text: "Tratamentos faciais e corporais pensados para valorizar sua beleza.",
    },
    {
      icon: "leaf",
      title: "Terapias Integrativas",
      text: "Técnicas voltadas ao equilíbrio, cuidado e bem-estar.",
    },
    {
      icon: "heartpulse",
      title: "Saúde",
      text: "Fisioterapia, nutrição e fonoaudiologia integradas ao cuidado.",
    },
  ],
  about: {
    eyebrow: "A clínica",
    title: "Cuidado integrativo para corpo e pele",
    paragraph:
      "Na Seven Beauties, unimos estética e fisioterapia em um cuidado verdadeiramente integrativo. Sob a direção da Dra. Rosimeri Celestino Ribeiro, fisioterapeuta especializada em estética, a clínica reúne procedimentos faciais e corporais, terapias integrativas e acompanhamento em saúde e bem-estar em um só lugar — com técnica, escuta e resultados que respeitam o tempo de cada corpo.",
    signatureName: "Dra. Rosimeri Celestino Ribeiro",
    signatureRole: "Fisioterapeuta • Crefito 8/75223-F",
    imageUrl: "/images/modelo_doutora.png",
  },
  procedureCategories: [
    {
      id: "estetica-facial",
      icon: "sparkles",
      title: "Estética Facial",
      items: [
        { name: "Toxina Botulínica", description: "Aplicação indicada para suavização de linhas de expressão, conforme avaliação individual." },
        { name: "Fios de PDO", description: "Procedimento voltado à sustentação facial, indicado conforme avaliação." },
        { name: "Preenchedores Faciais", description: "Procedimento indicado para contorno e volume facial, conforme avaliação individual." },
        { name: "Skinbooster", description: "Procedimento voltado à hidratação profunda da pele." },
        { name: "Peeling Químico", description: "Procedimento indicado para renovação da textura da pele, conforme avaliação." },
        { name: "Dermaplaning", description: "Técnica de esfoliação suave da pele." },
        { name: "Microagulhamento", description: "Procedimento indicado para estímulo de colágeno, conforme avaliação profissional." },
        { name: "Rejuvenescimento Facial", description: "Protocolo voltado ao cuidado facial, conforme avaliação individual." },
        { name: "Limpeza de Pele", description: "Procedimento de higienização e cuidado profundo da pele." },
        { name: "Mesoterapia", description: "Técnica de aplicação de ativos voltada à hidratação da pele." },
      ],
    },
    {
      id: "estetica-corporal",
      icon: "waves",
      title: "Estética Corporal",
      items: [
        { name: "Criolipólise", description: "Procedimento não invasivo voltado ao tratamento de gordura localizada." },
        { name: "Drenagem Linfática", description: "Técnica manual voltada à redução de inchaço e melhora da circulação." },
        { name: "Massagem Redutora", description: "Técnica manual associada à modelagem corporal, conforme avaliação." },
        { name: "Massagem Relaxante", description: "Técnica voltada ao alívio da tensão e ao relaxamento." },
        { name: "Massagem Terapêutica", description: "Técnica direcionada ao cuidado de tensões e desconfortos específicos." },
        { name: "Massagem Miofascial", description: "Técnica manual voltada à liberação de tensões e melhora da mobilidade." },
        { name: "Pós-Operatório", description: "Acompanhamento fisioterapêutico especializado no período pós-cirúrgico." },
      ],
    },
    {
      id: "procedimentos-esteticos",
      icon: "zap",
      title: "Procedimentos Estéticos",
      items: [
        { name: "Eletroterapia na Estética", description: "Uso de correntes terapêuticas conforme indicação e avaliação profissional." },
        { name: "PEIM – Microvasos", description: "Procedimento indicado para tratamento de microvasos, conforme avaliação." },
        { name: "Depilação a Laser", description: "Técnica de depilação por tecnologia a laser." },
        { name: "Depilação com Cera", description: "Técnica tradicional de depilação com cera." },
      ],
    },
    {
      id: "terapias-integrativas",
      icon: "leaf",
      title: "Terapias Integrativas",
      items: [
        { name: "Acupuntura", description: "Terapia integrativa realizada conforme indicação e avaliação profissional." },
        { name: "Auriculoterapia", description: "Técnica de estímulo de pontos auriculares, conforme indicação profissional." },
        { name: "Ventosaterapia", description: "Técnica manual voltada ao alívio de tensões musculares." },
        { name: "Ozonioterapia", description: "Terapia integrativa realizada conforme indicação e avaliação profissional." },
      ],
    },
    {
      id: "saude-bem-estar",
      icon: "heartpulse",
      title: "Saúde e Bem-Estar",
      items: [
        { name: "Nutrição", description: "Acompanhamento nutricional conforme avaliação individual." },
        { name: "Fonoaudiologia", description: "Acompanhamento especializado em voz, fala e funções orofaciais." },
      ],
    },
  ],
  differentiators: [
    {
      icon: "users",
      title: "Equipe Multidisciplinar",
      text: "Profissionais de diferentes áreas trabalhando para oferecer um cuidado mais completo.",
    },
    {
      icon: "sparkles",
      title: "Abordagem Integrativa",
      text: "Estética, fisioterapia e terapias integrativas reunidas em uma abordagem personalizada.",
    },
    {
      icon: "shield",
      title: "Atendimento Profissional",
      text: "Cuidado conduzido por profissionais habilitados e especializados em suas áreas.",
    },
    {
      icon: "gem",
      title: "Plano Personalizado",
      text: "Cada pessoa possui necessidades diferentes. Por isso, o tratamento é pensado de acordo com seus objetivos.",
    },
  ],
  leadership: {
    name: "Dra. Rosimeri Celestino Ribeiro",
    role: "Fisioterapeuta",
    credential: "Crefito 8/75223-F",
    imageUrl: "/images/modelo_doutora.png",
    text: "Fisioterapeuta responsável pela condução clínica da Seven Beauties, unindo estética, terapias integrativas e cuidados de saúde em um único acompanhamento.",
  },
  testimonials: [
    {
      name: "Camila R.",
      avatarUrl:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
      rating: 5,
      text: "Um atendimento impecável, do acolhimento aos resultados. Me senti cuidada em cada etapa.",
    },
    {
      name: "Beatriz S.",
      avatarUrl:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=200&auto=format&fit=crop",
      rating: 5,
      text: "Resultado extremamente natural. A equipe entende exatamente o que equilíbrio significa.",
    },
    {
      name: "Fernanda A.",
      avatarUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
      rating: 5,
      text: "Ambiente sofisticado e uma equipe que realmente escuta o que você deseja.",
    },
    {
      name: "Juliana M.",
      avatarUrl:
        "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=200&auto=format&fit=crop",
      rating: 5,
      text: "Profissionais extremamente atenciosos. Expliquei minhas expectativas e o resultado superou.",
    },
    {
      name: "Renata P.",
      avatarUrl:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop",
      rating: 5,
      text: "Já procurei outras clínicas antes, mas nenhuma com esse nível de cuidado e discrição.",
    },
    {
      name: "Isabela T.",
      avatarUrl:
        "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=200&auto=format&fit=crop",
      rating: 5,
      text: "Cada detalhe do atendimento transmite confiança. Recomendo de olhos fechados.",
    },
  ],
  cta: {
    eyebrow: "Vamos começar",
    title: "Sua jornada de cuidado começa com uma conversa.",
    subtitle: "Agende uma avaliação personalizada com nossa equipe.",
    buttonLabel: "Agendar pelo WhatsApp",
  },
};
