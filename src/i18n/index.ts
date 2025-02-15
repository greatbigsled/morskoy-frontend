import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          gameTitle: 'Battle Ships',
          auth: {
            createAccount: "Create new account",
            create: "Create",
            login: "Login",
            or: 'or',
            username: "Username",
            password: "Password",
            repeatPassword: "Repeat Password",
            alreadyHaveAccount: "Already have account?",
            dontHaveAccount: "Don't have account?",
          },
          bfield: {
            a: "A",
            b: "B",
            c: "C",
            d: "D",
            e: "E",
            f: "F",
            g: "G",
            h: "H",
            i: "I",
            j: "J",
          },
          creator: {
            rotateShip: 'Rotate ship'
          },
          game: {
            yourGrid: 'Your grid',
            opponentsGrid: 'Opponent\'s grid',
          }
          // here we will place our translations...
        },
      },
    },
  });

export default i18n;
