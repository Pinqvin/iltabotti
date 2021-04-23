import Telegraf from "telegraf";
import { TelegrafContext } from "telegraf/typings/context";

import { config } from "./config";
import { logger } from "./logging";
import { ILTALEHTI_ARTICLE } from "./iltalehti/regexp";
import { getTopComments } from "./iltalehti/comments";
import { formatComments } from "./format";

function start() {
  const bot = new Telegraf(config.TELEGRAM_BOT_TOKEN);

  bot.catch((err: Error, ctx: TelegrafContext) => {
    logger.error(`Encountered an unexpected error for ${ctx.updateType}`, err);
  });

  bot.hears(ILTALEHTI_ARTICLE, async (ctx) => {
    logger.info("Fetching comments for received Iltalehti link");
    logger.debug(`Received ${ctx.match?.length} link(s): ${ctx.match}`);

    const comments = await getTopComments(ctx.match as string[]);

    logger.info(`Found ${comments.length} comment(s) for message`);

    const reply = formatComments(comments);

    ctx.reply(reply, {
      reply_to_message_id: ctx.message?.message_id,
      parse_mode: "MarkdownV2",
    });
  });

  bot.launch();

  return bot;
}

function stop(signal: string, bot: Telegraf<TelegrafContext>) {
  logger.info(`Received ${signal}, stopping server`);
  bot.stop();
}

if (require.main === module) {
  logger.info("Starting bot, long-polling for new messages");
  const bot = start();

  process.on("SIGTERM", () => stop("SIGTERM", bot));
  process.on("SIGINT", () => stop("SIGINT", bot));
}
