/* eslint-disable @typescript-eslint/no-explicit-any */

import {yupResolver} from "@hookform/resolvers";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Router from "next-translate/Router";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";
import {useForm, Controller} from "react-hook-form";
import * as Yup from "yup";

import {
  createNamespace,
  isReservedNamespace,
  validateNamespace,
} from "@sentrei/common/firebase/namespaces";

import Space from "@sentrei/types/models/Space";
import useBackdrop from "@sentrei/ui/hooks/useBackdrop";
import useSnackbar from "@sentrei/ui/hooks/useSnackbar";

export interface Props {
  disabled: boolean;
  space: Space.Get;
}

const SpaceFormId = ({disabled, space}: Props): JSX.Element => {
  const {t} = useTranslation();
  const {snackbar} = useSnackbar();
  const {backdrop} = useBackdrop();

  const SpaceFormIdSchema = Yup.object().shape({
    id: Yup.string()
      .required(t("form:id.idRequired"))
      .matches(/^[a-z0-9][a-z0-9_]*([.][a-z0-9_]+)*$/, t("form:id.idInvalid"))
      .test("id", t("form:id.idInvalid"), value => {
        const result = isReservedNamespace(value || "");
        return !result;
      })
      .test("id", t("form:id.idAlreadyUsed"), async value => {
        const result = await validateNamespace(value || "");
        return result;
      }),
  });

  const {control, register, errors, handleSubmit} = useForm({
    mode: "onSubmit",
    reValidateMode: "onBlur",
    resolver: yupResolver(SpaceFormIdSchema),
  });

  const onSubmit = async (data: Record<string, any>): Promise<void> => {
    snackbar("info", t("common:snackbar.editing"));
    try {
      await createNamespace(data.id, space.id, "space")?.then(() => {
        snackbar("success");
        backdrop("loading");
        setTimeout(() => {
          Router.pushI18n("/dashboard");
        }, 300);
      });
    } catch (err) {
      snackbar("error", err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" noValidate>
      <Grid container spacing={3}>
        <Grid item xs={12}>
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
                    autoFocus
                    fullWidth
                    disabled={disabled}
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
                defaultValue={space.namespaceId}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            fullWidth
            disabled={disabled}
            variant="contained"
            color="primary"
          >
            {t("common:common.edit")}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default SpaceFormId;
