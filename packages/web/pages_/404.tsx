import I18nProvider from "next-locale/I18nProvider";
import {useRouter} from "next/router";
import React from "react";

import ErrorScreen from "@sentrei/ui/components/ErrorScreen";
import SentreiFooter from "@sentrei/web/components/SentreiFooter";
import SentreiHeader from "@sentrei/web/components/SentreiHeader";

import en0 from "../locales/en/_error.json";
import en1 from "../locales/en/footer.json";
import en2 from "../locales/en/header.json";
import en3 from "../locales/en/seo.json";
import ja0 from "../locales/ja/_error.json";
import ja1 from "../locales/ja/footer.json";
import ja2 from "../locales/ja/header.json";
import ja3 from "../locales/ja/seo.json";
import zh0 from "../locales/zh/_error.json";
import zh1 from "../locales/zh/footer.json";
import zh2 from "../locales/zh/header.json";
import zh3 from "../locales/zh/seo.json";

const namespaces = {
  en: {
    _error: en0,
    footer: en1,
    header: en2,
    seo: en3,
  },
  ja: {
    _error: ja0,
    footer: ja1,
    header: ja2,
    seo: ja3,
  },
  zh: {
    _error: zh0,
    footer: zh1,
    header: zh2,
    seo: zh3,
  },
};

export default function Custom404(): JSX.Element {
  const router = useRouter();
  const {locale, defaultLocale} = router;

  return (
    <I18nProvider
      locale={locale ?? defaultLocale ?? ""}
      namespaces={namespaces}
    >
      <SentreiHeader landingKey="404" papercups={false} />
      <ErrorScreen />
      <SentreiFooter />
    </I18nProvider>
  );
}
