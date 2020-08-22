import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const SectionStyles = makeStyles((theme: Theme) =>
  createStyles({
    section: {
      padding: theme.spacing(0, 3, 0),
    },
  }),
);

export default SectionStyles;
