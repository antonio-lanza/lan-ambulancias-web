# LAN Ambulâncias 24h

Site institucional da [LAN Ambulâncias](https://lanambulancias.com.br) — ambulância, remoção de pacientes, UTI móvel e cobertura de eventos em Criciúma e em todo o Estado de Santa Catarina.

## Stack

- [Next.js 16](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [GSAP](https://gsap.com/) e [Anime.js](https://animejs.com/) para animações

## Estrutura

```
src/
├── app/              # layout, metadata, SEO (sitemap, robots, manifest)
├── components/       # seções da landing page
│   └── motion/       # animações de entrada (Reveal)
└── lib/
    ├── site.ts       # dados da empresa, nav, serviços, FAQs
    └── media.ts      # caminhos de fotos e vídeos
public/
├── brand/            # logo
└── media/            # fotos e vídeos do site
```

## Desenvolvimento

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Scripts

| Comando        | Descrição              |
|----------------|------------------------|
| `npm run dev`  | Servidor de desenvolvimento |
| `npm run build`| Build de produção      |
| `npm run start`| Servidor de produção   |
| `npm run lint` | ESLint                 |

## Deploy

Compatível com [Vercel](https://vercel.com/) ou qualquer host que suporte Next.js.

Domínio canônico: `https://lanambulancias.com.br`

## SEO

- Metadados Open Graph e Twitter Card
- JSON-LD (`MedicalBusiness`, `WebSite`, `FAQPage`)
- `sitemap.xml`, `robots.txt` e `llms.txt`

## Licença

Projeto proprietário da LAN Ambulâncias. O código está disponível publicamente só para referência — ver `LICENSE`. Textos, fotos, vídeos e marca pertencem à LAN Ambulâncias.
