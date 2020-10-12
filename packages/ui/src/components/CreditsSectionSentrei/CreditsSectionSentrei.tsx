import useTranslation from "next-locale/useTranslation";
import * as React from "react";

import CreditsTreeItem from "@sentrei/ui/components/CreditsTreeItem";

export interface Props {
  children: React.ReactNode;
}

export default function CreditsSectionSentrei({children}: Props): JSX.Element {
  const {t} = useTranslation();

  return (
    <CreditsTreeItem nodeId="1" label={t("credits:sentrei.sentrei")}>
      {children}
    </CreditsTreeItem>
  );
}
