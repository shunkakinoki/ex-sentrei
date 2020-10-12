/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-has-content */

import MuiLink, {LinkProps as MuiLinkProps} from "@material-ui/core/Link";
import NextLink, {LinkProps as NextLinkProps} from "next/link";

import * as React from "react";

type NextComposedProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "href"
> &
  NextLinkProps;

const NextComposed = React.forwardRef<HTMLAnchorElement, NextComposedProps>(
  (props, ref) => {
    const {
      href,
      replace,
      scroll,
      passHref,
      shallow,
      prefetch,
      ...other
    } = props;

    return (
      <NextLink
        href={href}
        prefetch={prefetch}
        replace={replace}
        scroll={scroll}
        shallow={shallow}
        passHref={passHref}
      >
        <a ref={ref} {...other} />
      </NextLink>
    );
  },
);

interface LinkPropsBase {
  activeClassName?: string;
  innerRef?: React.Ref<HTMLAnchorElement>;
  naked?: boolean;
}

export type LinkProps = LinkPropsBase &
  NextComposedProps &
  Omit<MuiLinkProps, "href">;

function Link(props: LinkProps): JSX.Element {
  const {href, innerRef, naked, ...other} = props;

  return (
    <MuiLink
      component={NextComposed}
      ref={innerRef}
      href={href as string}
      {...other}
    />
  );
}

export default React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
  <Link {...props} innerRef={ref} />
));
