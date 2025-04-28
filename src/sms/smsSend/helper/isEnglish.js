import { franc } from "franc";
import langs from "langs";

function isAscii(text) {
  return /^[\x00-\x7F]*$/.test(text);
}

export function isEnglish(text) {
  if (!isAscii(text)) return false;

  if (text.length < 954) return true;

  const langCode = franc(text);
  if (langCode === "und") return false;

  const language = langs.where("3", langCode);
  console.log(language);
  return language?.name === "English";
}
