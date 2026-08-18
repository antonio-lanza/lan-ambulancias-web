import { faqs, site } from "@/lib/site";

export function JsonLd() {
  const organization = {
    "@context": "https://schema.org",
    "@type": ["MedicalBusiness", "EmergencyService", "LocalBusiness"],
    "@id": `${site.url}/#organization`,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    image: `${site.url}/media/photos/lan_firma.jpg`,
    logo: `${site.url}/brand/logo.png`,
    description: site.description,
    telephone: site.phoneTel,
    email: site.email,
    priceRange: "$$",
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Santa Catarina",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressRegion: site.regionCode,
      addressCountry: site.country,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    medicalSpecialty: "Emergency",
    identifier: site.crmEmpresa,
    sameAs: [site.social.instagram],
    employee: {
      "@type": "Physician",
      name: site.diretorTecnico.name,
      identifier: site.diretorTecnico.crm,
      jobTitle: "Diretor Técnico Médico",
      medicalSpecialty: "Emergency Medicine",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: site.phoneTel,
        contactType: "emergency",
        availableLanguage: ["Portuguese"],
        areaServed: "BR-SC",
      },
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    description: site.description,
    inLanguage: "pt-BR",
    publisher: { "@id": `${site.url}/#organization` },
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  const graphs = [organization, website, faq];

  return (
    <>
      {graphs.map((data, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
    </>
  );
}
