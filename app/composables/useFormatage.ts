import type { JourDuMois } from "#shared/parc";

export function useFormatage() {
  const { locale, localeProperties } = useI18n();
  const langue = computed(
    () => localeProperties.value.language ?? locale.value,
  );

  const formatPrix = (centimes: number) =>
    new Intl.NumberFormat(langue.value, {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: centimes % 100 ? 2 : 0,
    }).format(centimes / 100);

  // "09:30" → « 9 h 30 » en français, « 9:30 am » en anglais.
  const formatHeure = (heure: string) => {
    const [h = 0, m = 0] = heure.split(":").map(Number);
    if (locale.value === "fr")
      return m ? `${h} h ${String(m).padStart(2, "0")}` : `${h} h`;
    return new Intl.DateTimeFormat(langue.value, {
      hour: "numeric",
      minute: m ? "2-digit" : undefined,
      hour12: true,
      timeZone: "UTC",
    }).format(Date.UTC(2000, 0, 1, h, m));
  };

  const formatJour = ({ jour, mois }: JourDuMois) => {
    const texte = new Intl.DateTimeFormat(langue.value, {
      day: "numeric",
      month: "long",
      timeZone: "UTC",
    }).format(Date.UTC(2000, mois - 1, jour));
    return locale.value === "fr" && jour === 1
      ? texte.replace(/^1/, "1er")
      : texte;
  };

  return { formatPrix, formatHeure, formatJour };
}
