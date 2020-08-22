import ButtonBase from "@material-ui/core/ButtonBase";
import {useTheme} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {motion, AnimatePresence} from "framer-motion";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";
import UseAnimations from "react-useanimations";
import heart from "react-useanimations/lib/heart";

import MuiLink from "@sentrei/ui/components/MuiLink";

export default function FooterCredits(): JSX.Element {
  const theme = useTheme();
  const {t} = useTranslation();

  const [isOpen, setIsOpen] = React.useState(false);
  const handleClick = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Typography
        variant="h6"
        component="h6"
        color="textSecondary"
        align="center"
      >
        {t("footer:footer.titleOne")}
        <UseAnimations
          animation={heart}
          reverse={isOpen}
          strokeColor={theme.palette.error.main}
          onClick={handleClick}
          pathCss={`fill: ${theme.palette.secondary.main};`}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          render={(eventProps: any, animationProps: any): JSX.Element => (
            <ButtonBase {...eventProps}>
              <div {...animationProps} />
            </ButtonBase>
          )}
        />
        {t("footer:footer.titleTwo")}{" "}
        <MuiLink href="/team">{t("footer:footer.titleThree")}</MuiLink>
      </Typography>
      <AnimatePresence initial={isOpen}>
        {isOpen && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: {opacity: 1, height: "auto"},
              collapsed: {opacity: 0, height: 0},
            }}
            transition={{duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98]}}
          >
            <MuiLink
              color={theme.palette.type === "light" ? "primary" : "secondary"}
              href="/credits"
            >
              <Typography
                variant="body2"
                color={
                  theme.palette.type === "light" ? "textSecondary" : "secondary"
                }
                align="center"
              >
                {t("footer:footer.specialThanks")}
              </Typography>
            </MuiLink>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}
