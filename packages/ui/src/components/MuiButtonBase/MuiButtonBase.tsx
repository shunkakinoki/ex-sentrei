/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import ButtonBase, {ButtonBaseProps} from "@material-ui/core/ButtonBase";
import Link from "next-translate/Link";
import {LinkProps} from "next/link";
import * as React from "react";

export type ButtonLinkProps = Omit<ButtonBaseProps, "href" | "classes"> &
  Pick<LinkProps, "href" | "as" | "prefetch">;

const MuiButtonBase = React.forwardRef<ButtonLinkProps, any>(
  ({href, as, prefetch, ...props}, ref) => (
    <Link href={href} as={as} prefetch={prefetch} passHref>
      <ButtonBase ref={ref} {...props} />
    </Link>
  ),
);

export default MuiButtonBase;
