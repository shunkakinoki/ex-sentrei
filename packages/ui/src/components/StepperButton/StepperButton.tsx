import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";
import {useRecoilState, RecoilState} from "recoil";

import StepperButtonStyles from "./StepperButtonStyles";

export interface Props {
  atom: RecoilState<number>;
  last: number;
}

const StepperButton = ({atom, last}: Props): JSX.Element => {
  const classes = StepperButtonStyles();
  const {t} = useTranslation();

  const [activeStep, setActiveStep] = useRecoilState<number>(atom);

  const handleBack = (): void => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  return (
    <>
      <Grid container direction="row" spacing={1}>
        <Grid item xs={3}>
          <Button
            fullWidth
            disabled={activeStep === 0}
            className={classes.backButton}
            onClick={handleBack}
          >
            {t("common:common.back")}
          </Button>
        </Grid>
        <Grid item xs={6} />
        <Grid item xs={3}>
          {activeStep !== last && (
            <Button fullWidth type="submit" variant="contained" color="primary">
              {t("common:common.next")}
            </Button>
          )}
        </Grid>
      </Grid>
      <Box p={1} />
      {activeStep === last && (
        <Button fullWidth type="submit" variant="contained" color="primary">
          {t("common:common.create")}
        </Button>
      )}
    </>
  );
};

export default StepperButton;
