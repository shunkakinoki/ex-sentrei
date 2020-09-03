/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import Link from "next-translate/Link";
import {LinkProps} from "next/link";
import * as React from "react";

const MuiAnchor = React.forwardRef<LinkProps, any>(
  ({href, as, prefetch, ...props}, ref) => (
    <Link href={href} as={as} prefetch={prefetch} passHref>
      <a ref={ref} {...props} />
    </Link>
  ),
);

export default MuiAnchor;
