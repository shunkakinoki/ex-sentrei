import {NextPage} from "next";
import Router from "next-translate/Router";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";

import Footer from "@sentrei/ui/components/Footer";
import LandingScreen from "@sentrei/ui/components/LandingScreen";
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

  if (user) {
    Router.pushI18n("/dashboard");
  }

  return (
    <>
      <OneTap delay user={user} />
      <SentreiHeader landingKey="landing" type="landing" />
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
      <Footer />
    </>
  );
};

export default Index;
