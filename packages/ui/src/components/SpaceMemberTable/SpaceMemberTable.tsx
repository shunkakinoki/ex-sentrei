import Paper from "@material-ui/core/Paper";
import {withStyles, Theme, createStyles} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import Member from "@sentrei/types/models/Member";
import ProfileCard from "@sentrei/ui/components/ProfileCard";

export interface Props {
  members: Member.Get[];
  userId: string;
}

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.action.hover,
    },
  }),
)(TableRow);

export default function SpaceMemberTable({
  members,
  userId,
}: Props): JSX.Element {
  const {t} = useTranslation();

  return (
    <TableContainer component={Paper}>
      <Table aria-label="table">
        <TableHead>
          <TableRow>
            <TableCell align="left">{t("common:common.avatar")}</TableCell>
            <TableCell align="left">{t("common:common.name")}</TableCell>
            <TableCell align="center">{t("common:common.username")}</TableCell>
            <TableCell align="right">{t("common:common.role")}</TableCell>
            <TableCell align="right">
              {t("common:common.lastUpdated")}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {members
            .filter(doc => doc.uid === userId)
            .map(member => (
              <StyledTableRow key={member.id}>
                <TableCell align="left">
                  <ProfileCard member={member} />
                </TableCell>
                <TableCell align="left">{member.name}</TableCell>
                <TableCell align="center">{member.namespaceId}</TableCell>
                <TableCell align="right">{member.role}</TableCell>
                <TableCell align="right">{member.updatedAt}</TableCell>
              </StyledTableRow>
            ))}
          {members
            .filter(doc => doc.uid !== userId)
            .map(member => (
              <TableRow key={member.id}>
                <TableCell align="left">
                  <ProfileCard member={member} />
                </TableCell>
                <TableCell align="left">{member.name}</TableCell>
                <TableCell align="center">{member.namespaceId}</TableCell>
                <TableCell align="right">{member.role}</TableCell>
                <TableCell align="right">{member.updatedAt}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
