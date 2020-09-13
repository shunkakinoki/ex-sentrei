const memberEmojiArray = [":joy:", ":hushed:", ":neutral_face:"];

export const memberEmoji = (): string => {
  const memberRandomIndex = Math.floor(Math.random() * memberEmojiArray.length);
  return memberEmojiArray[memberRandomIndex];
};

const participantEmojiArray = [":hamster:", ":tiger:", ":whale:"];

export const participantEmoji = (): string => {
  const participantRandomIndex = Math.floor(
    Math.random() * memberEmojiArray.length,
  );
  return participantEmojiArray[participantRandomIndex];
};

const roomEmojiArray = [":sushi:", ":ice_cream:", ":ramen:"];

export const roomEmoji = (): string => {
  const roomRandomIndex = Math.floor(Math.random() * roomEmojiArray.length);
  return roomEmojiArray[roomRandomIndex];
};
