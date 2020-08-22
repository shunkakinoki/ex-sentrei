/* eslint-disable no-underscore-dangle */

declare module "react-typical";
declare module "react-typist";
declare module "react-useanimations";
declare module "@metomic/react";
declare module "next-translate";
declare module "next-translate/fixHref";
declare module "next-translate/Router";
declare module "next-translate/I18nProvider";

declare module "next-translate/Link" {
  type NextLink = import("next/link");
  declare const _default: NextLink;
  export default _default;
}

declare module "next-translate/useTranslation" {
  export default function useTranslation(): {
    t: (key: string, query?: {[name: string]: string | number}) => string;
    lang: string;
  };
}
