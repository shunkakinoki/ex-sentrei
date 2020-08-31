import {GetStaticPaths, GetStaticProps, InferGetStaticPropsType} from "next";
import Router from "next-translate/Router";
import {useRouter} from "next/router";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";
import {getAdminMembers} from "@sentrei/common/firebaseAdmin/members";
import {analytics} from "@sentrei/common/utils/firebase";
import Member from "@sentrei/types/models/Member";
import SkeletonForm from "@sentrei/ui/components/SkeletonForm";
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
  const namespaceId = String(params?.namespaceId);
  const membersReq = getAdminMembers({
    namespaceId,
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

  if (user === undefined || !profile || !membersData) {
    return (
      <>
        <SentreiAppHeader skeleton tabSpaceKey="members" type="space" />
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
          namespaceId={String(query.namespaceId)}
          tabSpaceKey="members"
          type="space"
        />
      )}
      {user && (
        <SpaceMember
          namespaceId={String(query.namespaceId)}
          membersData={JSON.parse(membersData) as Member.Get[]}
          userId={user.uid}
        />
      )}
    </>
  );
};

export default MembersPage;