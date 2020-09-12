import {GetStaticPaths, GetStaticProps, InferGetStaticPropsType} from "next";

import dynamic from "next/dynamic";
import {useRouter} from "next/router";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";
import {getAdminMembers} from "@sentrei/common/firebaseAdmin/members";
import {getAdminNamespace} from "@sentrei/common/firebaseAdmin/namespaces";
import {getAdminRooms} from "@sentrei/common/firebaseAdmin/rooms";
import {getAdminSpace} from "@sentrei/common/firebaseAdmin/spaces";

import Member from "@sentrei/types/models/Member";
import Room from "@sentrei/types/models/Room";
import Space from "@sentrei/types/models/Space";
import HomeScreen from "@sentrei/ui/components/HomeScreen";
import SkeletonScreen from "@sentrei/ui/components/SkeletonScreen";
import SentreiAppHeader from "@sentrei/web/components/SentreiAppHeader";

const SpaceRoom = dynamic(
  () => {
    return import("@sentrei/ui/components/SpaceRoom");
  },
  {ssr: false},
);

export interface Props {
  spaceId: string | null;
  spaceData: string | null;
  membersData: string | null;
  roomsData: string | null;
}

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetStaticPaths = async () => {
  return {paths: [], fallback: "unstable_blocking"};
};

export const getStaticProps: GetStaticProps<Props> = async ({params}) => {
  const namespaceId = String(params?.namespaceId);
  const namespace = await getAdminNamespace(namespaceId);
  if (!namespace || namespace.model === "user") {
    return {
      props: {
        spaceId: null,
        spaceData: null,
        membersData: null,
        roomsData: null,
      },
    };
  }
  const spaceReq = getAdminSpace(namespace.uid);
  const membersReq = getAdminMembers({
    spaceId: namespace.uid,
  });
  const roomsReq = getAdminRooms({
    spaceId: namespace.uid,
  });
  const [spaceData, membersData, roomsData] = await Promise.all([
    spaceReq,
    membersReq,
    roomsReq,
  ]);
  return {
    props: {
      spaceId: JSON.stringify(namespace.uid),
      spaceData: JSON.stringify(spaceData),
      membersData: JSON.stringify(membersData),
      roomsData: JSON.stringify(roomsData),
    },
    revalidate: 1,
  };
};

const Rooms = ({
  spaceId,
  spaceData,
  membersData,
  roomsData,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  const {query} = useRouter();

  const {user, profile} = React.useContext(AuthContext);

  if (
    user === undefined ||
    spaceId === undefined ||
    spaceData === undefined ||
    membersData === undefined
  ) {
    return (
      <>
        <SentreiAppHeader
          skeleton
          profile={profile ?? undefined}
          tabSpaceKey="rooms"
          type="space"
          namespaceId={String(query.namespaceId)}
        />
        <SkeletonScreen />
      </>
    );
  }

  if (!user || !profile || !spaceId || !spaceData || !membersData) {
    return (
      <>
        <SentreiAppHeader
          skeleton
          tabSpaceKey="rooms"
          type="space"
          namespaceId={String(query.namespaceId)}
        />
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
        namespaceId={String(query.namespaceId)}
        tabSpaceKey="rooms"
        type="space"
      />
      <SpaceRoom
        user={user}
        profile={profile}
        membersData={JSON.parse(membersData) as Member.Get[]}
        roomsData={roomsData ? (JSON.parse(roomsData) as Room.Get[]) : null}
        spaceData={JSON.parse(spaceData) as Space.Get}
        spaceId={JSON.parse(spaceId) as string}
      />
    </>
  );
};

export default Rooms;
