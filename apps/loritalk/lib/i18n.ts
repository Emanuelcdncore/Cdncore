import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "@/locales/en.json";
import ptPT from "@/locales/pt-PT.json";
import ptBR from "@/locales/pt-BR.json";
import esES from "@/locales/es-ES.json";
import esMX from "@/locales/es-MX.json";
import esAR from "@/locales/es-AR.json";
import esCO from "@/locales/es-CO.json";
import esCL from "@/locales/es-CL.json";
import esPE from "@/locales/es-PE.json";
import esVE from "@/locales/es-VE.json";
import esEC from "@/locales/es-EC.json";
import esGT from "@/locales/es-GT.json";
import esCU from "@/locales/es-CU.json";
import esBO from "@/locales/es-BO.json";
import esDO from "@/locales/es-DO.json";
import esHN from "@/locales/es-HN.json";
import esPY from "@/locales/es-PY.json";
import esSV from "@/locales/es-SV.json";
import esNI from "@/locales/es-NI.json";
import esCR from "@/locales/es-CR.json";
import esPR from "@/locales/es-PR.json";
import esPA from "@/locales/es-PA.json";
import esUY from "@/locales/es-UY.json";
import esGQ from "@/locales/es-GQ.json";
import fr from "@/locales/fr.json";
import de from "@/locales/de.json";
import it from "@/locales/it.json";
import nl from "@/locales/nl.json";
import pl from "@/locales/pl.json";
import sv from "@/locales/sv.json";
import da from "@/locales/da.json";
import fi from "@/locales/fi.json";
import el from "@/locales/el.json";
import cs from "@/locales/cs.json";
import sk from "@/locales/sk.json";
import sl from "@/locales/sl.json";
import hr from "@/locales/hr.json";
import bg from "@/locales/bg.json";
import ro from "@/locales/ro.json";
import hu from "@/locales/hu.json";
import et from "@/locales/et.json";
import lv from "@/locales/lv.json";
import lt from "@/locales/lt.json";
import mt from "@/locales/mt.json";
import ga from "@/locales/ga.json";
import ru from "@/locales/ru.json";
import nb from "@/locales/nb.json";
import is from "@/locales/is.json";
import uk from "@/locales/uk.json";
import sr from "@/locales/sr.json";
import bs from "@/locales/bs.json";
import sq from "@/locales/sq.json";
import mk from "@/locales/mk.json";
import be from "@/locales/be.json";

const resources = {
  en: { translation: en },
  "pt-PT": { translation: ptPT },
  "pt-BR": { translation: ptBR },
  "es-ES": { translation: esES },
  "es-MX": { translation: esMX },
  "es-AR": { translation: esAR },
  "es-CO": { translation: esCO },
  "es-CL": { translation: esCL },
  "es-PE": { translation: esPE },
  "es-VE": { translation: esVE },
  "es-EC": { translation: esEC },
  "es-GT": { translation: esGT },
  "es-CU": { translation: esCU },
  "es-BO": { translation: esBO },
  "es-DO": { translation: esDO },
  "es-HN": { translation: esHN },
  "es-PY": { translation: esPY },
  "es-SV": { translation: esSV },
  "es-NI": { translation: esNI },
  "es-CR": { translation: esCR },
  "es-PR": { translation: esPR },
  "es-PA": { translation: esPA },
  "es-UY": { translation: esUY },
  "es-GQ": { translation: esGQ },
  fr: { translation: fr },
  de: { translation: de },
  it: { translation: it },
  nl: { translation: nl },
  pl: { translation: pl },
  sv: { translation: sv },
  da: { translation: da },
  fi: { translation: fi },
  el: { translation: el },
  cs: { translation: cs },
  sk: { translation: sk },
  sl: { translation: sl },
  hr: { translation: hr },
  bg: { translation: bg },
  ro: { translation: ro },
  hu: { translation: hu },
  et: { translation: et },
  lv: { translation: lv },
  lt: { translation: lt },
  mt: { translation: mt },
  ga: { translation: ga },
  ru: { translation: ru },
  nb: { translation: nb },
  is: { translation: is },
  uk: { translation: uk },
  sr: { translation: sr },
  bs: { translation: bs },
  sq: { translation: sq },
  mk: { translation: mk },
  be: { translation: be },
};

const supportedLngs = [
  "en",
  "pt-PT",
  "pt-BR",
  "es-ES",
  "es-MX",
  "es-AR",
  "es-CO",
  "es-CL",
  "es-PE",
  "es-VE",
  "es-EC",
  "es-GT",
  "es-CU",
  "es-BO",
  "es-DO",
  "es-HN",
  "es-PY",
  "es-SV",
  "es-NI",
  "es-CR",
  "es-PR",
  "es-PA",
  "es-UY",
  "es-GQ",
  "fr",
  "de",
  "it",
  "nl",
  "pl",
  "sv",
  "da",
  "fi",
  "el",
  "cs",
  "sk",
  "sl",
  "hr",
  "bg",
  "ro",
  "hu",
  "et",
  "lv",
  "lt",
  "mt",
  "ga",
  "ru",
  "nb",
  "is",
  "uk",
  "sr",
  "bs",
  "sq",
  "mk",
  "be",
];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    supportedLngs,
    // No `load: "languageOnly"`: each regional variant (pt-PT/pt-BR, the
    // Spanish family, …) has its own message file, so the full BCP-47 tag
    // must be honoured. The default `load: "all"` still falls back from a
    // region to its base language (e.g. a `de-DE` browser → `de`).
    interpolation: { escapeValue: false },
    detection: {
      // Persisted explicit choice (localStorage) wins; otherwise a
      // first-time visitor is matched to their browser/OS language;
      // English is the final fallback (fallbackLng).
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "loritalk-lang",
    },
  });

export default i18n;
