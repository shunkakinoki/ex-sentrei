import {NextPage} from "next";
import Router from "next-translate/Router";
import dynamic from "next/dynamic";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";

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

  if (!user && typeof window !== "undefined") {
    Router.pushI18n("/");
  }

  if (user === undefined || !profile) {
    return (
      <>
        <SentreiAppHeader skeleton tabUserKey="create" type="user" />
        <SkeletonForm />
      </>
    );
  }

  return (
    <>
      {user && (
        <SentreiAppHeader
          notificationCount={Number(user.notificationCount)}
          profile={profile}
          userId={user.uid}
          tabUserKey="create"
          type="user"
        />
      )}
      {user && <SpaceCreate profile={profile} user={user} />}
    </>
  );
};

export default Create;
