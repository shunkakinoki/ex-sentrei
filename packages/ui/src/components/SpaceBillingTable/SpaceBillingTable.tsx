import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import {getSubscription} from "@sentrei/common/firebase/subscripitions";
import Space from "@sentrei/types/models/Space";
import Subscription from "@sentrei/types/models/Subscription";

export interface Props {
  space: Space.Get;
}

export default function SpaceBillingTable({space}: Props): JSX.Element {
  const {t} = useTranslation();
  const [subscription, setSubscription] = React.useState<
    Subscription | null | undefined
  >();

  React.useEffect(() => {
    if (space?.subscriptionId) {
      getSubscription(space?.subscriptionId).then(setSubscription);
    }
  }, [space.subscriptionId]);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="Space Billing Checkout Table">
        <TableHead>
          <TableRow>
            <TableCell>{t("space:billing.tier.title")}</TableCell>
            <TableCell align="right">{t("space:billing.price")}</TableCell>
            <TableCell align="right">{t("space:billing.seat")}</TableCell>
            <TableCell align="right">{t("space:billing.sum")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>{t(`space:billing.tier.${space.tier}`)}</TableCell>
            <TableCell align="right">
              {!space?.subscriptionId && t("space:billing.symbol")}
              {!space?.subscriptionId && "0"}
              {space?.subscriptionId &&
                (subscription && subscription.price.currency === "usd"
                  ? "$"
                  : "¥")}
              {space?.subscriptionId &&
                subscription &&
                Number(subscription.price.unit_amount_decimal) /
                  (subscription.price.currency === "usd" ? 100 : 1)}
            </TableCell>
            <TableCell align="right">
              {!space?.subscriptionId && space.memberCount}
              {space?.subscriptionId && subscription && subscription.quantity}
            </TableCell>
            <TableCell align="right">
              {!space?.subscriptionId && t("space:billing.symbol")}
              {!space?.subscriptionId && "0"}
              {space?.subscriptionId &&
                subscription &&
                (subscription.price.currency === "usd" ? "$" : "¥")}
              {space?.subscriptionId &&
                subscription &&
                Number(subscription.price.unit_amount_decimal) /
                  (subscription.price.currency === "usd" ? 100 : 1)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>{t("space:billing.total")}</TableCell>
            <TableCell align="right">
              {!space?.subscriptionId && t("space:billing.symbol")}
              {!space?.subscriptionId && "0"}
              {space?.subscriptionId &&
                subscription &&
                (subscription.price.currency === "usd" ? "$" : "¥")}
              {space?.subscriptionId &&
                subscription &&
                (subscription.quantity *
                  Number(subscription.price.unit_amount_decimal)) /
                  (subscription.price.currency === "usd" ? 100 : 1)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
