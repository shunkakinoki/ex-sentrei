import Profile from "@sentrei/types/models/Profile";
import User from "@sentrei/types/models/User";

export default interface GlobalState {
  profile: Profile.Get | null;
  user: User.Get | null | undefined;
  setProfile: React.Dispatch<React.SetStateAction<Profile.Get | null>>;
  setUser: React.Dispatch<React.SetStateAction<User.Get | null | undefined>>;
}
