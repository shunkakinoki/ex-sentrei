import {GetStaticPaths, GetStaticProps, InferGetStaticPropsType} from "next";
import Router from "next-translate/Router";
import dynamic from "next/dynamic";
import {useRouter} from "next/router";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";
import {getAdminNamespace} from "@sentrei/common/firebaseAdmin/namespaces";
import ErrorScreen from "@sentrei/ui/components/ErrorScreen";
import OneTap from "@sentrei/ui/components/OneTap";
import SentreiHeader from "@sentrei/web/components/SentreiHeader";

const InviteSignup = dynamic(
  () => {
    return import("@sentrei/ui/components/InviteSignup");
  },
  {ssr: false},
);

export interface Props {
  spaceId: string | null;
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
      },
    };
  }
  return {
    props: {
      spaceId: JSON.stringify(namespace.uid),
    },
    revalidate: 300,
  };
};

const InviteId = ({
  spaceId,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  const {query} = useRouter();

  const {user} = React.useContext(AuthContext);

  if (user) {
    Router.pushI18n("/dashboard");
  }

  if (user === undefined || spaceId === undefined) {
    return (
      <>
        <SentreiHeader landingKey="invite" />
      </>
    );
  }

  if (!spaceId) {
    return (
      <>
        <SentreiHeader landingKey="invite" />
        <ErrorScreen />
      </>
    );
  }

  return (
    <>
      <OneTap
        delay
        user={user}
        inviteId={String(query.inviteId)}
        spaceId={JSON.parse(spaceId) as string}
      />
      <SentreiHeader landingKey="invite" papercups={false} />
      <InviteSignup
        inviteId={String(query.inviteId)}
        namespaceId={String(query.namespaceId)}
        spaceId={JSON.parse(spaceId) as string}
      />
    </>
  );
};

export default InviteId;
