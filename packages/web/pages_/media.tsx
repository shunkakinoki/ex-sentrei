import {NextPage} from "next";
import * as React from "react";

import MediaScreen from "@sentrei/ui/components/MediaScreen";
import SentreiFooter from "@sentrei/web/components/SentreiFooter";
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
      <SentreiFooter />
    </>
  );
};

export default Media;
