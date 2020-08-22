/* eslint-disable @typescript-eslint/no-explicit-any */

import {yupResolver} from "@hookform/resolvers";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";
import {useForm, Controller} from "react-hook-form";
import {useRecoilState, RecoilState} from "recoil";
import * as Yup from "yup";

import {validateSpaceId} from "@sentrei/common/firebase/spaces";
import SpaceCreateForm from "@sentrei/types/atom/SpaceCreateForm";
import StepperButton from "@sentrei/ui/components/StepperButton";

export interface Props {
  atom: RecoilState<number>;
  form: RecoilState<SpaceCreateForm>;
}

const SpaceStepperId = ({atom, form}: Props): JSX.Element => {
  const {t} = useTranslation();

  const SpaceStepperIdSchema = Yup.object().shape({
    id: Yup.string()
      .strict(true)
      .matches(/^[a-z0-9][a-z0-9_]*([.][a-z0-9_]+)*$/, t("form:id.idInvalid"))
      .test("id", t("form:id.idAlreadyUsed"), async value => {
        const result = await validateSpaceId(value);
        return result;
      })
      .required(t("form:id.idRequired")),
  });

  const [, setActiveStep] = useRecoilState<number>(atom);

  const [activeForm, setActiveForm] = useRecoilState<SpaceCreateForm>(form);

  const {control, register, errors, handleSubmit} = useForm({
    mode: "onSubmit",
    reValidateMode: "onBlur",
    resolver: yupResolver(SpaceStepperIdSchema),
  });

  const onSubmit = (data: Record<string, any>): void => {
    setActiveForm({id: data.id, name: activeForm.name});
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" noValidate>
      <Box p={3}>
        <Grid container direction="row" alignItems="center">
          <Grid item xs={6} sm={5} md={4}>
            <Typography
              variant="h5"
              color="textSecondary"
              display="inline"
              gutterBottom
            >
              sentrei.com/
            </Typography>
          </Grid>
          <Grid item xs={6} sm={7} md={8}>
            <Controller
              as={
                <TextField
                  fullWidth
                  id="id"
                  label={t("common:common.id")}
                  margin="normal"
                  name="id"
                  required
                  variant="outlined"
                  error={!!errors.id}
                  inputRef={register}
                  helperText={errors.id ? errors.id.message : ""}
                  type="text"
                />
              }
              name="id"
              control={control}
              defaultValue={activeForm.id}
            />
          </Grid>
        </Grid>
      </Box>
      <StepperButton atom={atom} last={2} />
    </form>
  );
};

export default SpaceStepperId;
