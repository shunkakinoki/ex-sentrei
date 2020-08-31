import {withStyles, Theme, createStyles} from "@material-ui/core/styles";
import Tab, {TabProps} from "@material-ui/core/Tab";
import * as React from "react";

import MuiTab from "@sentrei/ui/components/MuiTab";

interface MuiGridTabIconProps {
  href: string;
  // eslint-disable-next-line react/require-default-props
  as?: string;
}

interface Props extends MuiGridTabIconProps {
  label: string;
  selected: boolean;
  // eslint-disable-next-line react/require-default-props
  skeleton?: boolean;
  // eslint-disable-next-line react/require-default-props
  spaceId?: string;
}

export default function GridTabIcon({
  as,
  href,
  label,
  selected = false,
  skeleton = false,
}: Props): JSX.Element {
  const SkeletonGridTabIcon = withStyles((theme: Theme) =>
    createStyles({
      root: {
        textTransform: "none",
        minWidth: 72,
        marginRight: theme.spacing(1),
      },
      selected: {
        color: theme.palette.primary.main,
      },
    }),
  )((props: TabProps) => <Tab {...props} label={label} selected={selected} />);

  const MuiGridTabIcon = withStyles((theme: Theme) =>
    createStyles({
      root: {
        textTransform: "none",
        minWidth: 72,
        marginRight: theme.spacing(1),
        "&:hover": {
          color: theme.palette.primary.main,
          opacity: 1,
        },
        "&$selected": {
          color: theme.palette.primary.main,
        },
        "&:focus": {
          color: theme.palette.primary.main,
        },
      },
      selected: {
        color: theme.palette.primary.main,
      },
    }),
  )((props: MuiGridTabIconProps) => (
    <MuiTab {...props} selected={selected} label={label} />
  ));

  if (skeleton) {
    return <SkeletonGridTabIcon />;
  }

  return <MuiGridTabIcon href={href} as={as} />;
}
