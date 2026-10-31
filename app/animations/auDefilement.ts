export const auDefilement = <I, A>({ initial, animate }: { initial: I; animate: A }) => ({
  initial,
  whileInView: animate,
  inViewOptions: { once: true, amount: 0.3 },
});
