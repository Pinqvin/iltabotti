import { Comment } from "./types";

// We need to escape these values for the Telegram markdown format
const FORBIDDEN_CHARACTERS = /[_*'\[\]()~`>#+\-=|{}.!]/g;

// Replace value by prepending the matched string with '\'
const REPLACE_VALUE = "\\$&";

const COMMENTER_EMOJIS = ["👨", "👩", "👷", "👩‍🔧"];

export function formatComments(comments: Comment[]): string {
  return comments
    .map(
      (comment) => `${comment.content.replace(
        FORBIDDEN_CHARACTERS,
        REPLACE_VALUE
      )}
${
  COMMENTER_EMOJIS[Math.floor(Math.random() * COMMENTER_EMOJIS.length)]
} _${comment.username.replace(FORBIDDEN_CHARACTERS, REPLACE_VALUE)}_`
    )
    .join("\n");
}
