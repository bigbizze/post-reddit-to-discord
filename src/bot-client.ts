import get_webhook from './discord/webhook';
import parseTopRedditPosts, { RedditReturn } from './reddit/parse-reddit-top-posts';
import makeEmbeds from './discord/make-embeds';
import { WebhookClient } from 'discord.js';
import { ProcessArgs } from "./process_args";

async function getItems(args: ProcessArgs): Promise<{ webhook: WebhookClient; reddit_posts: RedditReturn[] } | undefined> {
    const reddit_posts = await parseTopRedditPosts(args);
    if (reddit_posts == null || args?.webhook_url == null) {
        return;
    }
    const webhook = await get_webhook(args.webhook_url);
    if (webhook == null) {
        return;
    }
    return {
        reddit_posts,
        webhook
    };
}

export default async function postEmbedsFromRedditPosts(args: ProcessArgs) {
    const bot_items = await getItems(args);
    if (bot_items == null) {
        return;
    }
    const { webhook, reddit_posts } = bot_items;
    const embeds = await makeEmbeds(reddit_posts);
    for (let i = 0; i < embeds.length; i++) {
        await webhook.send(embeds[i]);
    }
}



