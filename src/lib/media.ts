/** Caminhos em /public — encodeURI para acentos e caracteres especiais. */
const enc = (path: string) => encodeURI(path);

export const brand = {
  logo: "/brand/lan_logo.png",
} as const;

export const photos = {
  heroFrente: "/media/photos/lan_hero_frente.png",
  equipeCutout: "/media/photos/lan_funcionarios-removebg.png",
  posterDepoimento: "/media/photos/poster_depoimento.jpg",
  posterCriciuma: "/media/photos/poster_criciuma.jpg",
  posterHsj: "/media/photos/poster_hsj.jpg",
  torcida: enc("/media/photos/lan_comtorcida_noestadio.jpg"),
  aeroporto: "/media/photos/lan_aeroporto.jpg",
  hospitalUti: "/media/photos/lan_hospital_uti.jpg",
  frotaRua: "/media/photos/lan_frota_rua.jpg",
  hospitalSj: "/media/photos/lan_hospital_sj.jpg",
} as const;

export const videos = {
  depoimento: {
    src: enc("/media/videos/web_depoimento_cliente.mp4"),
    title: "Morgana Goulart Teixeira",
    role: "Responsável pela enfermaria",
    org: "SATC",
    poster: photos.posterDepoimento,
  },
  criciuma: {
    src: enc("/media/videos/web_depoimento_cliente_criciumaFC.mp4"),
    title: "Paulo César Bitencourt",
    role: "Superintendente",
    org: "Criciúma EC",
    poster: photos.posterCriciuma,
  },
  hsj: {
    src: enc("/media/videos/web_Depoimento_cliente_HSJ_2.mp4"),
    title: "Camila e Liliane",
    role: "Coordenadora do Pronto Atendimento, Enfermeira",
    org: "Hospital São José",
    poster: photos.posterHsj,
  },
} as const;
