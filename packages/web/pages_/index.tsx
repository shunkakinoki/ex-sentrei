import {NextPage} from "next";
import Router from "next-translate/Router";
import Head from "next/head";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";
import {analytics} from "@sentrei/common/utils/firebase";
import Footer from "@sentrei/ui/components/Footer";
import Loader from "@sentrei/ui/components/Loader";
import Spacing from "@sentrei/ui/components/Spacing";
import SentreiBanner from "@sentrei/web/components/SentreiBanner";
import SentreiFaq from "@sentrei/web/components/SentreiFaq";
import SentreiFeature from "@sentrei/web/components/SentreiFeature";
import SentreiHeader from "@sentrei/web/components/SentreiHeader";
import SentreiOneTap from "@sentrei/web/components/SentreiOneTap";
import SentreiPricing from "@sentrei/web/components/SentreiPricing";
import SentreiProduct from "@sentrei/web/components/SentreiProduct";
import SentreiScreen from "@sentrei/web/components/SentreiScreen";
import SentreiTestimonial from "@sentrei/web/components/SentreiTestimonial";

const Index: NextPage = () => {
  const {user} = React.useContext(AuthContext);

  React.useEffect(() => {
    analytics().setCurrentScreen("landing");
  }, []);

  if (user === undefined) {
    return <Loader />;
  }

  if (user) {
    Router.pushI18n("/dashboard");
  }

  return (
    <>
      <Head>
        <title>Sentrei</title>
        <meta name="Description" content="Sentrei landing page" />
      </Head>
      <SentreiOneTap delay user={user} />
      <SentreiHeader type="landing" />
      <SentreiBanner />
      <Spacing />
      <SentreiScreen />
      <Spacing />
      <div id="product">
        <SentreiProduct />
      </div>
      <Spacing />
      <div id="feature">
        <SentreiFeature />
      </div>
      <Spacing />
      <div id="testimonial">
        <SentreiTestimonial />
      </div>
      <Spacing />
      <div id="pricing">
        <SentreiPricing />
      </div>
      <Spacing />
      <div id="faq">
        <SentreiFaq />
      </div>
      <Spacing />
      <Footer />
    </>
  );
};

export default Index;
