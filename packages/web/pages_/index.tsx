import {NextPage} from "next";
import Router from "next-translate/Router";
import Head from "next/head";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";
import {analytics} from "@sentrei/common/utils/firebase";
import Footer from "@sentrei/ui/components/Footer";
import LandingScreen from "@sentrei/ui/components/LandingScreen";
import Loader from "@sentrei/ui/components/Loader";
import OneTap from "@sentrei/ui/components/OneTap";
import SentreiHeader from "@sentrei/web/components/SentreiHeader";
import ConnectPicture from "@sentrei/web/images/svg/ConnectPicture";
import DataPicture from "@sentrei/web/images/svg/DataPicture";
import FocusPicture from "@sentrei/web/images/svg/FocusPicture";
import GoalPicture from "@sentrei/web/images/svg/GoalPicture";
import TimePicture from "@sentrei/web/images/svg/TimePicture";
import VideoPicture from "@sentrei/web/images/svg/VideoPicture";

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
      <OneTap delay user={user} />
      <SentreiHeader type="landing" />
      <LandingScreen
        connectImg={<ConnectPicture />}
        dataImg={<DataPicture />}
        videoImg={<VideoPicture />}
        timeImg={<TimePicture />}
        focusImg={<FocusPicture />}
        goalImg={<GoalPicture />}
        personOneImg={<FocusPicture />}
        personTwoImg={<GoalPicture />}
        personThreeImg={<TimePicture />}
      />
      <Footer metomic />
    </>
  );
};

export default Index;
