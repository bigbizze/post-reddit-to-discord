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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const process = __importStar(require("process"));
const process_args_1 = __importDefault(require("./process-args"));
const parse_reddit_posts_1 = __importDefault(require("./reddit/parse-reddit-posts"));
const webhook_1 = __importDefault(require("./discord/webhook"));
const make_embeds_1 = __importDefault(require("./discord/make-embeds"));
function getItems(args) {
    return __awaiter(this, void 0, void 0, function* () {
        const reddit_posts = yield parse_reddit_posts_1.default(args);
        if (reddit_posts == null || (args === null || args === void 0 ? void 0 : args.webhook) == null) {
            return;
        }
        const webhook = yield webhook_1.default(args.webhook);
        if (webhook == null) {
            return;
        }
        return {
            reddit_posts,
            webhook
        };
    });
}
function postEmbedsFromRedditPosts(args) {
    return __awaiter(this, void 0, void 0, function* () {
        const bot_items = yield getItems(args);
        if (bot_items == null) {
            return;
        }
        const { webhook, reddit_posts } = bot_items;
        const embeds = yield make_embeds_1.default(reddit_posts, args.subreddit);
        for (let i = 0; i < embeds.length; i++) {
            yield webhook.send(embeds[i]);
        }
    });
}
function discord_reddit_post_embed_bot(args) {
    return __awaiter(this, void 0, void 0, function* () {
        return postEmbedsFromRedditPosts(args);
    });
}
exports.default = discord_reddit_post_embed_bot;

//////////////////////////////////////////////////////////////////////////////////
if (require.main === module) {
    const args = process_args_1.default();
    discord_reddit_post_embed_bot(args)
        .then(() => process.exit(0))
        .catch(err => console.log(err));
}
