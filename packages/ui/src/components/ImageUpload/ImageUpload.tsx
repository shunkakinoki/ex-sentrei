import {Avatar, Button, Grid, Typography} from "@material-ui/core";
import {AddAPhoto} from "@material-ui/icons";

import * as React from "react";

import {maxFileSize} from "@sentrei/common/const";
import upload from "@sentrei/common/services/upload";
import useSnackbar from "@sentrei/ui/hooks/useSnackbar";

import ImageUploadStyles from "./ImageUploadStyles";

export interface Props {
  hideImg?: boolean;
  id?: string;
  img?: string | null;
  label?: string;
  size?: string;
  onSave: (url: string) => void;
}

const ImageUpload = ({
  hideImg,
  id,
  img,
  label,
  size,
  onSave,
}: Props): JSX.Element => {
  const {snackbar} = useSnackbar();
  const classes = ImageUploadStyles();

  const uploadPhoto = (fileList: FileList | null): void => {
    if (!fileList) {
      return;
    }

    const file = fileList[0];

    if (file.size > maxFileSize) {
      snackbar("error", "file too big");
      return;
    }

    snackbar("info", "uploading...");

    upload(file, "spaces")
      .then(photoURL => {
        onSave(photoURL);
        snackbar("success", "saved");
      })
      .catch(err => snackbar("error", err.message));
  };

  return (
    <Grid container alignItems="center">
      {!img && !hideImg && (
        <Avatar>
          <AddAPhoto />
        </Avatar>
      )}
      {img && !hideImg && (
        <img src={img} alt="photo_uploaded" style={{width: "150px"}} />
      )}
      <input
        accept="image/*"
        style={{display: "none"}}
        id={id || "update-photo"}
        type="file"
        onChange={(e): void => uploadPhoto(e.target.files)}
      />
      <label htmlFor={id || "update-photo"} className={classes.label}>
        <Button color="primary" component="span">
          {label || "photo_update"}
        </Button>
        <br />
        {size && (
          <Typography variant="caption">photo_suggested_size size</Typography>
        )}
      </label>
    </Grid>
  );
};

export default ImageUpload;
