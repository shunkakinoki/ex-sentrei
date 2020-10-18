import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import useTranslation from "next-locale/useTranslation";
import * as React from "react";
import {useRecoilState, RecoilState} from "recoil";

import FormButtonSubmit from "@sentrei/ui/components/FormButtonSubmit";

export interface Props {
  atom: RecoilState<number>;
  last?: number;
}

const StepperButton = ({atom, last = 2}: Props): JSX.Element => {
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
            disabled={activeStep === 0}
            fullWidth
            color="primary"
            onClick={handleBack}
            variant="outlined"
          >
            {t("common:common.back")}
          </Button>
        </Grid>
        <Grid item xs={6} />
        <Grid item xs={3}>
          {activeStep !== last && (
            <Button fullWidth type="submit" color="primary" variant="contained">
              {t("common:common.next")}
            </Button>
          )}
        </Grid>
      </Grid>
      <Box p={1} />
      {activeStep === last && (
        <FormButtonSubmit>{t("common:common.create")}</FormButtonSubmit>
      )}
    </>
  );
};

export default StepperButton;
