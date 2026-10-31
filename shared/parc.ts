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

// Provisoire : les prix viendront de la table Tarif, modifiable par l'admin.
export const TARIFS_CENTIMES = { PLEIN: 2000, REDUIT: 1200 } as const;

export const PLAN_PDF = "/plan-du-domaine-des-suricates.pdf";
