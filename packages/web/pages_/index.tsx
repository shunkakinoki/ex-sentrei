import {NextPage} from "next";
import Router from "next-translate/Router";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";

import LandingScreen from "@sentrei/ui/components/LandingScreen";
import OneTap from "@sentrei/ui/components/OneTap";
import SentreiFooter from "@sentrei/web/components/SentreiFooter";
import SentreiHeader from "@sentrei/web/components/SentreiHeader";
import ConnectPicture from "@sentrei/web/images/svg/ConnectPicture";
import DataPicture from "@sentrei/web/images/svg/DataPicture";
import VideoPicture from "@sentrei/web/images/svg/VideoPicture";

const Index: NextPage = () => {
  const {user} = React.useContext(AuthContext);

  if (user) {
    Router.pushI18n("/dashboard");
  }

  return (
    <>
      <OneTap delay user={user} />
      <SentreiHeader landingKey="landing" />
      <LandingScreen
        connectImg={<ConnectPicture />}
        dataImg={<DataPicture />}
        videoImg={<VideoPicture />}
      />
      <SentreiFooter />
    </>
  );
};

export default Index;
