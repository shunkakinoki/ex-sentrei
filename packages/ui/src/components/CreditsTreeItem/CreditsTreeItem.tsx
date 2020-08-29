import {fade, withStyles, Theme, createStyles} from "@material-ui/core/styles";
import TreeItem, {TreeItemProps} from "@material-ui/lab/TreeItem";
import * as React from "react";

const CreditsTreeItem = withStyles((theme: Theme) =>
  createStyles({
    iconContainer: {
      "& .close": {
        opacity: 0.3,
      },
    },
    group: {
      marginLeft: 7,
      paddingLeft: 18,
      borderLeft: `1px dashed ${fade(theme.palette.text.primary, 0.4)}`,
    },
  }),
)((props: TreeItemProps) => <TreeItem {...props} />);

export default CreditsTreeItem;
