import { faqs, services, site } from "@/lib/site";

const orgId = `${site.url}/#organization`;
const websiteId = `${site.url}/#website`;
const webpageId = `${site.url}/#webpage`;
const faqId = `${site.url}/#faq`;

export function JsonLd() {
  const graph = [
    {
      "@type": ["MedicalBusiness", "EmergencyService", "LocalBusiness"],
      "@id": orgId,
      name: site.name,
      legalName: site.legalName,
      url: site.url,
      image: `${site.url}/media/photos/lan_firma.jpg`,
      logo: `${site.url}/brand/lan_logo.png`,
      description: site.description,
      telephone: site.phoneTel,
      email: site.email,
      priceRange: "$$",
      areaServed: {
        "@type": "AdministrativeArea",
        name: site.region,
        containedInPlace: {
          "@type": "Country",
          name: "Brasil",
        },
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address.street,
        addressLocality: site.address.city,
        addressRegion: site.address.regionCode,
        postalCode: site.address.postalCode,
        addressCountry: site.address.country,
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
        jobTitle: site.diretorTecnico.title,
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
        {
          "@type": "ContactPoint",
          telephone: site.phoneSecondaryTel,
          contactType: "customer service",
          availableLanguage: ["Portuguese"],
          areaServed: "BR-SC",
        },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Serviços LAN Ambulâncias",
        itemListElement: services.map((service, index) => ({
          "@type": "Offer",
          position: index + 1,
          itemOffered: {
            "@type": "Service",
            name: service.title,
            description: service.text,
            provider: { "@id": orgId },
            areaServed: site.region,
          },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: site.url,
      name: site.name,
      description: site.description,
      inLanguage: "pt-BR",
      publisher: { "@id": orgId },
    },
    {
      "@type": "WebPage",
      "@id": webpageId,
      url: site.url,
      name: site.seo.title,
      description: site.description,
      isPartOf: { "@id": websiteId },
      about: { "@id": orgId },
      inLanguage: "pt-BR",
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${site.url}/media/photos/lan_firma.jpg`,
      },
    },
    {
      "@type": "FAQPage",
      "@id": faqId,
      isPartOf: { "@id": webpageId },
      mainEntity: faqs.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    },
  ];

  const data = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
