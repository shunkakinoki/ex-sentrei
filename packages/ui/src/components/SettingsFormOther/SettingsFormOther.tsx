import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import LanguageButton from "@sentrei/ui/components/LanguageButton";

const SettingsFormOther = (): JSX.Element => {
  const {t} = useTranslation();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Box pb={3}>
          <Typography color="textSecondary" variant="h6">
            {t("common:common.language")}
          </Typography>
        </Box>
        <LanguageButton />
      </Grid>
    </Grid>
  );
};

export default SettingsFormOther;
