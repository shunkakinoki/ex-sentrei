import Box from "@material-ui/core/Box";
import * as React from "react";

import PaperCupsWindow from "@sentrei/ui/components/PaperCupsWindow";

export interface Props {
  email?: string | null;
  name?: string | null;
  userId?: string | null;
}

export default function SalesScreen({email, name, userId}: Props): JSX.Element {
  return (
    <>
      <Box py={3} />
      <PaperCupsWindow
        type="sales"
        customerEmail={email || ""}
        customerName={name || ""}
        customerUid={userId || ""}
      />
      <Box py={3} />
    </>
  );
}
