import { DEFAULT_LOCALE, LOCALES } from "../../constants";
import { LocaleType } from "../../types";

export function getLocaleSlug(slug: string) {
  const parts = slug.split("/");
  const language = parts.at(0) as LocaleType | undefined;

  if (language && LOCALES.includes(language)) {
    return [language, parts.slice(1).join("/")] as const;
  }

  return [DEFAULT_LOCALE, parts.join("/")] as const;
}

export function getSplitSlug(slug: string | undefined | null): Array<string> {
  if (!slug) {
    return [];
  }

  return slug === "home" ? [] : slug.split("/");
}

export default function getContentfulSlug(
  language: string,
  slugs: string[] | undefined
): string {
  const slug = !slugs ? "home" : (slugs.join("/") as string);

  if (language === DEFAULT_LOCALE) {
    return slug;
  } else {
    return `${language}/${slug}`;
  }
}
