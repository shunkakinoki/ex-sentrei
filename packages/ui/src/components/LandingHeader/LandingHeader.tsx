import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import MenuIcon from "@material-ui/icons/Menu";
import classNames from "classnames";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import {LandingKey, LandingType} from "@sentrei/types/models/Landing";
import DarkModeButton from "@sentrei/ui/components/DarkModeButton";
import LandingHeaderButton from "@sentrei/ui/components/LandingHeaderButton";
import LandingHeaderLogo from "@sentrei/ui/components/LandingHeaderLogo";
import LandingHeaderMobileDialog from "@sentrei/ui/components/LandingHeaderMobileDialog";
import LandingHeaderScrollButton from "@sentrei/ui/components/LandingHeaderScrollButton";
import MuiButton from "@sentrei/ui/components/MuiButton";
import PaperCupsWidget from "@sentrei/ui/components/PaperCupsWidget";
import SeoLanding from "@sentrei/ui/components/SeoLanding";

import LandingHeaderStyles from "./LandingHeaderStyles";

export interface Props {
  logo: JSX.Element;
  papercups?: boolean;
  landingKey: LandingKey;
  type?: LandingType;
}

export default function LandingHeader({
  logo,
  papercups = true,
  landingKey,
  type = "default",
}: Props): JSX.Element {
  const classes = LandingHeaderStyles();
  const {t} = useTranslation();

  const [
    mobileAnchorEl,
    mobileSetAnchorEl,
  ] = React.useState<null | HTMLElement>(null);

  const appBarClasses = classNames({
    [classes.appBar]: true,
    [classes.transparent]: true,
    [classes.paper]: false,
  });

  const handleMobileClick = (event: React.MouseEvent<HTMLElement>): void => {
    mobileSetAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    mobileSetAnchorEl(null);
  };

  const headerColorChange = (): void => {
    const windowsScrollTop = window.pageYOffset;
    if (windowsScrollTop > 0) {
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes.transparent);
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes.paper);
    } else {
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes.transparent);
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes.paper);
    }
  };

  React.useEffect(() => {
    window.addEventListener("scroll", headerColorChange);
    return function cleanup(): void {
      window.removeEventListener("scroll", headerColorChange);
    };
  });

  return (
    <>
      <SeoLanding landingKey={landingKey} />
      {papercups && <PaperCupsWidget />}
      <div className={classes.grow}>
        <AppBar position="fixed" className={appBarClasses}>
          <Toolbar>
            <Grid container alignItems="center" justify="center">
              <LandingHeaderLogo logo={logo} href="/" />
              <div className={classes.spy}>
                <Grid item>
                  <Hidden smDown implementation="css">
                    {type === "about" && (
                      <>
                        <LandingHeaderScrollButton
                          href="mission"
                          title={t("header:about.mission")}
                        />
                        <LandingHeaderScrollButton
                          href="core"
                          title={t("header:about.core")}
                        />
                        <LandingHeaderScrollButton
                          href="team"
                          title={t("header:about.team")}
                        />
                        <LandingHeaderScrollButton
                          href="investor"
                          title={t("header:about.investor")}
                        />
                      </>
                    )}
                    {type === "default" && (
                      <>
                        <LandingHeaderButton
                          href="/about"
                          title={t("header:default.about")}
                        />
                        <LandingHeaderButton
                          href="/analytics"
                          title={t("header:default.analytics")}
                        />
                        <LandingHeaderButton
                          href="/pricing"
                          title={t("header:default.pricing")}
                        />
                        <LandingHeaderButton
                          href="/support"
                          title={t("header:default.support")}
                        />
                      </>
                    )}
                    {type === "landing" && (
                      <>
                        <LandingHeaderScrollButton
                          href="product"
                          title={t("header:landing.product")}
                        />
                        <LandingHeaderScrollButton
                          href="testimonial"
                          title={t("header:landing.testimonial")}
                        />
                        <LandingHeaderScrollButton
                          href="pricing"
                          title={t("header:landing.pricing")}
                        />
                        <LandingHeaderScrollButton
                          href="faq"
                          title={t("header:landing.faq")}
                        />
                      </>
                    )}
                  </Hidden>
                </Grid>
              </div>
              <div className={classes.sectionDesktop}>
                <Grid item>
                  <MuiButton
                    color="primary"
                    variant="outlined"
                    href="/login"
                    className={classes.margin}
                  >
                    <Typography>{t("header:header.login")}</Typography>
                  </MuiButton>
                  <MuiButton
                    color="primary"
                    variant="contained"
                    href="/signup"
                    className={classes.margin}
                  >
                    <Typography>{t("header:header.signup")}</Typography>
                  </MuiButton>
                  <IconButton edge="end">
                    <DarkModeButton />
                  </IconButton>
                </Grid>
              </div>
              <div className={classes.sectionMobile}>
                <IconButton edge="end" onClick={handleMobileClick}>
                  {mobileAnchorEl ? <CloseIcon /> : <MenuIcon />}
                </IconButton>
                <LandingHeaderMobileDialog
                  anchorEl={mobileAnchorEl}
                  open={Boolean(mobileAnchorEl)}
                  onClose={handleClose}
                />
              </div>
            </Grid>
          </Toolbar>
        </AppBar>
        <Toolbar />
      </div>
      <Box py={3} />
    </>
  );
}
