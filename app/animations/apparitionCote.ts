// Ouverture et fermeture d'un panneau latéral : fond assombri, panneau qui glisse, contenu en cascade.
// À appliquer sur un composant motion avec v-bind (ex. <motion.div v-bind="fondu">).

const sortieDouce = [0.22, 1, 0.36, 1] as const;

export const fondu = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export const glisserDepuisDroite = {
  initial: { x: "100%" },
  animate: { x: 0, transition: { duration: 0.5, ease: sortieDouce } },
  exit: { x: "100%", transition: { duration: 0.3, ease: "easeIn" } },
};

// Éléments qui arrivent un par un : `rang` décale chaque élément de 60 ms.
export const apparaitreEnCascade = (rang: number) => ({
  initial: { opacity: 0, x: 24 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: sortieDouce, delay: 0.1 + rang * 0.06 },
  },
});
