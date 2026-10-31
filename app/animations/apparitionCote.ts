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

export const arriverDeCote = (cote: "gauche" | "droite") => ({
  initial: { opacity: 0, x: cote === "gauche" ? -48 : 48 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.8, ease: sortieDouce } },
});

export const apparaitreEnCascade = (rang: number) => ({
  initial: { opacity: 0, x: 24 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: sortieDouce, delay: 0.1 + rang * 0.06 },
  },
});
