import Container from "@material-ui/core/Container";
import CenterFocusStrongIcon from "@material-ui/icons/CenterFocusStrong";
import PeopleIcon from "@material-ui/icons/People";
import WorkIcon from "@material-ui/icons/Work";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import TabBoard from "@sentrei/ui/components/TabBoard";

export interface Props {
  imgOne: JSX.Element;
  imgTwo: JSX.Element;
  imgThree: JSX.Element;
}

export default function Screen({imgOne, imgTwo, imgThree}: Props): JSX.Element {
  const {t} = useTranslation();

  return (
    <Container maxWidth="md" component="main">
      <TabBoard
        tabIconOne={<PeopleIcon />}
        tabIconTwo={<CenterFocusStrongIcon />}
        tabIconThree={<WorkIcon />}
        tabLabelOne={t("index:screen.labelOne")}
        tabLabelTwo={t("index:screen.labelTwo")}
        tabLabelThree={t("index:screen.labelThree")}
        tabPanelOne={imgOne}
        tabPanelTwo={imgTwo}
        tabPanelThree={imgThree}
      />
    </Container>
  );
}
