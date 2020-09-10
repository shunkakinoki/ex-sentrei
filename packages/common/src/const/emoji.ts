const userEmojiArray = [":joy:", ":hushed:", ":neutral_face:"];

export const userEmoji = (): string => {
  const userRandomIndex = Math.floor(Math.random() * userEmojiArray.length);
  return userEmojiArray[userRandomIndex];
};

const roomEmojiArray = [":sushi:", ":ice_cream:", ":ramen:"];

export const roomEmoji = (): string => {
  const roomRandomIndex = Math.floor(Math.random() * roomEmojiArray.length);
  return roomEmojiArray[roomRandomIndex];
};
