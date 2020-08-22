import Member from "@sentrei/types/models/Member";
import Profile from "@sentrei/types/models/Profile";

export default interface Status {
  profile: Profile.Get;
  status: Member.Status;
}
