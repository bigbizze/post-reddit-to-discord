"use strict";
// Generated
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseRedditResponse = exports.Kind = exports.SubredditType = exports.SubredditNamePrefixed = exports.SubredditID = exports.Subreddit = exports.PostHint = exports.WhitelistStatus = exports.LinkFlairText = exports.LinkFlairCSSClass = exports.Domain = exports.AuthorFlairType = exports.FlairTextColor = exports.E = exports.AuthorFlairBackgroundColor = void 0;
var AuthorFlairBackgroundColor;
(function (AuthorFlairBackgroundColor) {
    AuthorFlairBackgroundColor["Empty"] = "";
    AuthorFlairBackgroundColor["Transparent"] = "transparent";
})(AuthorFlairBackgroundColor = exports.AuthorFlairBackgroundColor || (exports.AuthorFlairBackgroundColor = {}));
var E;
(function (E) {
    E["Emoji"] = "emoji";
})(E = exports.E || (exports.E = {}));
var FlairTextColor;
(function (FlairTextColor) {
    FlairTextColor["Dark"] = "dark";
})(FlairTextColor = exports.FlairTextColor || (exports.FlairTextColor = {}));
var AuthorFlairType;
(function (AuthorFlairType) {
    AuthorFlairType["Richtext"] = "richtext";
    AuthorFlairType["Text"] = "text";
})(AuthorFlairType = exports.AuthorFlairType || (exports.AuthorFlairType = {}));
var Domain;
(function (Domain) {
    Domain["IImgurCOM"] = "i.imgur.com";
    Domain["IReddIt"] = "i.redd.it";
    Domain["ImgurCOM"] = "imgur.com";
    Domain["SelfProgrammerHumor"] = "self.ProgrammerHumor";
    Domain["VReddIt"] = "v.redd.it";
})(Domain = exports.Domain || (exports.Domain = {}));
var LinkFlairCSSClass;
(function (LinkFlairCSSClass) {
    LinkFlairCSSClass["Empty"] = "";
    LinkFlairCSSClass["Meme"] = "meme";
    LinkFlairCSSClass["UI"] = "ui";
})(LinkFlairCSSClass = exports.LinkFlairCSSClass || (exports.LinkFlairCSSClass = {}));
var LinkFlairText;
(function (LinkFlairText) {
    LinkFlairText["BadUI"] = "(Bad) UI";
    LinkFlairText["Meme"] = "Meme";
    LinkFlairText["Other"] = "other";
})(LinkFlairText = exports.LinkFlairText || (exports.LinkFlairText = {}));
var WhitelistStatus;
(function (WhitelistStatus) {
    WhitelistStatus["AllAds"] = "all_ads";
})(WhitelistStatus = exports.WhitelistStatus || (exports.WhitelistStatus = {}));
var PostHint;
(function (PostHint) {
    PostHint["HostedVideo"] = "hosted:video";
    PostHint["Image"] = "image";
    PostHint["Link"] = "link";
})(PostHint = exports.PostHint || (exports.PostHint = {}));
var Subreddit;
(function (Subreddit) {
    Subreddit["ProgrammerHumor"] = "ProgrammerHumor";
})(Subreddit = exports.Subreddit || (exports.Subreddit = {}));
var SubredditID;
(function (SubredditID) {
    SubredditID["T52Tex6"] = "t5_2tex6";
})(SubredditID = exports.SubredditID || (exports.SubredditID = {}));
var SubredditNamePrefixed;
(function (SubredditNamePrefixed) {
    SubredditNamePrefixed["RProgrammerHumor"] = "r/ProgrammerHumor";
})(SubredditNamePrefixed = exports.SubredditNamePrefixed || (exports.SubredditNamePrefixed = {}));
var SubredditType;
(function (SubredditType) {
    SubredditType["Public"] = "public";
})(SubredditType = exports.SubredditType || (exports.SubredditType = {}));
var Kind;
(function (Kind) {
    Kind["T3"] = "t3";
})(Kind = exports.Kind || (exports.Kind = {}));
// Converts JSON strings to/from your types
class ParseRedditResponse {
    static toTypedObject(json) {
        return JSON.parse(json);
    }
    static welcomeToJson(value) {
        return JSON.stringify(value);
    }
}
exports.ParseRedditResponse = ParseRedditResponse;
