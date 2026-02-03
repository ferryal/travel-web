import { useState, useCallback, type ReactNode } from "react";
import { IntlProvider } from "react-intl";
import { LocaleContext, type Locale } from "./LocaleContext";

import enMessages from "./messages/en.json";
import idMessages from "./messages/id.json";

const messages: Record<Locale, Record<string, string>> = {
  en: enMessages,
  id: idMessages,
};

interface AppIntlProviderProps {
  children: ReactNode;
}

export function AppIntlProvider({ children }: AppIntlProviderProps) {
  // Default to Indonesian as per requirement
  const [locale, setLocaleState] = useState<Locale>(() => {
    const saved = localStorage.getItem("locale");
    return saved === "en" || saved === "id" ? saved : "id";
  });

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("locale", newLocale);
  }, []);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <IntlProvider
        messages={messages[locale]}
        locale={locale}
        defaultLocale="id"
      >
        {children}
      </IntlProvider>
    </LocaleContext.Provider>
  );
}
