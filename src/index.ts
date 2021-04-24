import { Telegraf } from "telegraf";

import { config } from "./config";
import { logger } from "./logging";
import { ILTALEHTI_ARTICLE } from "./iltalehti/regexp";
import { getTopComments } from "./iltalehti/comments";
import { formatComments } from "./format";

function start() {
  const bot = new Telegraf(config.TELEGRAM_BOT_TOKEN);

  bot.catch((err, ctx) => {
    logger.error(`Encountered an unexpected error for ${ctx.updateType}`, err);
  });

  bot.hears(ILTALEHTI_ARTICLE, async (ctx) => {
    logger.info("Fetching comments for received Iltalehti link");
    logger.debug(`Received ${ctx.match.length} link(s): ${ctx.match}`);

    const comments = await getTopComments(ctx.match as string[]);

    if (comments.length === 0) {
      logger.info("No comments found for Iltalehti link");
      return;
    }

    logger.info(`Found ${comments.length} comment(s) for message`);

    const reply = formatComments(comments);

    ctx.reply(reply, {
      parse_mode: "MarkdownV2",
    });
  });

  bot.launch();

  return bot;
}

function stop(signal: string, bot: Telegraf) {
  logger.info(`Received ${signal}, stopping server`);
  bot.stop();
}

if (require.main === module) {
  logger.info("Starting bot, long-polling for new messages");
  const bot = start();

  process.on("SIGTERM", () => stop("SIGTERM", bot));
  process.on("SIGINT", () => stop("SIGINT", bot));
}
