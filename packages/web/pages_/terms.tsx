import {GetStaticProps, InferGetStaticPropsType} from "next";
import * as React from "react";

import markdown from "@sentrei/common/utils/markdown";
import LegalScreen from "@sentrei/ui/components/LegalScreen";
import SentreiFooter from "@sentrei/web/components/SentreiFooter";
import SentreiHeader from "@sentrei/web/components/SentreiHeader";

export interface Props {
  content: string;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const content = await markdown("TERMS");

  return {
    props: {
      content,
    },
  };
};

const Terms = ({
  content,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  return (
    <>
      <SentreiHeader landingKey="terms" />
      <LegalScreen content={content} />
      <SentreiFooter />
    </>
  );
};

export default Terms;
