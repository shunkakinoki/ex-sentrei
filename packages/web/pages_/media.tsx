import {NextPage} from "next";
import * as React from "react";

import Footer from "@sentrei/ui/components/Footer";
import MediaScreen from "@sentrei/ui/components/MediaScreen";
import SentreiHeader from "@sentrei/web/components/SentreiHeader";
import LogoPicture from "@sentrei/web/images/png/LogoPicture";

const data = [
  {
    img: <LogoPicture />,
    title: "banner",
    cols: 1,
  },
];

const Media: NextPage = () => {
  return (
    <>
      <SentreiHeader landingKey="media" />
      <MediaScreen data={data} />
      <Footer />
    </>
  );
};

export default Media;
