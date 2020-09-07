/* eslint-disable @typescript-eslint/no-explicit-any */

import {yupResolver} from "@hookform/resolvers";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import clsx from "clsx";
import {Emoji} from "emoji-mart";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";
import {useForm, Controller} from "react-hook-form";
import {atom, useRecoilState, RecoilState} from "recoil";
import * as Yup from "yup";

import {createFeedback} from "@sentrei/common/firebase/feedback";
import {timestamp} from "@sentrei/common/utils/firebase";
import Feedback from "@sentrei/types/models/Feedback";
import Profile from "@sentrei/types/models/Profile";
import useSnackbar from "@sentrei/ui/hooks/useSnackbar";

import AppFormFeedbackStyles from "./AppFormFeedbackStyles";

const feedbackForm: RecoilState<Feedback.Fields> = atom({
  key: "feedbackForm",
  default: {description: "", emoji: null} as Feedback.Fields,
});

export interface Props {
  handleClick: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  profile: Profile.Get;
}

const AppFormFeedback = ({handleClick, profile}: Props): JSX.Element => {
  const classes = AppFormFeedbackStyles();
  const {t} = useTranslation();
  const {snackbar} = useSnackbar();

  const [activeForm, setActiveForm] = useRecoilState<Feedback.Fields>(
    feedbackForm,
  );

  const handleSelect = (value: Feedback.Emoji): void => {
    setActiveForm({emoji: value});
  };

  const AppFormFeedbackSchema = Yup.object().shape({
    description: Yup.string(),
  });

  const {control, register, errors, handleSubmit} = useForm({
    mode: "onSubmit",
    reValidateMode: "onBlur",
    resolver: yupResolver(AppFormFeedbackSchema),
  });

  const onSubmit = async (data: Record<string, any>): Promise<void> => {
    snackbar("info", t("snackbar:snackbar.creating"));
    try {
      await createFeedback({
        createdAt: timestamp,
        createdBy: profile,
        createdByUid: profile.uid,
        description: data.description,
        emoji: activeForm.emoji,
        updatedAt: timestamp,
        updatedBy: profile,
        updatedByUid: profile.uid,
      })?.then(() => {
        handleClick(null);
        setActiveForm({description: "", emoji: null});
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
            defaultValue={activeForm.description}
          />
        </Grid>
        <Grid
          container
          direction="row"
          alignItems="center"
          justify="flex-start"
        >
          <Grid item xs={2}>
            <IconButton size="small" onClick={(): void => handleSelect(1)}>
              <Avatar
                className={clsx(classes.large, {
                  [classes.selected]: activeForm.emoji === 1,
                })}
              >
                <Emoji emoji=":hugging_face:" set="twitter" size={30} />
              </Avatar>
            </IconButton>
          </Grid>
          <Grid item xs={2}>
            <IconButton size="small" onClick={(): void => handleSelect(2)}>
              <Avatar
                className={clsx(classes.large, {
                  [classes.selected]: activeForm.emoji === 2,
                })}
              >
                <Emoji emoji=":thinking_face:" set="twitter" size={30} />
              </Avatar>
            </IconButton>
          </Grid>
          <Grid item xs={2}>
            <IconButton size="small" onClick={(): void => handleSelect(3)}>
              <Avatar
                className={clsx(classes.large, {
                  [classes.selected]: activeForm.emoji === 3,
                })}
              >
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

export default AppFormFeedback;
