export type CouleurZone = "terracotta" | "galerie" | "acacia" | "sauge" | "ocre";

export type EspeceZone = {
  slug: string;
  nom: string;
  image: string | null;
  effectif: number;
};

export type ZoneVitrine = {
  slug: string;
  nom: string;
  couleur: CouleurZone;
  especes: EspeceZone[];
};
