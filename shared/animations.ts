export type AnimationVitrine = {
  slug: string;
  type: "FIXE" | "PONCTUELLE";
  heure: string | null;
  dateHeure: string | null;
  espece: string | null;
  image: string | null;
  titre: string;
  description: string;
  alt: string;
};
