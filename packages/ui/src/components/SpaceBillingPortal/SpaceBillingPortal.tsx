import Button from "@material-ui/core/Button";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import accessPortalLink from "@sentrei/common/services/accessPortalLink";
import Member from "@sentrei/types/models/Member";
import Space from "@sentrei/types/models/Space";
import MuiButton from "@sentrei/ui/components/MuiButton";
import useSnackbar from "@sentrei/ui/hooks/useSnackbar";

export interface Props {
  role: Member.Role;
  space: Space.Get;
  spaceId: string;
}

export default function SpaceBillingPortal({
  role,
  space,
  spaceId,
}: Props): JSX.Element {
  const {t} = useTranslation();
  const {snackbar} = useSnackbar();

  const [portalLink, setPortalLink] = React.useState<string>();
  const handlePortalLink = (link: string): void => setPortalLink(link);

  React.useEffect(() => {
    if (role === "admin" && space?.subscriptionId)
      accessPortalLink(spaceId, window.location.href)
        .then((data): void => {
          handlePortalLink(data.url);
        })
        .catch(err => {
          snackbar("error", err.message);
        });
  }, [role, space.subscriptionId, spaceId, snackbar]);

  if (role !== "admin") {
    return (
      <Button disabled color="inherit" variant="outlined">
        {t("common:common.disabled")}
      </Button>
    );
  }

  if (!space?.subscriptionId) {
    return (
      <Button disabled color="inherit" variant="outlined">
        {t("common:common.subscriptionNone")}
      </Button>
    );
  }

  if (!portalLink) {
    return (
      <Button disabled color="inherit" variant="outlined">
        {t("common:common.loading")}
      </Button>
    );
  }

  return (
    <MuiButton href={portalLink} color="primary" variant="contained">
      {t("common:common.billingLink")}
    </MuiButton>
  );
}
