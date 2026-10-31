const comportement = (): ScrollBehavior =>
  matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";

export function useDefilement() {
  function allerA(event: MouseEvent, href?: string) {
    const cible = href && document.getElementById(href.slice(1));
    if (!cible) return;
    event.preventDefault();
    cible.scrollIntoView({ behavior: comportement() });
    history.replaceState(history.state, "", href);
    if (!cible.hasAttribute("tabindex")) cible.setAttribute("tabindex", "-1");
    cible.focus({ preventScroll: true });
  }

  function remonter() {
    window.scrollTo({ top: 0, behavior: comportement() });
    if (location.hash) {
      history.replaceState(
        history.state,
        "",
        location.pathname + location.search,
      );
    }
  }

  return { allerA, remonter };
}
