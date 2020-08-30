import {GetStaticPaths, GetStaticProps, InferGetStaticPropsType} from "next";
import Router from "next-translate/Router";

import dynamic from "next/dynamic";
import {useRouter} from "next/router";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";
import {getAdminMembers} from "@sentrei/common/firebaseAdmin/members";
import {getAdminRooms} from "@sentrei/common/firebaseAdmin/rooms";
import {getAdminSpace} from "@sentrei/common/firebaseAdmin/spaces";
import {analytics} from "@sentrei/common/utils/firebase";
import Member from "@sentrei/types/models/Member";
import Room from "@sentrei/types/models/Room";
import Space from "@sentrei/types/models/Space";
import SkeletonScreen from "@sentrei/ui/components/SkeletonScreen";
import StatusSpace from "@sentrei/ui/components/StatusSpace";
import SentreiAppHeader from "@sentrei/web/components/SentreiAppHeader";

const SpaceRoom = dynamic(
  () => {
    return import("@sentrei/ui/components/SpaceRoom");
  },
  {ssr: false},
);

export interface Props {
  spaceData: string | null;
  membersData: string | null;
  roomsData: string | null;
}

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetStaticPaths = async () => {
  return {paths: [], fallback: "unstable_blocking"};
};

export const getStaticProps: GetStaticProps<Props> = async ({params}) => {
  const spaceId = String(params?.spaceId);
  const spaceReq = getAdminSpace(spaceId);
  const membersReq = getAdminMembers({
    spaceId,
  });
  const roomsReq = getAdminRooms({
    spaceId,
  });
  const [spaceData, membersData, roomsData] = await Promise.all([
    spaceReq,
    membersReq,
    roomsReq,
  ]);
  return {
    props: {
      spaceData: JSON.stringify(spaceData),
      membersData: JSON.stringify(membersData),
      roomsData: JSON.stringify(roomsData),
    },
    revalidate: 1,
  };
};

const RoomsPage = ({
  spaceData,
  membersData,
  roomsData,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  const {query} = useRouter();

  const {user, profile} = React.useContext(AuthContext);

  React.useEffect(() => {
    analytics().setCurrentScreen("space");
  }, []);

  if (!user) {
    Router.pushI18n("/");
  }

  if (user === undefined || !profile || !spaceData || !membersData) {
    return (
      <>
        <SentreiAppHeader skeleton tabSpaceKey="rooms" type="space" />
        <SkeletonScreen />
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
          spaceId={String(query.spaceId)}
          tabSpaceKey="rooms"
          type="space"
        />
      )}
      {user && <StatusSpace userId={user.uid} profile={profile} />}
      {user && (
        <SpaceRoom
          user={user}
          profile={profile}
          membersData={JSON.parse(membersData) as Member.Get[]}
          roomsData={roomsData ? (JSON.parse(roomsData) as Room.Get[]) : null}
          spaceData={JSON.parse(spaceData) as Space.Get}
          spaceId={String(query.spaceId)}
        />
      )}
    </>
  );
};

export default RoomsPage;
