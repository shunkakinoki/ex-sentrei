import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";

import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import Member from "@sentrei/types/models/Member";
import Space from "@sentrei/types/models/Space";
import FormSection from "@sentrei/ui/components/FormSection";
import SpaceBillingAlert from "@sentrei/ui/components/SpaceBillingAlert";
import SpaceBillingCheckout from "@sentrei/ui/components/SpaceBillingCheckout";
import SpaceBillingPortal from "@sentrei/ui/components/SpaceBillingPortal";
import SpaceBillingTable from "@sentrei/ui/components/SpaceBillingTable";

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
      <Container maxWidth="md" component="main">
        {!space.subscriptionId && <SpaceBillingAlert />}
        <Box py={2} />
        <SpaceBillingTable space={space} />
        <Box py={3} />
        {!space.subscriptionId ? (
          <SpaceBillingCheckout role={role} spaceId={spaceId} />
        ) : (
          <SpaceBillingPortal role={role} space={space} spaceId={spaceId} />
        )}
      </Container>
    </>
  );
}
