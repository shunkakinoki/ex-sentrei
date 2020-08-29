import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
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

import SpaceLeaderboardTableStyles from "./SpaceLeaderboardTableStyles";

export interface Props {
  members: Member.Get[];
}

export default function SpaceMemberList({members}: Props): JSX.Element {
  const classes = SpaceLeaderboardTableStyles();
  const {t} = useTranslation();

  return (
    <TableContainer component={Paper}>
      <Table aria-label="table">
        <TableHead>
          <TableRow>
            <TableCell align="left">{t("space:leaderboard.ranking")}</TableCell>
            <TableCell align="center">{t("common:common.name")}</TableCell>
            <TableCell align="right">{t("common:common.score")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {members.map((member, ranking) => (
            <TableRow key={member.name}>
              <TableCell align="left">
                <Avatar variant="rounded">{ranking + 1}</Avatar>
              </TableCell>
              <TableCell align="center" className={classes.avatar}>
                <ProfileCard member={member} />
                <Box px={3} />
                {member.name}
              </TableCell>
              <TableCell align="right">
                <Box pr={3}>{member.score}</Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
