import {GetStaticPaths, GetStaticProps, InferGetStaticPropsType} from "next";

import {useRouter} from "next/router";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";
import {getAdminLeaderboard} from "@sentrei/common/firebaseAdmin/leaderboard";
import {getAdminNamespace} from "@sentrei/common/firebaseAdmin/namespaces";

import Member from "@sentrei/types/models/Member";
import HomeScreen from "@sentrei/ui/components/HomeScreen";
import SkeletonList from "@sentrei/ui/components/SkeletonList";
import SpaceLeaderboard from "@sentrei/ui/components/SpaceLeaderboard";
import SentreiAppHeader from "@sentrei/web/components/SentreiAppHeader";

export interface Props {
  spaceId: string | null;
  membersData: string | null;
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
        membersData: null,
      },
    };
  }
  const membersReq = getAdminLeaderboard({
    spaceId: namespace.uid,
  });
  const [membersData] = await Promise.all([membersReq]);
  return {
    props: {
      spaceId: JSON.stringify(namespace.uid),
      membersData: JSON.stringify(membersData),
    },
    revalidate: 1,
  };
};

const Leaderboard = ({
  spaceId,
  membersData,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  const {query} = useRouter();

  const {user, profile} = React.useContext(AuthContext);

  if (
    user === undefined ||
    spaceId === undefined ||
    membersData === undefined
  ) {
    return (
      <>
        <SentreiAppHeader
          skeleton
          profile={profile ?? undefined}
          tabSpaceKey="leaderboard"
          model="space"
          namespaceId={String(query.namespaceId)}
        />
        <SkeletonList />
      </>
    );
  }

  if (!user || !profile || !spaceId || !membersData) {
    return (
      <>
        <SentreiAppHeader
          skeleton
          tabSpaceKey="leaderboard"
          model="space"
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
        tabSpaceKey="leaderboard"
        model="space"
      />
      <SpaceLeaderboard
        spaceId={JSON.parse(spaceId) as string}
        membersData={JSON.parse(membersData) as Member.Get[]}
      />
    </>
  );
};

export default Leaderboard;
