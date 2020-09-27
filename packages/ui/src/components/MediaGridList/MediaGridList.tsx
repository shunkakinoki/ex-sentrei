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
      <GridList cellHeight={300} className={classes.gridList} cols={3}>
        {data.map(media => (
          <GridListTile key={media.img} cols={media.cols || 1}>
            <img src={media.img} alt={media.title} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
