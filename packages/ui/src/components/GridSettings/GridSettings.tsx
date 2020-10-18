import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import * as React from "react";

import {
  SettingsTabModel,
  SettingsRoomTabKey,
  SettingsSpaceTabKey,
} from "@sentrei/types/models/SettingsTab";
import GridSettingsRoomButton from "@sentrei/ui/components/GridSettingsRoomButton";
import GridSettingsSpaceButton from "@sentrei/ui/components/GridSettingsSpaceButton";

export interface Props {
  children?: React.ReactNode;
  skeleton?: boolean;
  namespaceId?: string;
  nameroomId?: string;
  tabRoomKey?: SettingsRoomTabKey;
  tabSpaceKey?: SettingsSpaceTabKey;
  model: SettingsTabModel;
}

const GridSettings = ({
  children,
  skeleton = false,
  namespaceId,
  nameroomId,
  tabRoomKey,
  tabSpaceKey,
  model,
}: Props): JSX.Element => {
  return (
    <Container maxWidth="md">
      <Grid container justifyContent="center" direction="row" spacing={1}>
        <Grid item xs={12} sm={3} md={2}>
          {model === "room" && skeleton && tabRoomKey && (
            <GridSettingsRoomButton skeleton tabKey={tabRoomKey} />
          )}
          {model === "room" &&
            !skeleton &&
            namespaceId &&
            nameroomId &&
            tabRoomKey && (
              <GridSettingsRoomButton
                skeleton={false}
                namespaceId={namespaceId}
                nameroomId={nameroomId}
                tabKey={tabRoomKey}
              />
            )}
          {model === "space" && skeleton && tabSpaceKey && (
            <GridSettingsSpaceButton skeleton tabKey={tabSpaceKey} />
          )}
          {model === "space" && !skeleton && namespaceId && tabSpaceKey && (
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
