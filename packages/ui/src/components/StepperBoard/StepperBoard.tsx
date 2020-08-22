import Container from "@material-ui/core/Container";

import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import * as React from "react";
import {useRecoilState, RecoilState} from "recoil";

import StepperBoardStyles from "./StepperBoardStyles";

export interface Props {
  atom: RecoilState<number>;
  stepperLabelOne: string;
  stepperLabelTwo: string;
  stepperLabelThree: string;
  stepperPanelOne: JSX.Element;
  stepperPanelTwo: JSX.Element;
  stepperPanelThree: JSX.Element;
}

const StepperBoard = ({
  atom,
  stepperLabelOne,
  stepperLabelTwo,
  stepperLabelThree,
  stepperPanelOne,
  stepperPanelTwo,
  stepperPanelThree,
}: Props): JSX.Element => {
  const classes = StepperBoardStyles();

  const [activeStep] = useRecoilState<number>(atom);

  function getSteps(): string[] {
    return [stepperLabelOne, stepperLabelTwo, stepperLabelThree];
  }

  const steps = getSteps();

  function getStepContent(stepIndex: number): JSX.Element {
    switch (stepIndex) {
      case 0:
        return stepperPanelOne;
      case 1:
        return stepperPanelTwo;
      case 2:
        return stepperPanelThree;
      default:
        return <></>;
    }
  }

  return (
    <Container maxWidth="sm">
      <div className={classes.root}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>{getStepContent(activeStep)}</div>
      </div>
    </Container>
  );
};

export default StepperBoard;
