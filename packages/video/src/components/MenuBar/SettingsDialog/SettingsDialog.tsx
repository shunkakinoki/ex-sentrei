import {
  Button,
  Dialog,
  DialogActions,
  Tab,
  Tabs,
  Theme,
} from "@material-ui/core";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import React, {useState} from "react";

import ConnectionOptions from "@sentrei/video/components/MenuBar/ConnectionOptions";
import DeviceSelector from "@sentrei/video/components/MenuBar/DeviceSelector";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: "525px",
      minHeight: "400px",
      [theme.breakpoints.down("xs")]: {
        width: "calc(100vw - 32px)",
      },
      "& .inputSelect": {
        width: "calc(100% - 35px)",
      },
    },
    button: {
      float: "right",
    },
    paper: {
      [theme.breakpoints.down("xs")]: {
        margin: "16px",
      },
    },
  }),
);

export default function SettingsDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}): JSX.Element {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (_: React.ChangeEvent<{}>, newValue: number): void => {
    setSelectedTab(newValue);
  };

  return (
    <Dialog open={open} onClose={onClose} classes={{paper: classes.paper}}>
      <Tabs value={selectedTab} onChange={handleChange}>
        <Tab label="Devices" />
        <Tab label="Settings" />
      </Tabs>
      <DeviceSelector
        className={classes.container}
        hidden={selectedTab !== 0}
      />
      <ConnectionOptions
        className={classes.container}
        hidden={selectedTab !== 1}
      />
      <DialogActions>
        <Button className={classes.button} onClick={onClose}>
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
}
