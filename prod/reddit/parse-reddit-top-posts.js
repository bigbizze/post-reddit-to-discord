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
const response_types_1 = require("./response_types");
const node_fetch_1 = __importDefault(require("node-fetch"));
const date_fns_1 = require("date-fns");
function getRedditPosts(subreddit, num_posts = 20, only_top_posts = true) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = only_top_posts ? `https://reddit.com/r/${subreddit}/top/.json?count=${num_posts}` : `https://reddit.com/r/${subreddit}.json?count=${num_posts}`;
        try {
            const res = yield node_fetch_1.default(url, {
                method: "GET"
            });
            if (res.status === 200) {
                const json_string = (yield res.buffer()).toString("utf-8");
                return response_types_1.ParseRedditResponse.toTypedObject(json_string);
            }
        }
        catch (e) {
            console.log(e);
        }
    });
}
function parseTopRedditPosts({ num_days, subreddit, num_posts, min_karma, only_top_posts }) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield getRedditPosts(subreddit, num_posts, only_top_posts);
            if (((_a = data === null || data === void 0 ? void 0 : data.data) === null || _a === void 0 ? void 0 : _a.children) == null || data.data.children.length < 1) {
                return;
            }
            const startOfDay = date_fns_1.startOfToday();
            const is_after_this = date_fns_1.subDays(startOfDay, num_days);
            return data.data.children
                .filter(post => (post.data.score > min_karma
                && post.data.post_hint === "image"
                && date_fns_1.isAfter(new Date(post.data.created * 1000), is_after_this)))
                .map((post) => ({
                title: post.data.title,
                img_url: post.data.url,
                reddit_url: `https://old.reddit.com${post.data.permalink}`,
                author: post.data.author,
                num_comments: post.data.num_comments,
                created_on: new Date(post.data.created_utc * 1000).toDateString(),
                upvotes: post.data.score
            }));
        }
        catch (e) {
            console.log(e);
            return;
        }
    });
}
exports.default = parseTopRedditPosts;
