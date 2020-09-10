const UserEmojiArray = [":joy:", ":hushed:", ":neutral_face:"];

const UserRandomIndex = Math.floor(Math.random() * UserEmojiArray.length);
export const UserEmoji = UserEmojiArray[UserRandomIndex];

const RoomEmojiArray = [":sushi:", ":ice_cream:", ":ramen:"];

const RoomRandomIndex = Math.floor(Math.random() * RoomEmojiArray.length);
export const RoomEmoji = RoomEmojiArray[RoomRandomIndex];
