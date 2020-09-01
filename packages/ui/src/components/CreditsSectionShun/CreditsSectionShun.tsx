import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import CreditsTreeItem from "@sentrei/ui/components/CreditsTreeItem";

export default function CreditsSectionShun(): JSX.Element {
  const {t} = useTranslation();

  return (
    <CreditsTreeItem nodeId="3" label={t("credits:shunkakinoki.shunkakinoki")}>
      <CreditsTreeItem nodeId="4" label={t("credits:credits.family")}>
        <CreditsTreeItem
          nodeId="5"
          label={t("credits:shunkakinoki.family.danKakinoki")}
        />
        <CreditsTreeItem
          nodeId="6"
          label={t("credits:shunkakinoki.family.makiKakinoki")}
        />
        <CreditsTreeItem
          nodeId="7"
          label={t("credits:shunkakinoki.family.yuKakinoki")}
        />
      </CreditsTreeItem>
      <CreditsTreeItem nodeId="8" label={t("credits:credits.friends")}>
        <CreditsTreeItem
          nodeId="12"
          label={t("credits:shunkakinoki.friends.hibikiOtawara")}
        />
        <CreditsTreeItem
          nodeId="9"
          label={t("credits:shunkakinoki.friends.kojuFuruta")}
        />
        <CreditsTreeItem
          nodeId="10"
          label={t("credits:shunkakinoki.friends.ryotaroSaishu")}
        />
        <CreditsTreeItem
          nodeId="11"
          label={t("credits:shunkakinoki.friends.yuiTonokawa")}
        />
        <CreditsTreeItem
          nodeId="13"
          label={t("credits:shunkakinoki.friends.yusukeSatomi")}
        />
      </CreditsTreeItem>
    </CreditsTreeItem>
  );
}
