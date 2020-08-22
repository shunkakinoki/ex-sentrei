import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import * as React from "react";

import Section from "@sentrei/ui/components/Section";

import ProfileStyles from "./ProfileStyles";

export interface Props {
  userEmail: string | null;
}

export default function Profile({userEmail}: Props): JSX.Element {
  const classes = ProfileStyles();

  return (
    <>
      <Container maxWidth="sm" component="main" className={classes.profile}>
        <Section title="Profile" subTitle="" />
        <Typography gutterBottom>
          <span>Display Name:</span>
        </Typography>
        <Typography gutterBottom>
          <span>Email:</span> {userEmail}
        </Typography>
        <Typography gutterBottom>
          <span>Email Verification Status:</span>
          {/* {user.emailVerified === true ? "Verified" : "Not Verified"} */}
        </Typography>
        <Typography gutterBottom>
          <span>User ID</span>
        </Typography>
        <Typography gutterBottom>
          <span>Last Login:</span>
        </Typography>
        <Typography gutterBottom>
          <span>Date Updated:</span>
        </Typography>
      </Container>
    </>
  );
}
