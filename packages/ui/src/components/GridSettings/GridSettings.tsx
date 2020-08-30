import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import * as React from "react";

import {
  SettingsTabType,
  SettingsSpaceTabKey,
} from "@sentrei/types/models/SettingsTab";
import GridSettingsSpaceTab from "@sentrei/ui/components/GridSettingsSpaceTab";

export interface Props {
  children: React.ReactNode;
  skeleton?: boolean;
  spaceId?: string;
  tabSpaceKey?: SettingsSpaceTabKey;
  type: SettingsTabType;
}

const GridSettings = ({
  children,
  skeleton = false,
  spaceId,
  tabSpaceKey,
  type,
}: Props): JSX.Element => {
  return (
    <Container maxWidth="md">
      <Grid container justify="center" direction="row" spacing={1}>
        <Grid item xs={12} sm={3} md={2}>
          {type === "space" && skeleton && tabSpaceKey && (
            <GridSettingsSpaceTab skeleton tabKey={tabSpaceKey} />
          )}
          {type === "space" && !skeleton && spaceId && tabSpaceKey && (
            <GridSettingsSpaceTab
              skeleton={false}
              spaceId={spaceId}
              tabKey={tabSpaceKey}
            />
          )}
        </Grid>
        <Grid item xs={12} sm={9} md={10}>
          {children}
        </Grid>
      </Grid>
    </Container>
  );
};

export default GridSettings;
