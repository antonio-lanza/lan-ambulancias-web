/** Caminhos em /public — encodeURI para acentos e caracteres especiais. */
const enc = (path: string) => encodeURI(path);

export const brand = {
  logo: "/brand/lan_logo.png",
} as const;

export const photos = {
  logo: brand.logo,
  hero: "/media/photos/lan_naserra.webp",
  naserra: "/media/photos/lan_naserra.webp",
  firma: "/media/photos/lan_firma.webp",
  frotaCutout: "/media/photos/lan_hero_ambulancia.png",
  utiCutout: "/media/photos/lan_defrente_semfundo.png",
  heroFrente: "/media/photos/lan_hero_frente.png",
  frotaAngulo: "/media/photos/lan_hero_ambulancia.png",
  funcionarios: enc("/media/photos/lan_funcionarios.jpg"),
  equipeCutout: "/media/photos/lan_funcionarios-removebg.png",
  posterDepoimento: "/media/photos/poster_depoimento.jpg",
  posterCriciuma: "/media/photos/poster_criciuma.jpg",
  posterHsj: "/media/photos/poster_hsj.jpg",
  posterComercial: "/media/photos/poster_comercial.jpg",
  porDoSol: enc("/media/photos/lan_pordosol.jpg"),
  estadioFrente: enc("/media/photos/lan_noestadio_defrente.jpg"),
  estadioAngulo: enc("/media/photos/lan_noestadio_emangulo.jpg"),
  estadioTraseira: enc("/media/photos/lan_noestadio_traseira.jpg"),
  torcida: enc("/media/photos/lan_comtorcida_noestadio.jpg"),
  balao: enc("/media/photos/lan_balao_inflavel.jpg"),
  balaoCutout: enc("/media/photos/lan_balaoinflavel_semfundo.png"),
  centro: enc("/media/photos/lan_centrodetreinamento.png"),
  fachada: "/media/photos/lan_fachada_semmato.jpg",
  hospitalUti: "/media/photos/lan_hospital_uti.jpg",
  aeroporto: "/media/photos/lan_aeroporto.jpg",
  galpao: "/media/photos/lan_galpao.jpg",
  frotaRua: "/media/photos/lan_frota_rua.jpg",
  hospitalSj: "/media/photos/lan_hospital_sj.jpg",
} as const;

export const videos = {
  comercial: {
    src: enc("/media/videos/web_comercial_lan.mp4"),
    title: "Comercial LAN",
    caption: "A marca na estrada",
    poster: photos.posterComercial,
  },
  saindo: {
    src: enc("/media/videos/lan_saindo_para_atendimento.mp4"),
    title: "Saída para atendimento",
    caption: "Operação real",
    poster: photos.hero,
  },
  uti: {
    src: enc("/media/videos/demonstração_viatura_uti.mp4"),
    title: "Viatura UTI",
    caption: "UTI móvel",
    poster: photos.porDoSol,
  },
  depoimento: {
    src: enc("/media/videos/web_depoimento_cliente.mp4"),
    title: "Morgana Goulart Teixeira",
    role: "Responsável pela enfermaria",
    org: "SATC",
    caption: "Responsável pela enfermaria · SATC",
    poster: photos.posterDepoimento,
  },
  criciuma: {
    src: enc("/media/videos/web_depoimento_cliente_criciumaFC.mp4"),
    title: "Paulo César Bitencourt",
    role: "Superintendente",
    org: "Criciúma EC",
    caption: "Superintendente · Criciúma EC",
    poster: photos.posterCriciuma,
  },
  hsj: {
    src: enc("/media/videos/web_Depoimento_cliente_HSJ_2.mp4"),
    title: "Camila e Liliane ",
    role: "Coordenadora do Pronto Atendimento, Enfermeira",
    org: "Hospital São José",
    caption: "Coordenadora do Pronto Atendimento, Enfermeira · HSJ",
    poster: photos.posterHsj,
  },
} as const;

/** Carrossel da operação — só fotos que não aparecem no Hero, Serviços ou Depoimentos. */
export const operation = [
  { src: photos.naserra, alt: "Ambulância LAN na serra", position: "center 42%" },
  { src: photos.porDoSol, alt: "UTI móvel LAN ao entardecer", position: "center 46%" },
  { src: photos.galpao, alt: "UTI LAN na base, ao pôr do sol", position: "center 48%", blurId: "op-galpao" as const },
  { src: photos.estadioFrente, alt: "Viatura LAN de frente no estádio", position: "center 55%" },
  { src: photos.funcionarios, alt: "Equipe LAN em cobertura de evento", position: "center 40%" },
  { src: photos.estadioAngulo, alt: "Ambulância LAN em ângulo no estádio", position: "center 48%" },
  { src: photos.firma, alt: "Frota LAN na base em Criciúma", position: "center 48%" },
  { src: photos.estadioTraseira, alt: "UTI LAN no gramado do estádio", position: "center 52%", blurId: "op-traseira" as const },
] as const;
