import {GetStaticPaths, GetStaticProps, InferGetStaticPropsType} from "next";
import Router from "next-translate/Router";
import {useRouter} from "next/router";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";
import {getAdminLeaderboard} from "@sentrei/common/firebaseAdmin/leaderboard";
import {analytics} from "@sentrei/common/utils/firebase";
import Member from "@sentrei/types/models/Member";
import SkeletonForm from "@sentrei/ui/components/SkeletonForm";
import SpaceLeaderboard from "@sentrei/ui/components/SpaceLeaderboard";
import SentreiAppHeader from "@sentrei/web/components/SentreiAppHeader";

export interface Props {
  membersData: string | null;
}

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetStaticPaths = async () => {
  return {paths: [], fallback: "unstable_blocking"};
};

export const getStaticProps: GetStaticProps<Props> = async ({params}) => {
  const spaceId = String(params?.spaceId);
  const membersReq = getAdminLeaderboard({
    spaceId,
  });
  const [membersData] = await Promise.all([membersReq]);
  return {
    props: {
      membersData: JSON.stringify(membersData),
    },
    revalidate: 1,
  };
};

const LeaderboardPage = ({
  membersData,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  const {query} = useRouter();

  const {user, profile} = React.useContext(AuthContext);

  React.useEffect(() => {
    analytics().setCurrentScreen("spaceLeaderboard");
  }, []);

  if (user === undefined || !profile || !membersData) {
    return (
      <>
        <SentreiAppHeader skeleton tabSpaceKey="leaderboard" type="space" />
        <SkeletonForm />
      </>
    );
  }

  if (!user) {
    Router.pushI18n("/");
  }

  return (
    <>
      {user && (
        <SentreiAppHeader
          notificationCount={Number(user.notificationCount)}
          profile={profile}
          userId={user.uid}
          spaceId={String(query.spaceId)}
          tabSpaceKey="leaderboard"
          type="space"
        />
      )}
      <SpaceLeaderboard
        spaceId={String(query.spaceId)}
        membersData={JSON.parse(membersData) as Member.Get[]}
      />
    </>
  );
};

export default LeaderboardPage;
