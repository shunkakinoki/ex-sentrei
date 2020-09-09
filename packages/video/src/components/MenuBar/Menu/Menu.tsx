import IconButton from "@material-ui/core/IconButton";
import MenuContainer from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreIcon from "@material-ui/icons/MoreVert";
import React, {useState, useRef, useCallback} from "react";

import AboutDialog from "@sentrei/video/components/MenuBar/AboutDialog";
import SettingsDialog from "@sentrei/video/components/MenuBar/SettingsDialog";
import UserAvatar from "@sentrei/video/components/MenuBar/UserAvatar";
import useVideoContext from "@sentrei/video/hooks/useVideoContext";
import {useAppState} from "@sentrei/video/state";

export default function Menu(): JSX.Element {
  const {user, signOut} = useAppState();
  const {room, localTracks} = useVideoContext();

  const [aboutOpen, setAboutOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const anchorRef = useRef<HTMLDivElement>(null);

  const handleSignOut = useCallback(() => {
    room.disconnect?.();
    localTracks.forEach(track => track.stop());
    signOut?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room.disconnect, localTracks, signOut]);

  return (
    <div ref={anchorRef}>
      <IconButton
        color="inherit"
        onClick={(): void => setMenuOpen(state => !state)}
      >
        {user ? <UserAvatar user={user} /> : <MoreIcon />}
      </IconButton>
      <MenuContainer
        open={menuOpen}
        onClose={(): void => setMenuOpen(state => !state)}
        anchorEl={anchorRef.current}
      >
        {user?.displayName && <MenuItem disabled>{user.displayName}</MenuItem>}
        <MenuItem onClick={(): void => setAboutOpen(true)}>About</MenuItem>
        <MenuItem onClick={(): void => setSettingsOpen(true)}>
          Settings
        </MenuItem>
        {user && <MenuItem onClick={handleSignOut}>Logout</MenuItem>}
      </MenuContainer>
      <AboutDialog
        open={aboutOpen}
        onClose={(): void => {
          setAboutOpen(false);
          setMenuOpen(false);
        }}
      />
      <SettingsDialog
        open={settingsOpen}
        onClose={(): void => {
          setSettingsOpen(false);
          setMenuOpen(false);
        }}
      />
    </div>
  );
}
