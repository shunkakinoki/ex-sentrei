import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";
import {useForm} from "react-hook-form";
import {useRecoilState, RecoilState} from "recoil";

import RoomCreateForm from "@sentrei/types/atom/RoomCreateForm";
import Room from "@sentrei/types/models/Room";
import StepperButton from "@sentrei/ui/components/StepperButton";

export interface Props {
  atom: RecoilState<number>;
  form: RecoilState<RoomCreateForm>;
}

const RoomStepperType = ({atom, form}: Props): JSX.Element => {
  const {t} = useTranslation();

  const [type, setType] = React.useState<Room.Types>("focus");
  const [, setActiveStep] = useRecoilState<number>(atom);
  const [activeForm, setActiveForm] = useRecoilState<RoomCreateForm>(form);

  const handleChange = (event: React.ChangeEvent<{value: unknown}>): void => {
    setType(event.target.value as Room.Types);
  };

  const {handleSubmit} = useForm({
    mode: "onSubmit",
    reValidateMode: "onBlur",
  });

  const onSubmit = (): void => {
    setActiveForm({name: activeForm.name, type});
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" noValidate>
      <Box p={3}>
        <Grid container justify="center" alignItems="center">
          <FormControl>
            <TextField
              fullWidth
              id="select"
              select
              size="medium"
              variant="outlined"
              value={type}
              onChange={handleChange}
            >
              <MenuItem value="focus">{t("common:common.focus")}</MenuItem>
            </TextField>
          </FormControl>
        </Grid>
      </Box>
      <StepperButton atom={atom} last={2} />
    </form>
  );
};

export default RoomStepperType;
