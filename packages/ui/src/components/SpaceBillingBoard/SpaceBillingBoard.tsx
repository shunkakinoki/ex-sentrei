import Container from "@material-ui/core/Container";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";

import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import Member from "@sentrei/types/models/Member";
import Space from "@sentrei/types/models/Space";
import FormSection from "@sentrei/ui/components/FormSection";
import SpaceBillingCheckout from "@sentrei/ui/components/SpaceBillingCheckout";
import SpaceBillingPortal from "@sentrei/ui/components/SpaceBillingPortal";

export interface Props {
  role: Member.Role;
  space: Space.Get;
  spaceId: string;
}

export default function SpaceMemberList({
  role,
  space,
  spaceId,
}: Props): JSX.Element {
  const {t} = useTranslation();

  return (
    <>
      <FormSection
        icon={<AccountBalanceIcon />}
        title={t("space:settings.billing")}
        size="md"
      />
      <Container maxWidth="xs" component="main">
        {!space.subscriptionId && (
          <SpaceBillingCheckout role={role} spaceId={spaceId} />
        )}
        {space.subscriptionId && (
          <SpaceBillingPortal role={role} spaceId={spaceId} />
        )}
      </Container>
    </>
  );
}
