import Container from "@material-ui/core/Container";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";

import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import accessCheckoutLink from "@sentrei/common/services/accessCheckoutLink";
import accessPortalLink from "@sentrei/common/services/accessPortalLink";
import getStripe from "@sentrei/common/utils/getStripe";
import Member from "@sentrei/types/models/Member";
import Space from "@sentrei/types/models/Space";
import FormSection from "@sentrei/ui/components/FormSection";
import SpaceBillingPortalButton from "@sentrei/ui/components/SpaceBillingPortalButton";

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

  const [portalLink, setPortalLink] = React.useState<string>();
  const handlePortalLink = (link: string): void => setPortalLink(link);

  React.useEffect(() => {
    if (role === "admin" && !space.subscriptionId)
      accessCheckoutLink("pro", spaceId, window.location.href)
        .then(
          async (data): Promise<void> => {
            const stripe = await getStripe();
            stripe?.redirectToCheckout({sessionId: data.id});
          },
        )
        .catch(err => {
          // eslint-disable-next-line no-console
          console.log(err);
        });
  }, [role, space.subscriptionId, spaceId]);

  React.useEffect(() => {
    if (role === "admin" && space.subscriptionId)
      accessPortalLink(spaceId, window.location.href)
        .then((data): void => {
          handlePortalLink(data.url);
        })
        .catch(err => {
          // eslint-disable-next-line no-console
          console.log(err);
        });
  }, [role, space.subscriptionId, spaceId]);

  return (
    <>
      <FormSection
        icon={<AccountBalanceIcon />}
        title={t("space:settings.billing")}
        size="md"
      />
      <Container maxWidth="xs" component="main">
        <SpaceBillingPortalButton href={portalLink} />
      </Container>
    </>
  );
}
