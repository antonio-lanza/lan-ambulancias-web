export const site = {
  name: "LAN Ambulâncias 24h",
  legalName: "LAN Ambulâncias",
  tagline: "Atendimento de emergência e remoção em todo o Estado de Santa Catarina",
  description:
    "LAN Ambulâncias 24h em Criciúma: remoção de pacientes, UTI móvel, transferência inter-hospitalar, cobertura de eventos e plano Área Protegida em todo o Estado de Santa Catarina.",
  url: "https://lanambulancias.com.br",
  locale: "pt_BR",
  seo: {
    title: "LAN Ambulâncias 24h | Ambulância, remoção e UTI móvel em Criciúma e SC",
    ogTitle: "LAN Ambulâncias 24h — Ambulância e UTI móvel em Criciúma e SC",
  },
  phoneDisplay: "(48) 9 9979-9668",
  phoneTel: "+5548999799668",
  phoneSecondaryDisplay: "(48) 3462-9255",
  phoneSecondaryTel: "+554834629255",
  whatsapp: "5548999799668",
  whatsappMessage: "Olá! Preciso de atendimento da LAN Ambulâncias.",
  email: "contato@lanambulancias.com.br",
  city: "Criciúma",
  region: "Santa Catarina",
  regionCode: "SC",
  country: "BR",
  crmEmpresa: "CRM/SC - PJ: 4944",
  diretorTecnico: {
    title: "Diretor Técnico Médico",
    name: "Dr. Douglas Gobbo Pierini",
    crm: "CRM/SC 24671",
  },
  hours: "24 horas, todos os dias",
  social: {
    instagram: "https://www.instagram.com/lanambulancias/",
    instagramHandle: "@lanambulancias",
  },
} as const;

export const nav = [
  { href: "#servicos", label: "Serviços" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#faq", label: "Dúvidas" },
  { href: "#contato", label: "Contato" },
] as const;

export const services = [
  {
    id: "remocoes",
    title: "Remoções",
    text: "Residência → hospital, alta hospitalar, consultas e/ou exames, mudança de domicílio, dentre outros.",
  },
  {
    id: "eventos",
    title: "Cobertura de eventos",
    text: "Pequeno, médio e grande porte — esportivos, corporativos, shows, festas, formaturas, casamentos e eventos privados.",
  },
  {
    id: "uti",
    title: "Transferência inter-hospitalar",
    text: "Em ambulância UTI móvel (adulto, pediátrica e neonatal) e ambulância de suporte básico, nos diversos níveis de complexidade.",
  },
  {
    id: "area-protegida",
    title: "Área Protegida",
    text: "Plano empresarial: colaboradores, clientes e visitantes protegidos 24h com atendimento de urgência e emergência.",
  },
  {
    id: "locacao",
    title: "Locação de ambulâncias",
    text: "Locação de veículo ambulância — diária, mensal ou anual. Consulte nossos planos.",
  },
] as const;

export const serviceProof = [
  "Atendimento em todo o Estado de Santa Catarina.",
  "UTI móvel e ambulância de suporte básico.",
  "Ágil, seguro e eficiente — 24 horas.",
] as const;

export const faqs = [
  {
    q: "A LAN Ambulâncias atende 24 horas?",
    a: "Sim. A LAN Ambulâncias 24h opera todos os dias, incluindo finais de semana e feriados, em Santa Catarina.",
  },
  {
    q: "Quais tipos de remoção a LAN realiza?",
    a: "A LAN realiza remoções e transferências inter-hospitalares com suporte básico e UTI móvel adulto, pediátrica e neonatal.",
  },
  {
    q: "Qual é o CRM da LAN Ambulâncias?",
    a: "CRM/SC - PJ: 4944. Diretor Técnico Médico: Dr. Douglas Gobbo Pierini, CRM/SC 24671.",
  },
  {
    q: "Como solicito uma ambulância agora?",
    a: "Ligue para (48) 9 9979-9668 ou fale pelo WhatsApp. A equipe orienta o atendimento imediatamente.",
  },
  {
    q: "A LAN atende fora de Criciúma?",
    a: "Sim. A base é em Criciúma, com atendimento em todo o Estado de Santa Catarina — remoções, UTI móvel e cobertura de eventos.",
  },
] as const;

export function whatsappUrl(message: string = site.whatsappMessage) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
