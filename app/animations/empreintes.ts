const PAS = 0.35;
const VIE = 1.8;
const PAUSE = 1;

export const empreinteCachee = { opacity: 0, scale: 0.6 };

export const poserEmpreinte = (rang: number, total: number) => ({
  opacity: [0, 1, 1, 0],
  scale: [0.6, 1, 1, 1],
  transition: {
    duration: VIE,
    times: [0, 0.15, 0.6, 1],
    ease: "easeOut",
    delay: rang * PAS,
    repeat: Infinity,
    repeatDelay: total * PAS + PAUSE - VIE,
  },
});
