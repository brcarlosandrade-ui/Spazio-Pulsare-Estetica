export interface Procedure {
  id: string;
  icon: "droplet" | "wand" | "leaf" | "syringe" | "sun" | "heart";
  name: string;
  description: string;
  ctaLabel: string;
}

export interface Differentiator {
  icon: "sparkles" | "shield" | "users" | "gem";
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
  contact: {
    phone: string;
    whatsapp: string;
    email: string;
    address: string;
  };
  social: {
    instagram: string;
    facebook: string;
  };
  nav: { label: string; href: string }[];
  sections: {
    proceduresEyebrow: string;
    proceduresTitle: string;
    differentiatorsEyebrow: string;
    differentiatorsTitle: string;
    testimonialsEyebrow: string;
    testimonialsTitle: string;
  };
  hero: {
    title: string;
    subtitle: string;
    ctaPrimaryLabel: string;
    ctaSecondaryLabel: string;
  };
  about: {
    eyebrow: string;
    title: string;
    paragraph: string;
    signatureName: string;
    signatureRole: string;
    imageUrl: string;
  };
  procedures: Procedure[];
  differentiators: Differentiator[];
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
  tagline: "Elegância, tecnologia e cuidado em cada detalhe.",
  contact: {
    phone: "+55 41 9505-1256",
    whatsapp: `https://wa.me/554195051256?text=${encodeURIComponent(
      "Olá, vi o site e quero agendar uma avaliação"
    )}`,
    email: "contato@aurelleclinica.com.br",
    address: "Av. Cândido de Abreu, 817 - Centro Cívico, Curitiba - PR, 80530-908",
  },
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
  },
  nav: [
    { label: "Sobre", href: "#sobre" },
    { label: "Procedimentos", href: "#procedimentos" },
    { label: "Depoimentos", href: "#depoimentos" },
  ],
  sections: {
    proceduresEyebrow: "Tratamentos",
    proceduresTitle: "Procedimentos",
    differentiatorsEyebrow: "Por que escolher",
    differentiatorsTitle: "Uma clínica que cuida de você, não só da pele",
    testimonialsEyebrow: "Depoimentos",
    testimonialsTitle: "O que dizem sobre nós",
  },
  hero: {
    title: "Realce sua beleza com tecnologia e cuidado.",
    subtitle:
      "Tratamentos personalizados para revelar a melhor versão de você.",
    ctaPrimaryLabel: "Agendar Avaliação",
    ctaSecondaryLabel: "Conheça nossos tratamentos",
  },
  about: {
    eyebrow: "A clínica",
    title: "Cuidado que respeita sua individualidade",
    paragraph:
      "Unimos tecnologia de ponta a um olhar humano e personalizado. Cada tratamento é pensado para valorizar suas características naturais, com segurança, ética e resultados que respeitam o tempo de cada pele.",
    signatureName: "Dra. Marina Costa",
    signatureRole: "Especialista em Harmonização Facial",
    imageUrl:
      "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=1200&auto=format&fit=crop",
  },
  procedures: [
    {
      id: "skinbooster",
      icon: "droplet",
      name: "Skinbooster",
      description: "Hidratação profunda para uma pele com viço natural.",
      ctaLabel: "Saiba mais",
    },
    {
      id: "harmonizacao",
      icon: "wand",
      name: "Harmonização Facial",
      description: "Equilíbrio e simetria que valorizam sua beleza única.",
      ctaLabel: "Saiba mais",
    },
    {
      id: "peeling",
      icon: "leaf",
      name: "Peeling de Diamante",
      description: "Renovação celular suave para uma textura uniforme.",
      ctaLabel: "Saiba mais",
    },
    {
      id: "toxina",
      icon: "syringe",
      name: "Toxina Botulínica",
      description: "Suavização de linhas de expressão com naturalidade.",
      ctaLabel: "Saiba mais",
    },
    {
      id: "bioestimulador",
      icon: "sun",
      name: "Bioestimulador de Colágeno",
      description: "Firmeza e elasticidade que resistem ao tempo.",
      ctaLabel: "Saiba mais",
    },
    {
      id: "limpeza",
      icon: "heart",
      name: "Limpeza de Pele Premium",
      description: "Ritual de cuidado profundo para uma pele saudável.",
      ctaLabel: "Saiba mais",
    },
  ],
  differentiators: [
    {
      icon: "sparkles",
      title: "Tecnologia de Ponta",
      text: "Equipamentos de última geração para resultados precisos e seguros.",
    },
    {
      icon: "shield",
      title: "Segurança Clínica",
      text: "Protocolos rigorosos e profissionais altamente qualificados.",
    },
    {
      icon: "users",
      title: "Atendimento Personalizado",
      text: "Cada plano de tratamento é único, feito sob medida para você.",
    },
    {
      icon: "gem",
      title: "Experiência Exclusiva",
      text: "Ambiente pensado para o seu conforto e bem-estar em cada visita.",
    },
  ],
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
    title: "Sua melhor versão começa com uma conversa.",
    subtitle: "Agende uma avaliação personalizada com nossa equipe.",
    buttonLabel: "Agendar Avaliação",
  },
};
