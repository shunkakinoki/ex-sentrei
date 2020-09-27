import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import * as React from "react";

import Media from "@sentrei/types/models/Media";

import MediaGridListStyles from "./MediaGridListStyles";

export interface Props {
  data: Media[];
}

export default function MediaGridList({data}: Props): JSX.Element {
  const classes = MediaGridListStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight={300} cols={3}>
        {data.map(media => (
          <GridListTile key={media.title} cols={media.cols || 1}>
            {media.img}
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
