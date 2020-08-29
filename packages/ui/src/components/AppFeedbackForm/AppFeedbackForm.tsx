/* eslint-disable @typescript-eslint/no-explicit-any */

import {yupResolver} from "@hookform/resolvers";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import {Emoji} from "emoji-mart";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";
import {useForm, Controller} from "react-hook-form";
import * as Yup from "yup";

import {createFeedback} from "@sentrei/common/firebase/feedback";

import {timestamp} from "@sentrei/common/utils/firebase";
import Feedback from "@sentrei/types/models/Feedback";
import Profile from "@sentrei/types/models/Profile";
import useSnackbar from "@sentrei/ui/hooks/useSnackbar";

import AppFeedbackFormStyles from "./AppFeedbackFormStyles";

export interface Props {
  profile: Profile.Get;
}

const AppFeedbackForm = ({profile}: Props): JSX.Element => {
  const classes = AppFeedbackFormStyles();
  const {t} = useTranslation();
  const {snackbar} = useSnackbar();

  const [emojiValue, setEmojiValue] = React.useState<Feedback.Emoji>();

  const handleSelect = (value: Feedback.Emoji): void => {
    setEmojiValue(value);
  };

  const AppFeedbackFormSchema = Yup.object().shape({
    description: Yup.string(),
    emoji: Yup.number(),
  });

  const {control, register, errors, handleSubmit} = useForm({
    mode: "onSubmit",
    reValidateMode: "onBlur",
    resolver: yupResolver(AppFeedbackFormSchema),
  });

  const onSubmit = async (data: Record<string, any>): Promise<void> => {
    snackbar("info", t("common:snackbar.creating"));
    try {
      await createFeedback({
        createdAt: timestamp,
        createdBy: profile,
        createdByUid: profile.uid,
        description: data.description,
        emoji: emojiValue,
        updatedAt: timestamp,
        updatedBy: profile,
        updatedByUid: profile.uid,
      })?.then(() => {
        snackbar("success");
      });
    } catch (err) {
      snackbar("error", err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" noValidate>
      <Grid container>
        <Grid item xs={12}>
          <Controller
            as={
              <TextField
                autoFocus
                fullWidth
                multiline
                rows={3}
                id="feedback-description"
                label={t("common:common.description")}
                margin="normal"
                name="description"
                variant="outlined"
                error={!!errors.description}
                inputRef={register}
                helperText={
                  errors.description ? errors.description.message : ""
                }
                type="text"
              />
            }
            name="description"
            control={control}
            defaultValue=""
          />
        </Grid>
        <Grid
          container
          direction="row"
          alignItems="center"
          justify="flex-start"
        >
          <Grid item xs={2}>
            <IconButton
              size="small"
              onClick={(): void => handleSelect(1)}
              className={emojiValue === 1 ? classes.button : undefined}
            >
              <Avatar className={classes.large}>
                <Emoji emoji=":hugging_face:" set="twitter" size={30} />
              </Avatar>
            </IconButton>
          </Grid>
          <Grid item xs={2}>
            <IconButton
              size="small"
              onClick={(): void => handleSelect(2)}
              className={emojiValue === 2 ? classes.button : undefined}
            >
              <Avatar className={classes.large}>
                <Emoji emoji=":thinking_face:" set="twitter" size={30} />
              </Avatar>
            </IconButton>
          </Grid>
          <Grid item xs={2}>
            <IconButton
              size="small"
              onClick={(): void => handleSelect(3)}
              className={emojiValue === 3 ? classes.button : undefined}
            >
              <Avatar className={classes.large}>
                <Emoji emoji=":frowning:" set="twitter" size={30} />
              </Avatar>
            </IconButton>
          </Grid>
          <Grid item xs={6}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              {t("common:common.submit")}
            </Button>
          </Grid>
        </Grid>
        <Box py={3} />
      </Grid>
    </form>
  );
};

export default AppFeedbackForm;
