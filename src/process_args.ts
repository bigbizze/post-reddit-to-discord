import * as process from "process";

type Indexer = {[key: string]: any};
export interface ProcessArgs extends Indexer {
    subreddit: string
    num_posts: number
    min_karma: number
    num_days: number
    webhook_url: null | string
    only_top_posts: boolean
}
const process_args = (): ProcessArgs => {
    const args: ProcessArgs = {
        subreddit: "programmerhumor",
        num_posts: 20,
        min_karma: 10000,
        num_days: 0,
        webhook_url: null,
        only_top_posts: false
    }
    try {
        let currentArg: string | null = null;
        for (let arg of process.argv) {
            if (arg.startsWith("--")) {
                const parsed_arg = arg.replace(/^--/, "");
                if (parsed_arg === "only_top_posts") {
                    args.only_top_posts = true;
                    currentArg = null;
                } else {
                    currentArg = parsed_arg;
                }
            } else if (currentArg != null) {
                if (currentArg !== "num_posts" && currentArg !== "num_days" && currentArg !== "min_karma") {
                    args[currentArg] = arg;
                } else {
                    args[currentArg] = Number(arg);
                }
                currentArg = null;
            }
        }
    } catch (e) {
        throw new Error("incorrectly entered arguments!")
    }
    return args;
};

export default process_args;
