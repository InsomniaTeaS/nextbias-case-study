const SUPPORTED_LOCALES = new Set(["en", "es"]);

export function normalizeLocale(locale) {
  return SUPPORTED_LOCALES.has(locale) ? locale : "en";
}

export function localizePath(pathname, locale) {
  const target = normalizeLocale(locale);
  const clean = `/${pathname}`.replace(/\/+/g, "/").replace(/^\/es(?=\/|$)/, "");

  if (target === "en") return clean || "/";
  return clean === "/" ? "/es/" : `/es${clean}`;
}

export function firstPartyAsset(pathname) {
  const filename = pathname.replace(/^.*?assets\//, "").replace(/^\/+/, "");
  return `/assets/${filename}`;
}

export function languageAlternates(pathname, origin = "https://nextbias.com") {
  const english = localizePath(pathname, "en");
  const spanish = localizePath(pathname, "es");

  return {
    en: new URL(english, origin).href,
    es: new URL(spanish, origin).href,
    "x-default": new URL(english, origin).href
  };
}
