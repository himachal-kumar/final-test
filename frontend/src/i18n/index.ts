export const locales = ['en', 'es', 'fr'] as const;
export const defaultLocale = 'en' as const;

export type Locale = (typeof locales)[number];

export function getTranslations(locale: Locale, namespace: string) {
  return import(`./locales/${locale}.json`).then((module) => {
    return module.default[namespace];
  });
}