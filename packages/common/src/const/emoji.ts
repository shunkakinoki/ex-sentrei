const userEmojiArray = [":joy:", ":hushed:", ":neutral_face:"];

const userRandomIndex = Math.floor(Math.random() * userEmojiArray.length);
export const userEmoji = userEmojiArray[userRandomIndex];

const roomEmojiArray = [":sushi:", ":ice_cream:", ":ramen:"];

const roomRandomIndex = Math.floor(Math.random() * roomEmojiArray.length);
export const roomEmoji = roomEmojiArray[roomRandomIndex];
