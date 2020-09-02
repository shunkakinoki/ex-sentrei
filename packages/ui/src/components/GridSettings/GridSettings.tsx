import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import * as React from "react";

import {
  SettingsTabType,
  SettingsSpaceTabKey,
} from "@sentrei/types/models/SettingsTab";
import GridSettingsSpaceButton from "@sentrei/ui/components/GridSettingsSpaceButton";

export interface Props {
  children: React.ReactNode;
  skeleton?: boolean;
  namespaceId?: string;
  tabSpaceKey?: SettingsSpaceTabKey;
  type: SettingsTabType;
}

const GridSettings = ({
  children,
  skeleton = false,
  namespaceId,
  tabSpaceKey,
  type,
}: Props): JSX.Element => {
  return (
    <Container maxWidth="md">
      <Grid container justify="center" direction="row" spacing={1}>
        <Grid item xs={12} sm={3} md={2}>
          {type === "space" && skeleton && tabSpaceKey && (
            <GridSettingsSpaceButton skeleton tabKey={tabSpaceKey} />
          )}
          {type === "space" && !skeleton && namespaceId && tabSpaceKey && (
            <GridSettingsSpaceButton
              skeleton={false}
              namespaceId={namespaceId}
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
