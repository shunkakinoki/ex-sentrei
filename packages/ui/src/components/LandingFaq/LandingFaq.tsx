import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import Section from "@sentrei/ui/components/Section";

import LandingFaqStyles from "./LandingFaqStyles";

export default function LandingFaq(): JSX.Element {
  const classes = LandingFaqStyles();
  const {t} = useTranslation();

  return (
    <>
      <Section title={t("index:faq.sectionTitle")} subTitle="" />
      <Container maxWidth="md" component="main">
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h6" className={classes.heading}>
              {t("index:faq.titleOne")}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{t("index:faq.bodyOne")}</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography variant="h6" className={classes.heading}>
              {t("index:faq.titleTwo")}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{t("index:faq.bodyTwo")}</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography variant="h6" className={classes.heading}>
              {t("index:faq.titleThree")}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{t("index:faq.bodyThree")}</Typography>
          </AccordionDetails>
        </Accordion>
      </Container>
    </>
  );
}
