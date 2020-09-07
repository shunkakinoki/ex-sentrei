import {NextPage} from "next";
import dynamic from "next/dynamic";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";

import HomeScreen from "@sentrei/ui/components/HomeScreen";
import SkeletonForm from "@sentrei/ui/components/SkeletonForm";
import SentreiAppHeader from "@sentrei/web/components/SentreiAppHeader";

const SpaceCreate = dynamic(
  () => import("@sentrei/ui/components/SpaceCreate"),
  {
    ssr: false,
  },
);

const Create: NextPage = () => {
  const {user, profile} = React.useContext(AuthContext);

  if (user === undefined || profile === undefined) {
    return (
      <>
        <SentreiAppHeader skeleton tabUserKey="create" type="user" />
        <SkeletonForm />
      </>
    );
  }

  if (!user || !profile) {
    return (
      <>
        <SentreiAppHeader skeleton tabUserKey="create" type="user" />
        <HomeScreen />
      </>
    );
  }

  return (
    <>
      <SentreiAppHeader
        notificationCount={Number(user.notificationCount)}
        profile={profile}
        userId={user.uid}
        tabUserKey="create"
        type="user"
      />
      <SpaceCreate profile={profile} user={user} />
    </>
  );
};

export default Create;
