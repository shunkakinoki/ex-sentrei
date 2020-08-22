import NoSsr from "@material-ui/core/NoSsr";
import {useTheme} from "@material-ui/core/styles";
import * as React from "react";
import {useInView} from "react-intersection-observer";
import {RoughNotation} from "react-rough-notation";

declare type brackets = "left" | "right" | "top" | "bottom";

export interface Props {
  animate?: boolean;
  animationDelay?: number;
  animationDuration?: number;
  brackets?: brackets | brackets[];
  color: "primary" | "primary-light" | "secondary" | "secondary-light" | string;
  padding?: number | [number, number, number, number] | [number, number];
  initial?: boolean;
  iterations?: number;
  strokeWidth?: number;
  text: string;
  type:
    | "bracket"
    | "underline"
    | "box"
    | "circle"
    | "highlight"
    | "strike-through"
    | "crossed-off";
}

export default function CustomRoughNotation({
  animate = true,
  animationDelay = 0,
  animationDuration = 800,
  initial = false,
  strokeWidth = 1,
  brackets,
  color,
  iterations,
  padding,
  text,
  type,
}: Props): JSX.Element {
  const theme = useTheme();

  const [show, setShow] = React.useState(initial);
  const [ref, inView] = useInView({
    threshold: 0,
  });

  React.useEffect(() => {
    setShow(inView);
  }, [inView]);

  return (
    <NoSsr>
      <span ref={ref}>
        <RoughNotation
          animate={animate}
          animationDelay={animationDelay}
          animationDuration={animationDuration}
          brackets={brackets}
          strokeWidth={strokeWidth}
          color={
            color === "primary"
              ? theme.palette.primary.main
              : color === "primary-light"
              ? theme.palette.primary.light
              : color === "secondary"
              ? theme.palette.secondary.main
              : color === "secondary-light"
              ? theme.palette.secondary.light
              : color
          }
          iterations={iterations}
          padding={padding}
          show={show}
          type={type}
        >
          {text}
        </RoughNotation>
      </span>
    </NoSsr>
  );
}
