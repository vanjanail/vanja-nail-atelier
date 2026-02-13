export async function onRequest(context: any) {
  const url = new URL(context.request.url);
  const path = url.pathname;

  // Env Var Toggle:
  // MAINTENANCE="1" => Wartung AN
  // sonst => Wartung AUS
  const MAINTENANCE = String(context.env?.MAINTENANCE || "") === "1";

  const allow = (p: string) => {
    // Wartungsseite selbst erlauben
    if (p === "/wartung" || p === "/wartung/") return true;

    // Astro Assets + Static Assets erlauben
    if (p.startsWith("/_astro/")) return true;
    if (p.startsWith("/images/")) return true;

    // Common files
    if (p.startsWith("/favicon")) return true;
    if (p === "/robots.txt") return true;
    if (p.startsWith("/sitemap")) return true;

    return false;
  };

  if (MAINTENANCE && !allow(path)) {
    // Rewrite auf /wartung (200, kein Redirect, keine Loops)
    url.pathname = "/wartung";
    return context.env.ASSETS.fetch(new Request(url.toString(), context.request));
  }

  return context.next();
}
