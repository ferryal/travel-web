import { useContext } from "react";
import { LocaleContext, type LocaleContextType } from "./LocaleContext";

export function useLocale(): LocaleContextType {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within an AppIntlProvider");
  }
  return context;
}
