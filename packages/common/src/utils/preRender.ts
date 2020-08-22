import {ServerResponse} from "http";

const preRender = (res?: ServerResponse): void => {
  if (res) {
    res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate");
  }
};

export default preRender;
