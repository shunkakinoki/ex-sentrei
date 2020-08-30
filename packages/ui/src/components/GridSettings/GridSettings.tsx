import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import * as React from "react";

export interface Props {
  button: JSX.Element;
  children: React.ReactNode;
}

const GridSettings = ({button, children}: Props): JSX.Element => {
  return (
    <Container maxWidth="md">
      <Grid container justify="center" direction="row" spacing={1}>
        <Grid item xs={12} sm={2} md={3}>
          {button}
        </Grid>
        <Grid item xs={12} sm={10} md={9}>
          {children}
        </Grid>
      </Grid>
    </Container>
  );
};

export default GridSettings;
