import SettingsIcon from "@material-ui/icons/Settings";
import useTranslation from "next-translate/useTranslation";
import Error from "next/error";
import * as React from "react";

import {getSpace} from "@sentrei/common/firebase/spaces";
import Space from "@sentrei/types/models/Space";
import FormSection from "@sentrei/ui/components/FormSection";
import SkeletonForm from "@sentrei/ui/components/SkeletonForm";
import SpaceDeleteForm from "@sentrei/ui/components/SpaceDeleteForm";

interface Props {
  namespaceId: string;
}

export default function SpaceEdit({namespaceId}: Props): JSX.Element {
  const {t} = useTranslation();

  const [space, setSpace] = React.useState<Space.Get | null | undefined>();

  React.useEffect(() => {
    getSpace(namespaceId).then(setSpace);
  }, [namespaceId]);

  if (space === undefined) {
    return <SkeletonForm />;
  }

  if (space === null) {
    return <Error statusCode={404} />;
  }

  return (
    <>
      <FormSection
        icon={<SettingsIcon />}
        title={t("space:space.deleteSpace")}
        size="md"
      />
      <SpaceDeleteForm namespaceId={namespaceId} />
    </>
  );
}
