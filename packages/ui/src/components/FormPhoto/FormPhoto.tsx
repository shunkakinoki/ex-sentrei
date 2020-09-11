/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/label-has-associated-control */

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";
import Cropper from "react-easy-crop";
import {useForm} from "react-hook-form";

import FormButtonCancel from "@sentrei/ui/components/FormButtonCancel";
import FormButtonSubmit from "@sentrei/ui/components/FormButtonSubmit";

import FormPhotoStyles from "./FormPhotoStyles";

export interface Props {
  disabled: boolean;
  type: "rect" | "round";
  onSubmit: () => Promise<void>;
}

const FormPhoto = ({disabled, type, onSubmit}: Props): JSX.Element => {
  const classes = FormPhotoStyles();
  const {t} = useTranslation();

  const [crop, setCrop] = React.useState({x: 0, y: 0});
  const [zoom, setZoom] = React.useState(1);
  const [imageSrc, setImageSrc] = React.useState();

  function readFile(file: any): any {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  }

  const onFileChange = async (e: any): Promise<any> => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const imageDataUrl = await readFile(file);
      setImageSrc(imageDataUrl);
    }
  };

  const {handleSubmit} = useForm({
    mode: "onSubmit",
    reValidateMode: "onBlur",
  });

  return (
    <Container maxWidth="xs">
      {imageSrc && (
        <Box p={3}>
          <div className={classes.cropContainer}>
            <Cropper
              image={imageSrc}
              crop={crop}
              cropShape={type}
              zoom={zoom}
              restrictPosition
              onCropChange={setCrop}
              onZoomChange={setZoom}
              aspect={1}
            />
          </div>
        </Box>
      )}
      {!imageSrc && (
        <Box py={2}>
          <input
            accept="image/*"
            style={{display: "none"}}
            id="form-photo"
            type="file"
            onChange={onFileChange}
          />
          <label htmlFor="form-photo">
            <Button color="primary" component="span">
              {t("common:common.uploadPhoto")}
            </Button>
          </label>
        </Box>
      )}
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" noValidate>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormButtonSubmit disabled={disabled}>
              {t("common:common.update")}
            </FormButtonSubmit>
          </Grid>
          <Grid item xs={12}>
            <FormButtonCancel>{t("common:common.cancel")}</FormButtonCancel>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default FormPhoto;
