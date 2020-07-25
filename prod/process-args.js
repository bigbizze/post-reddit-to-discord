"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_line_args_1 = __importDefault(require("command-line-args"));
const optionDefinitions = [
    { name: 'subreddit', alias: 's', type: String },
    { name: 'type', alias: 't', type: String },
    { name: 'min_karma', alias: 'k', type: Number },
    { name: 'num_embeds', alias: 'e', type: Number },
    { name: 'age', alias: 'a', type: Number },
    { name: 'webhook', alias: 'w', type: String },
    { name: 'count', type: Number },
];
function processArgs() {
    return (Object.assign({
        subreddit: "programmerhumor",
        count: 20,
        min_karma: 7000,
        age: 0,
        num_embeds: 5,
        webhook: null,
        type: "day"
    }, command_line_args_1.default(optionDefinitions)));
}
exports.default = processArgs;
;
