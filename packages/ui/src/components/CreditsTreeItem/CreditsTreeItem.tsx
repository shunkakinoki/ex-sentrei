import Collapse from "@material-ui/core/Collapse";
import {fade, withStyles, Theme, createStyles} from "@material-ui/core/styles";
import {TransitionProps} from "@material-ui/core/transitions";
import TreeItem, {TreeItemProps} from "@material-ui/lab/TreeItem";
import * as React from "react";
import {useSpring, animated} from "react-spring";

function TransitionComponent(props: TransitionProps): JSX.Element {
  const style = useSpring({
    from: {opacity: 0, transform: "translate3d(20px,0,0)"},
    to: {
      // eslint-disable-next-line react/destructuring-assignment
      opacity: props.in ? 1 : 0,
      // eslint-disable-next-line react/destructuring-assignment
      transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
    },
  });

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
}

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
)((props: TreeItemProps) => (
  <TreeItem {...props} TransitionComponent={TransitionComponent} />
));

export default CreditsTreeItem;
