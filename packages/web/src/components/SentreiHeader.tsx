import * as React from "react";

import Header, {Props as Original} from "@sentrei/ui/components/Header";
import LogoPicture from "@sentrei/web/images/png/LogoPicture";

type Props = Omit<Original, "logo">;

export default function SentreiHeader({type = "default"}: Props): JSX.Element {
  return <Header type={type} logo={<LogoPicture />} />;
}
