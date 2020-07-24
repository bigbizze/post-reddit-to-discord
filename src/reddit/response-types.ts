// To parse this data:
//
//   import { Convert, RedditResponse } from "./file";
//
//   const welcome = Convert.toWelcome(json);

export interface RedditResponse {
	kind: string;
	data: ResponseData;
}

export interface ResponseData {
	modhash:  string;
	dist:     number;
	children: Child[];
	after:    string | null;
	before:   null | string;
}

export interface Child {
	kind: Kind;
	data: ChildData;
}

export interface ChildData {
	approved_at_utc:               null | number;
	subreddit:                     Subreddit;
	selftext:                      string;
	author_fullname:               string;
	saved:                         boolean;
	mod_reason_title:              null | string;
	gilded:                        number;
	clicked:                       boolean;
	title:                         string;
	link_flair_richtext:           LinkFlairRichtext[];
	subreddit_name_prefixed:       SubredditNamePrefixed;
	hidden:                        boolean;
	pwls:                          number;
	link_flair_css_class:          LinkFlairCSSClass | null;
	downs:                         number;
	thumbnail_height:              number | null;
	top_awarded_type:              any;
	hide_score:                    boolean;
	name:                          string;
	quarantine:                    boolean;
	link_flair_text_color:         FlairTextColor;
	upvote_ratio:                  number;
	author_flair_background_color: AuthorFlairBackgroundColor | null;
	subreddit_type:                SubredditType;
	ups:                           number;
	total_awards_received:         number;
	media_embed:                   Gildings;
	thumbnail_width:               number | null;
	author_flair_template_id:      null | string;
	is_original_content:           boolean;
	user_reports:                  any[];
	secure_media:                  Media | null;
	is_reddit_media_domain:        boolean;
	is_meta:                       boolean;
	category:                      any;
	secure_media_embed:            Gildings;
	link_flair_text:               LinkFlairText | null;
	can_mod_post:                  boolean;
	score:                         number;
	approved_by:                   any;
	author_premium:                boolean;
	thumbnail:                     string;
	author_cakeday?:               boolean;
	edited:                        boolean;
	author_flair_css_class:        any;
	author_flair_richtext:         AuthorFlairRichtext[];
	gildings:                      Gildings;
	post_hint?:                    PostHint;
	content_categories:            any;
	is_self:                       boolean;
	mod_note:                      any;
	created:                       number;
	link_flair_type:               AuthorFlairType;
	wls:                           number;
	removed_by_category:           any;
	banned_by:                     any;
	author_flair_type:             AuthorFlairType;
	domain:                        Domain;
	allow_live_comments:           boolean;
	selftext_html:                 null | string;
	likes:                         boolean | null;
	suggested_sort:                any;
	banned_at_utc:                 any;
	url_overridden_by_dest?:       string;
	view_count:                   null | number;
	archived:                      boolean;
	no_follow:                     boolean;
	is_crosspostable:              boolean;
	pinned:                        boolean;
	over_18:                       boolean;
	preview?:                      Preview;
	all_awardings:                 any[];
	awarders:                      any[];
	media_only:                    boolean;
	link_flair_template_id?:       string;
	can_gild:                      boolean;
	spoiler:                       boolean;
	locked:                        boolean;
	author_flair_text:             null | string;
	treatment_tags:                any[];
	visited:                       boolean;
	removed_by:                    any;
	num_reports:                   any;
	distinguished:                 any;
	subreddit_id:                  SubredditID;
	mod_reason_by:                 any;
	removal_reason:                any;
	link_flair_background_color:   string;
	id:                            string;
	is_robot_indexable:            boolean;
	report_reasons:                null;
	author:                        string;
	discussion_type:               null;
	num_comments:                  number;
	send_replies:                  boolean;
	whitelist_status:              WhitelistStatus;
	contest_mode:                  boolean;
	mod_reports:                   any[];
	author_patreon_flair:          boolean;
	author_flair_text_color:       FlairTextColor | null;
	permalink:                     string;
	parent_whitelist_status:       WhitelistStatus;
	stickied:                      boolean;
	url:                           string;
	subreddit_subscribers:         number;
	created_utc:                   number;
	num_crossposts:                number;
	media:                         Media | null;
	is_video:                      boolean;
	rte_mode?:                     string;
}

export enum AuthorFlairBackgroundColor {
	Empty = "",
	Transparent = "transparent"
}

export interface AuthorFlairRichtext {
	a: string;
	e: E;
	u: string;
}

export enum E {
	Emoji = "emoji"
}

export enum FlairTextColor {
	Dark = "dark"
}

export enum AuthorFlairType {
	Richtext = "richtext",
	Text = "text"
}

export enum Domain {
	IImgurCOM = "i.imgur.com",
	IReddIt = "i.redd.it",
	ImgurCOM = "imgur.com",
	SelfProgrammerHumor = "self.ProgrammerHumor",
	VReddIt = "v.redd.it"
}

export interface Gildings {
}

export enum LinkFlairCSSClass {
	Empty = "",
	Meme = "meme",
	UI = "ui"
}

export interface LinkFlairRichtext {
	e: AuthorFlairType;
	t: LinkFlairText;
}

export enum LinkFlairText {
	BadUI = "(Bad) UI",
	Meme = "Meme",
	Other = "other"
}

export interface Media {
	reddit_video: RedditVideo;
}

export interface RedditVideo {
	fallback_url:       string;
	height:             number;
	width:              number;
	scrubber_media_url: string;
	dash_url:           string;
	duration:           number;
	hls_url:            string;
	is_gif:             boolean;
	transcoding_status: string;
}

export enum WhitelistStatus {
	AllAds = "all_ads"
}

export enum PostHint {
	HostedVideo = "hosted:video",
	Image = "image",
	Link = "link"
}

export interface Preview {
	images:  Image[];
	enabled: boolean;
}

export interface Image {
	source:      Source;
	resolutions: Source[];
	variants:    Variants;
	id:          string;
}

export interface Source {
	url:    string;
	width:  number;
	height: number;
}

export interface Variants {
	gif?: GIF;
	mp4?: GIF;
}

export interface GIF {
	source:      Source;
	resolutions: Source[];
}

export enum Subreddit {
	ProgrammerHumor = "ProgrammerHumor"
}

export enum SubredditID {
	T52Tex6 = "t5_2tex6"
}

export enum SubredditNamePrefixed {
	RProgrammerHumor = "r/ProgrammerHumor"
}

export enum SubredditType {
	Public = "public"
}

export enum Kind {
	T3 = "t3"
}

// Converts JSON strings to/from your types
export class ParseRedditResponse {
	public static toTypedObject(json: string): RedditResponse {
		return JSON.parse(json);
	}

	public static welcomeToJson(value: RedditResponse): string {
		return JSON.stringify(value);
	}
}
