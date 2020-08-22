import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const ImageUploadStyles = makeStyles((theme: Theme) =>
  createStyles({
    label: {
      margin: theme.spacing(0, 2),
    },
  }),
);

export default ImageUploadStyles;
