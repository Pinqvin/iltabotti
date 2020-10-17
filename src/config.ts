import envalid, { str } from "envalid";

export const config = envalid.cleanEnv(process.env, {
  TELEGRAM_BOT_TOKEN: str({
    desc: "Telegram bot token used to authenticate communication with Telegram",
  }),
});
