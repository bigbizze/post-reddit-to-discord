"use strict";
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
const webhook_1 = __importDefault(require("./discord/webhook"));
const parse_reddit_top_posts_1 = __importDefault(require("./reddit/parse-reddit-top-posts"));
const make_embeds_1 = __importDefault(require("./discord/make-embeds"));
function getItems(args) {
    return __awaiter(this, void 0, void 0, function* () {
        const reddit_posts = yield parse_reddit_top_posts_1.default(args);
        if (reddit_posts == null || (args === null || args === void 0 ? void 0 : args.webhook_url) == null) {
            return;
        }
        const webhook = yield webhook_1.default(args.webhook_url);
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
        const embeds = yield make_embeds_1.default(reddit_posts);
        for (let i = 0; i < embeds.length; i++) {
            yield webhook.send(embeds[i]);
        }
    });
}
exports.default = postEmbedsFromRedditPosts;
