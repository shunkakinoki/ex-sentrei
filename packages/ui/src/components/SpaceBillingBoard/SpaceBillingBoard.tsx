import Container from "@material-ui/core/Container";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import accessCustomerPortal from "@sentrei/common/services/accessCustomerPortal";
import Member from "@sentrei/types/models/Member";
import FormSection from "@sentrei/ui/components/FormSection";
import SpaceBillingButton from "@sentrei/ui/components/SpaceBillingButton";

export interface Props {
  role: Member.Role;
  spaceId: string;
}

export default function SpaceMemberList({role, spaceId}: Props): JSX.Element {
  const {t} = useTranslation();

  const [portalLink, setPortalLink] = React.useState<string>();
  const handlePortalLink = (token: string): void => setPortalLink(token);

  React.useEffect(() => {
    if (role === "admin")
      accessCustomerPortal(spaceId, window.location.href)
        .then((data): void => {
          handlePortalLink(data.url);
        })
        .catch(err => {
          // eslint-disable-next-line no-console
          console.log(err);
        });
  }, [role, spaceId]);

  return (
    <>
      <FormSection
        icon={<AccountBalanceIcon />}
        title={t("space:settings.billing")}
        size="md"
      />
      <Container maxWidth="xs" component="main">
        <SpaceBillingButton href={portalLink} />
      </Container>
    </>
  );
}
