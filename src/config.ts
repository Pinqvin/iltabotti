import envalid, { str, url } from "envalid";

export const config = envalid.cleanEnv(process.env, {
  LOGGING_LEVEL: str({
    choices: ["fatal", "error", "warn", "info", "debug", "trace", "silent"],
    default: "info",
    desc: "Logging level. Defaults to 'info'",
  }),
  TELEGRAM_BOT_TOKEN: str({
    desc: "Telegram bot token used to authenticate communication with Telegram",
  }),
  ILTALEHTI_COMMENTS_GRAPHQL_API: url({
    desc: "Iltalehti comments GraphQL API URL",
    default: "https://keskustelu.iltalehti.fi/api",
  }),
});
