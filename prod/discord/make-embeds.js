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
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
function makeEmbed(post, subreddit) {
    return __awaiter(this, void 0, void 0, function* () {
        return new discord_js_1.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(post.title)
            .setURL(post.img_url)
            .setAuthor(post.author)
            .addFields({ name: 'Subreddit', value: `${subreddit}` }, { name: 'Upvotes', value: `${post.upvotes}` }, { name: 'Created On', value: `${post.created_on}` }, { name: 'Comments', value: `[click here](${post.reddit_url})`, inline: true })
            .setImage(post.img_url);
    });
}
function makeEmbeds(posts, subreddit) {
    return __awaiter(this, void 0, void 0, function* () {
        return Promise.all(posts.map((post) => __awaiter(this, void 0, void 0, function* () { return yield makeEmbed(post, subreddit); })));
    });
}
exports.default = makeEmbeds;
