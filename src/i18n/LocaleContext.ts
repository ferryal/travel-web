import { createContext } from "react";

export type Locale = "id" | "en";

export interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

export const LocaleContext = createContext<LocaleContextType | undefined>(
  undefined,
);
