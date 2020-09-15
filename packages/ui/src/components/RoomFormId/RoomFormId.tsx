import {yupResolver} from "@hookform/resolvers";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Router from "next-translate/Router";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";
import {useForm, Controller} from "react-hook-form";
import * as Yup from "yup";

import {
  createNameroom,
  validateNameroom,
} from "@sentrei/common/firebase/namerooms";
import {trackEvent} from "@sentrei/common/utils/segment";

import Room from "@sentrei/types/models/Room";
import FormButtonCancel from "@sentrei/ui/components/FormButtonCancel";
import FormButtonSubmit from "@sentrei/ui/components/FormButtonSubmit";
import useBackdrop from "@sentrei/ui/hooks/useBackdrop";
import useSnackbar from "@sentrei/ui/hooks/useSnackbar";

export interface Props {
  disabled: boolean;
  namespaceId: string;
  room: Room.Get;
}

const RoomFormId = ({disabled, namespaceId, room}: Props): JSX.Element => {
  const {t} = useTranslation();
  const {snackbar} = useSnackbar();
  const {backdrop} = useBackdrop();

  const RoomFormIdSchema = Yup.object().shape({
    id: Yup.string()
      .required(t("form:id.idRequired"))
      .matches(/^[a-z0-9][a-z0-9_]*([.][a-z0-9_]+)*$/, t("form:id.idInvalid"))
      .test("id", t("form:id.idAlreadyUsed"), async value => {
        const result = await validateNameroom(room.id, value || "");
        return result;
      }),
  });

  const {control, register, errors, handleSubmit} = useForm({
    mode: "onSubmit",
    reValidateMode: "onBlur",
    resolver: yupResolver(RoomFormIdSchema),
  });

  const onSubmit = async (data: Record<string, string>): Promise<void> => {
    snackbar("info", t("snackbar:snackbar.editing"));
    try {
      await createNameroom(data.id, room.id)?.then(() => {
        snackbar("success");
        trackEvent("Edit Room Id");
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
                variant="subtitle1"
                color="textSecondary"
                display="inline"
                gutterBottom
              >
                sentrei.com/{namespaceId}/
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
                defaultValue={room.nameroomId}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <FormButtonSubmit>{t("common:common.edit")}</FormButtonSubmit>
        </Grid>
        <Grid item xs={12}>
          <FormButtonCancel>{t("common:common.cancel")}</FormButtonCancel>
        </Grid>
      </Grid>
    </form>
  );
};

export default RoomFormId;
