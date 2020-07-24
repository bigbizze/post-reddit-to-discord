import * as process from 'process';
import postEmbedsFromRedditPosts from "./bot-client";
import process_args from "./process_args";
async function app() {
    const args = process_args();
    await postEmbedsFromRedditPosts(args);
    process.exit(0);
}

try {
    app().then();
} catch (e) {
    console.log(e);
}
