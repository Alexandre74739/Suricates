const sortieDouce = [0.22, 1, 0.36, 1] as const;

export const sortirDuTerrier = (rang: number) => ({
  initial: { y: "100%" },
  animate: { y: 0, transition: { duration: 0.8, ease: sortieDouce, delay: 0.15 + rang * 0.1 } },
});

export const monterEnCascade = (rang: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: sortieDouce, delay: 0.15 + rang * 0.1 },
  },
});
