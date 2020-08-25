import {GetStaticPaths, GetStaticProps, InferGetStaticPropsType} from "next";
import Router from "next-translate/Router";
import {useRouter} from "next/router";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";
import {getAdminMembers} from "@sentrei/common/firebaseAdmin/members";
import {analytics} from "@sentrei/common/utils/firebase";
import Member from "@sentrei/types/models/Member";
import Loader from "@sentrei/ui/components/Loader";
import SpaceMember from "@sentrei/ui/components/SpaceMember";
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
  const membersReq = getAdminMembers({
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

const MembersPage = ({
  membersData,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  const {query} = useRouter();

  const {user, profile} = React.useContext(AuthContext);

  React.useEffect(() => {
    analytics().setCurrentScreen("spaceMembers");
  }, []);

  if (user === undefined || !membersData) {
    return <Loader />;
  }

  if (!user) {
    Router.pushI18n("/");
  }

  return (
    <>
      {user && profile ? (
        <SentreiAppHeader
          notificationCount={Number(user.notificationCount)}
          profile={profile}
          userId={user.uid}
          spaceId={String(query.spaceId)}
          tabKey="members"
        />
      ) : (
        <SentreiAppHeader spaceId={String(query.spaceId)} />
      )}
      <SpaceMember
        spaceId={String(query.spaceId)}
        membersData={JSON.parse(membersData) as Member.Get[]}
      />
    </>
  );
};

export default MembersPage;
