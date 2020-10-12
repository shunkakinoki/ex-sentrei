/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import Button, {ButtonProps} from "@material-ui/core/Button";
import Link, {LinkProps} from "next/link";

import * as React from "react";

export type ButtonLinkProps = Omit<ButtonProps, "href" | "classes"> &
  Pick<LinkProps, "href" | "as" | "prefetch">;

const MuiButton = React.forwardRef<ButtonLinkProps, any>(
  ({href, as, prefetch, ...props}, ref) => (
    <Link href={href} as={as} prefetch={prefetch} passHref>
      <Button ref={ref} {...props} />
    </Link>
  ),
);

export default MuiButton;
