import commandLineArgs from "command-line-args";
export type TopType = "day" | "week" | "month" | "all";
export type StandardType = "new" | "controversial" | "rising" | "default";

export interface ProcessArgs  {
    subreddit: string
    count: number
    min_karma: number
    age: number
    webhook: null | string
    type: TopType | StandardType
    num_embeds: number
}

const optionDefinitions = [
    { name: 'subreddit', alias: 's', type: String },
    { name: 'type', alias: 't', type: String },
    { name: 'min_karma', alias: 'k', type: Number },
    { name: 'num_embeds', alias: 'e', type: Number },
    { name: 'age', alias: 'a', type: Number },
    { name: 'webhook', alias: 'w', type: String },
    { name: 'count', type: Number },
]

export default function processArgs (): ProcessArgs {
    return ({
        ...{
            subreddit: "programmerhumor",
            count: 20,
            min_karma: 7000,
            age: 0,
            num_embeds: 5,
            webhook: null,
            type: "day"
        },
        ...commandLineArgs(optionDefinitions)
    });
};
