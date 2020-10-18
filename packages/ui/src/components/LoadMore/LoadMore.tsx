import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import useTranslation from "next-locale/useTranslation";
import * as React from "react";

import {db} from "@sentrei/common/utils/firebase";
import {trackEvent} from "@sentrei/common/utils/segment";
import FormButtonSubmit from "@sentrei/ui/components/FormButtonSubmit";
import useSnackbar from "@sentrei/ui/hooks/useSnackbar";

import LoadMoreStyles from "./LoadMoreStyles";

type DocWithSnapshot<T> = T & {
  snap: firebase.firestore.DocumentSnapshot;
};

interface LoadMoreProps<T> {
  lastPath: string | firebase.firestore.DocumentSnapshot;
  length: number;
  limit: number;
  request: (
    lastItem: firebase.firestore.DocumentSnapshot,
  ) => Promise<DocWithSnapshot<T>[]>;
  onLoadMore: (items: DocWithSnapshot<T>[]) => void;
}

function LoadMore<T>({
  lastPath,
  length,
  limit,
  request,
  onLoadMore,
}: LoadMoreProps<T>): JSX.Element {
  const {t} = useTranslation();
  const {snackbar} = useSnackbar();
  const classes = LoadMoreStyles();

  const [loading, setLoading] = React.useState<boolean>(false);
  const [lastItem, setLastItem] = React.useState<
    firebase.firestore.DocumentSnapshot
  >();

  const shouldLoadMore = length > 0 && length % limit === 0;

  React.useEffect(() => {
    if (typeof lastPath !== "string") {
      setLastItem(lastPath);
      return;
    }
    db.doc(lastPath).get().then(setLastItem);
  }, [lastPath]);

  const loadMore = (): void => {
    if (!lastItem) return;
    setLoading(true);
    trackEvent("Load More");
    request(lastItem)
      .then(res => {
        const last = res[res.length - 1];
        setLoading(false);
        onLoadMore(res);
        setLastItem(last.snap);
      })
      .catch(err => snackbar("error", err.message));
  };

  return (
    <>
      {loading && (
        <div className={classes.progress}>
          <Box p={3}>
            <CircularProgress />
          </Box>
        </div>
      )}
      {shouldLoadMore && lastItem && (
        <FormButtonSubmit variant="outlined" onClick={loadMore}>
          {t("common:common.loadMore")}
        </FormButtonSubmit>
      )}
    </>
  );
}

export default LoadMore;
