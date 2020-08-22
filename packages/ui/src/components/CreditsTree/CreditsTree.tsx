import * as React from "react";

import CreditsSectionSentrei from "@sentrei/ui/components/CreditsSectionSentrei";
import CreditsSectionShun from "@sentrei/ui/components/CreditsSectionShun";
import CreditsTreeView from "@sentrei/ui/components/CreditsTreeView";

export default function CreditsTree(): JSX.Element {
  return (
    <CreditsTreeView>
      <CreditsSectionSentrei>
        <CreditsSectionShun />
      </CreditsSectionSentrei>
    </CreditsTreeView>
  );
}
