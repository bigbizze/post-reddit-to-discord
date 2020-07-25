import * as process from 'process';
import processArgs, { ProcessArgs } from "./process-args";
import { WebhookClient } from "discord.js";
import parseTopRedditPosts, { RedditReturn } from "./reddit/parse-reddit-posts";
import get_webhook from "./discord/webhook";
import makeEmbeds from "./discord/make-embeds";

async function getItems(args: ProcessArgs): Promise<{ webhook: WebhookClient; reddit_posts: RedditReturn[] } | undefined> {
    const reddit_posts = await parseTopRedditPosts(args);
    if (reddit_posts == null || args?.webhook == null) {
        return;
    }
    const webhook = await get_webhook(args.webhook);
    if (webhook == null) {
        return;
    }
    return {
        reddit_posts,
        webhook
    };
}

async function postEmbedsFromRedditPosts(args: ProcessArgs) {
    const bot_items = await getItems(args);
    if (bot_items == null) {
        return;
    }
    const { webhook, reddit_posts } = bot_items;
    const embeds = await makeEmbeds(reddit_posts, args.subreddit);
    for (let i = 0; i < embeds.length; i++) {
        await webhook.send(embeds[i]);
    }
}

export default async function discord_reddit_post_embed_bot(args: ProcessArgs) {
    return postEmbedsFromRedditPosts(args);
}


//////////////////////////////////////////////////////////////////////////////////


if (require.main === module) {
    const args: ProcessArgs = processArgs();
    discord_reddit_post_embed_bot(args)
        .then(() => process.exit(0))
        .catch(err => console.log(err));
}
