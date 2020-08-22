import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const ProfileStyles = makeStyles((theme: Theme) =>
  createStyles({
    profile: {
      padding: theme.spacing(12, 0, 0),
    },
  }),
);

export default ProfileStyles;
