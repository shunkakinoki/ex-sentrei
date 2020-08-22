import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import LandingProductCard from "@sentrei/ui/components/LandingProductCard";

import LandingProductStyles from "./LandingProductStyles";

export interface Props {
  connectImg: JSX.Element;
  dataImg: JSX.Element;
  videoImg: JSX.Element;
}

export default function LandingProduct({
  connectImg,
  dataImg,
  videoImg,
}: Props): JSX.Element {
  const classes = LandingProductStyles();
  const {t} = useTranslation();

  return (
    <Container maxWidth="lg" component="main" className={classes.product}>
      <LandingProductCard
        left
        color="secondary-light"
        img={videoImg}
        subTitle={t("index:product.topSubTitle")}
        titleOne={t("index:product.topTitleOne")}
        titleTwo={t("index:product.topTitleTwo")}
        titleThree={t("index:product.topTitleThree")}
        type="highlight"
      />
      <Box py={3} />
      <LandingProductCard
        left={false}
        color="secondary-light"
        img={connectImg}
        subTitle={t("index:product.centerSubTitle")}
        titleOne={t("index:product.centerTitleOne")}
        titleTwo={t("index:product.centerTitleTwo")}
        titleThree={t("index:product.centerTitleThree")}
        type="highlight"
      />
      <Box py={3} />
      <LandingProductCard
        left
        color="secondary-light"
        img={dataImg}
        subTitle={t("index:product.bottomSubTitle")}
        titleOne={t("index:product.bottomTitleOne")}
        titleTwo={t("index:product.bottomTitleTwo")}
        titleThree={t("index:product.bottomTitleThree")}
        type="highlight"
      />
    </Container>
  );
}
