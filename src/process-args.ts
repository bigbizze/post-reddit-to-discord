import * as process from "process";

const top_types = ["new", "controversial", "rising", "day", "week", "month", "year", "all"];
export type TopType = "day" | "week" | "month" | "all";
export type StandardType = "new" | "controversial" | "rising" | "default";
export interface ProcessArgs  {
    subreddit: string
    count: number
    min_karma: number
    num_days: number
    webhook: null | string
    type: TopType | StandardType
    num_embeds: number
}
const processArgs = (): ProcessArgs => {
    const args: ProcessArgs = {
        subreddit: "programmerhumor",
        count: 20,
        min_karma: 10000,
        num_days: 0,
        num_embeds: 5,
        webhook: null,
        type: "day"
    }
    try {
        let currentArg: string | null = null;
        for (let arg of process.argv) {
            if (arg.startsWith("--")) {
                currentArg = arg.replace(/^--/, "");
            } else if (currentArg != null) {
                if (currentArg === "count" || currentArg === "num_days" || currentArg === "num_embeds" || currentArg === "min_karma") {
                    args[currentArg] = Number(arg);
                } else {
                    if (currentArg === "sorting_type" && !top_types.includes(arg)) {
                        console.log("incorrect sorting type supplied! 'day' selected instead");
                        currentArg = "day";
                    }
                    args[currentArg] = arg;
                }
                currentArg = null;
            }
        }
    } catch (e) {
        throw new Error("incorrectly entered arguments!")
    }
    return args;
};

export default processArgs;
