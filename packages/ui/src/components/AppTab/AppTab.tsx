import Container from "@material-ui/core/Container";
import {withStyles, Theme, createStyles} from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import AppTabStyles from "./AppTabStyles";

interface StyledTabProps {
  label: string;
}

const AntTabs = withStyles((theme: Theme) =>
  createStyles({
    indicator: {
      backgroundColor: theme.palette.primary.main,
    },
  }),
)(Tabs);

const AntTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      textTransform: "none",
      minWidth: 72,
      marginRight: theme.spacing(1),
      "&:hover": {
        color: theme.palette.primary.main,
        opacity: 1,
      },
      "&$selected": {
        color: theme.palette.primary.main,
      },
      "&:focus": {
        color: theme.palette.primary.main,
      },
    },
    selected: {},
  }),
)((props: StyledTabProps) => <Tab disableRipple {...props} />);

export default function AppTab(): JSX.Element {
  const classes = AppTabStyles();
  const {t} = useTranslation();

  const [value, setValue] = React.useState(0);

  const handleChange = (
    event: React.ChangeEvent<{}>,
    newValue: number,
  ): void => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Container maxWidth="md">
        <AntTabs value={value} onChange={handleChange} aria-label="ant example">
          <AntTab label={t("common:common.dashboard")} />
          <AntTab label={t("common:common.rooms")} />
          <AntTab label={t("common:common.activity")} />
          <AntTab label={t("common:common.leaderboard")} />
          <AntTab label={t("common:common.members")} />
          <AntTab label={t("common:common.settings")} />
        </AntTabs>
      </Container>
    </div>
  );
}
