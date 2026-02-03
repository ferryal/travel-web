import { Icon } from "@iconify/react";
import { useLocale, type Locale } from "@/i18n";
import { useIntl } from "react-intl";

const languages: { code: Locale; label: string; flag: string }[] = [
  { code: "id", label: "Indonesia", flag: "🇮🇩" },
  { code: "en", label: "English", flag: "🇬🇧" },
];

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();
  const intl = useIntl();

  return (
    <div className="relative group">
      <button
        className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100"
        aria-label={intl.formatMessage({ id: "common.language" })}
      >
        <span className="text-lg">
          {languages.find((l) => l.code === locale)?.flag}
        </span>
        <span className="hidden sm:inline">
          {languages.find((l) => l.code === locale)?.label}
        </span>
        <Icon icon="solar:alt-arrow-down-linear" width={14} />
      </button>
      <div className="absolute right-0 top-full z-50 mt-1 hidden min-w-[140px] rounded-xl border border-slate-100 bg-white p-1 shadow-lg group-hover:block">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLocale(lang.code)}
            className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
              locale === lang.code
                ? "bg-primary-50 font-semibold text-primary-600"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <span>{lang.flag}</span>
            <span>{lang.label}</span>
            {locale === lang.code && (
              <Icon
                icon="solar:check-circle-bold"
                width={16}
                className="ml-auto text-primary-600"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
