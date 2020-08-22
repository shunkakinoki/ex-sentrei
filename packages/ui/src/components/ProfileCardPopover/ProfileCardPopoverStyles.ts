import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const ProfileCardPopoverStyles = makeStyles((theme: Theme) =>
  createStyles({
    popover: {
      pointerEvents: "none",
    },
    paper: {
      padding: theme.spacing(1),
    },
  }),
);

export default ProfileCardPopoverStyles;
