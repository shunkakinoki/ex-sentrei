import {makeStyles} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import * as React from "react";
import Space from "@sentrei/types/models/Space";
import useTranslation from "next-translate/useTranslation";

export interface Props {
  space: Space.Get;
}

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function ccyFormat(num: number) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty: number, unit: number) {
  return qty * unit;
}

function createRow(desc: string, qty: number, unit: number) {
  const price = priceRow(qty, unit);
  return {desc, qty, unit, price};
}

interface Row {
  desc: string;
  qty: number;
  unit: number;
  price: number;
}

function subtotal(items: Row[]) {
  return items.map(({price}) => price).reduce((sum, i) => sum + i, 0);
}

export default function SpanningTable({space}: Props) {
  const classes = useStyles();
  const {t} = useTranslation();

  const rows = [createRow("Pro Plan", 30, Number(space.stats.members))];
  const invoiceSubtotal = subtotal(rows);
  const invoiceTotal = invoiceSubtotal;

  return (
    <TableContainer component={Paper}>
      <Table
        className={classes.table}
        aria-label="Space Billing Checkout Table"
      >
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              {t("space:billing.billing")}
            </TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{t("space:billing.tier")}</TableCell>
            <TableCell align="right">{t("space:billing.price")}</TableCell>
            <TableCell align="right">{t("space:billing.seat")}</TableCell>
            <TableCell align="right">{t("space:billing.sum")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.desc}>
              <TableCell>{row.desc}</TableCell>
              <TableCell align="right">{row.qty}</TableCell>
              <TableCell align="right">{row.unit}</TableCell>
              <TableCell align="right">{ccyFormat(row.price)}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={2}>{t("space:billing.total")}</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
