export type JourDuMois = { jour: number; mois: number };

export const SAISONS = [
  { cle: "basse", ouverture: "10:00", fermeture: "17:00" },
  { cle: "moyenne", ouverture: "09:30", fermeture: "18:30" },
  { cle: "haute", ouverture: "09:30", fermeture: "19:30" },
] as const;

// Dates incluses, reconduites chaque année.
export const FERMETURE_HIVERNALE: { debut: JourDuMois; fin: JourDuMois } = {
  debut: { jour: 5, mois: 1 },
  fin: { jour: 6, mois: 2 },
};

export const JOURS_FERIES_FERMES: JourDuMois[] = [
  { jour: 1, mois: 1 },
  { jour: 1, mois: 5 },
  { jour: 25, mois: 12 },
];

export const PLAN_PDF = "/plan-du-domaine-des-suricates.pdf";
