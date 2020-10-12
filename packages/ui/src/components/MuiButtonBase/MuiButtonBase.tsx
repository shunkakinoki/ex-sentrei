/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import ButtonBase, {ButtonBaseProps} from "@material-ui/core/ButtonBase";
import Link, {LinkProps} from "next/link";

import * as React from "react";

export type ButtonLinkProps = Omit<ButtonBaseProps, "href" | "classes"> &
  Pick<LinkProps, "href">;

const MuiButtonBase = React.forwardRef<ButtonLinkProps, any>(
  ({href, ...props}, ref) => (
    <Link href={href} passHref>
      <ButtonBase ref={ref} {...props} />
    </Link>
  ),
);

export default MuiButtonBase;
