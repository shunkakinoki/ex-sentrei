import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import * as React from "react";

import TabPanel from "@sentrei/ui/components/TabPanel";

export interface Props {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | false;
  tabIconOne: JSX.Element;
  tabIconTwo: JSX.Element;
  tabIconThree: JSX.Element;
  tabLabelOne: string;
  tabLabelTwo: string;
  tabLabelThree: string;
  tabPanelOne: JSX.Element;
  tabPanelTwo: JSX.Element;
  tabPanelThree: JSX.Element;
}

function a11yProps(
  index: number,
): {
  id: string;
  "aria-controls": string;
} {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const TabBoard = ({
  size = "sm",
  tabIconOne,
  tabIconTwo,
  tabIconThree,
  tabLabelOne,
  tabLabelTwo,
  tabLabelThree,
  tabPanelOne,
  tabPanelTwo,
  tabPanelThree,
}: Props): JSX.Element => {
  const [value, setValue] = React.useState<number>(0);

  const handleChange = (
    event: React.ChangeEvent<{}>,
    newValue: number,
  ): void => {
    setValue(newValue);
  };

  return (
    <Container maxWidth={size}>
      <Grid container justify="center" direction="row" spacing={1}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label={tabLabelOne} icon={tabIconOne} {...a11yProps(0)} />
          <Tab label={tabLabelTwo} icon={tabIconTwo} {...a11yProps(1)} />
          <Tab label={tabLabelThree} icon={tabIconThree} {...a11yProps(2)} />
        </Tabs>
      </Grid>
      <TabPanel value={value} index={0}>
        {tabPanelOne}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {tabPanelTwo}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {tabPanelThree}
      </TabPanel>
    </Container>
  );
};

export default TabBoard;
