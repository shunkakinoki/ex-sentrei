import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import {createInvite} from "@sentrei/common/firebase/invites";
import {timestamp} from "@sentrei/common/utils/firebase";
import Invite from "@sentrei/types/models/Invite";
import Profile from "@sentrei/types/models/Profile";
import User from "@sentrei/types/models/User";
import FormButtonSubmit from "@sentrei/ui/components/FormButtonSubmit";
import useSnackbar from "@sentrei/ui/hooks/useSnackbar";

export interface Props {
  profile: Profile.Get;
  spaceId: string;
  user: User.Get;
}

const InviteFormLink = ({profile, user, spaceId}: Props): JSX.Element => {
  const {t} = useTranslation();
  const {snackbar} = useSnackbar();

  const [period, setPeriod] = React.useState<Invite.Period>("day");

  const handleChange = (event: React.ChangeEvent<{value: unknown}>): void => {
    setPeriod(event.target.value as Invite.Period);
  };

  const handleSubmit = async (): Promise<void> => {
    snackbar("info", t("snackbar:snackbar.editing"));
    try {
      await createInvite(spaceId, {
        createdAt: timestamp,
        createdBy: profile,
        createdByUid: user.uid,
        method: "link",
        period,
        spaceId,
        updatedAt: timestamp,
        updatedBy: profile,
        updatedByUid: user.uid,
      })?.then(() => {
        snackbar("success");
      });
    } catch (err) {
      snackbar("error", err.message);
    }
  };

  return (
    <Grid container direction="row" alignItems="center" spacing={3}>
      <Grid item xs={12} sm={12} md={4}>
        <FormControl fullWidth size="small">
          <TextField
            id="select"
            label="Period"
            select
            size="medium"
            variant="outlined"
            value={period}
            onChange={handleChange}
          >
            <MenuItem value="day">{t("common:common.day")}</MenuItem>
            <MenuItem value="week">{t("common:common.week")}</MenuItem>
            <MenuItem value="never">{t("common:common.never")}</MenuItem>
          </TextField>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={12} md={8}>
        <FormButtonSubmit
          event="Create Invite Link"
          onClick={(): Promise<void> => handleSubmit()}
        >
          {t("common:common.create")}
        </FormButtonSubmit>
      </Grid>
    </Grid>
  );
};

export default InviteFormLink;
