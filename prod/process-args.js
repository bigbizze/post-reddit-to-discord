"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const process = __importStar(require("process"));
const top_types = ["new", "controversial", "rising", "day", "week", "month", "year", "all"];
const processArgs = () => {
    const args = {
        subreddit: "programmerhumor",
        count: 20,
        min_karma: 10000,
        num_days: 0,
        num_embeds: 5,
        webhook: null,
        type: "day"
    };
    try {
        let currentArg = null;
        for (let arg of process.argv) {
            if (arg.startsWith("--")) {
                currentArg = arg.replace(/^--/, "");
            }
            else if (currentArg != null) {
                if (currentArg === "count" || currentArg === "num_days" || currentArg === "num_embeds" || currentArg === "min_karma") {
                    args[currentArg] = Number(arg);
                }
                else {
                    if (currentArg === "sorting_type" && !top_types.includes(arg)) {
                        console.log("incorrect sorting type supplied! 'day' selected instead");
                        currentArg = "day";
                    }
                    args[currentArg] = arg;
                }
                currentArg = null;
            }
        }
    }
    catch (e) {
        throw new Error("incorrectly entered arguments!");
    }
    return args;
};
exports.default = processArgs;
