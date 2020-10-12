import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
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
      <ImageList rowHeight={300} cols={3}>
        {data.map(media => (
          <ImageListItem key={media.title} cols={media.cols || 1}>
            {media.img}
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}
