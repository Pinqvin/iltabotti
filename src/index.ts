import Telegraf from "telegraf";
import { TelegrafContext } from "telegraf/typings/context";

import { config } from "./config";
import { logger } from "./logging";

function start() {
  const bot = new Telegraf(config.TELEGRAM_BOT_TOKEN);

  bot.launch();

  return bot;
}

function stop(signal: string, bot: Telegraf<TelegrafContext>) {
  logger.info(`Received ${signal}, stopping server`);
  bot.stop();
}

if (require.main === module) {
  const bot = start();

  process.on("SIGTERM", () => stop("SIGTERM", bot));
  process.on("SIGINT", () => stop("SIGINT", bot));
}
