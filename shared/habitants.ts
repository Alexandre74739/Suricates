export const CARTES_PAR_PAGE = 6;
export const ANIMAUX_PAR_PAGE = CARTES_PAR_PAGE + 1;
export const RECHERCHE_MAX = 40;

export type EspeceHabitant = {
  slug: string;
  nom: string;
  image: string | null;
  effectif: number;
};

export type PageHabitants = {
  especes: EspeceHabitant[];
  page: number;
  pages: number;
  total: number;
};

export const LANGUES = ["fr", "en"] as const;
export type Langue = (typeof LANGUES)[number];

export function lirePage(valeur: unknown): number {
  const page = Number(Array.isArray(valeur) ? valeur[0] : valeur);
  return Number.isInteger(page) && page >= 1 ? page : 1;
}

export function lireRecherche(valeur: unknown): string {
  const texte = Array.isArray(valeur) ? valeur[0] : valeur;
  return typeof texte === "string" ? texte.trim().slice(0, RECHERCHE_MAX) : "";
}

export function lireLangue(valeur: unknown): Langue {
  return LANGUES.includes(valeur as Langue) ? (valeur as Langue) : "fr";
}

export function normaliser(texte: string): string {
  return texte
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
}

export function bornesPage(page: number) {
  return { debut: (page - 1) * ANIMAUX_PAR_PAGE, taille: ANIMAUX_PAR_PAGE };
}

export function nombrePages(total: number): number {
  return Math.max(1, Math.ceil(total / ANIMAUX_PAR_PAGE));
}
