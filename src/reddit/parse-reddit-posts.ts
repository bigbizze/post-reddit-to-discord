import { ParseRedditResponse, RedditResponse } from './response-types';
import fetch from 'node-fetch';
import { subDays, isAfter, startOfToday } from 'date-fns';
import { ProcessArgs, StandardType, TopType } from "../process-args";

const topTypes = ["day", "week", "month", "all"];

const isTopType = (type: TopType | StandardType): type is TopType =>
	topTypes.includes(type);

const getTopTypeUrl = (subreddit: string, top_type: "day" | "week" | "month" | "all", num_posts: number) =>
	`https://reddit.com/r/${subreddit}/top/.json?sort=top&t=${top_type}&count=${num_posts}`;

const getNormalTypeUrl = (subreddit: string, type: "new" | "controversial" | "rising" | "default", num_posts: number) =>
	`https://reddit.com/r/${subreddit}/${type}/.json?count=${num_posts}`;

const getUrl = ({ type, subreddit, count }: ProcessArgs) =>
	isTopType(type)
		? getTopTypeUrl(subreddit, type, count)
		: getNormalTypeUrl(subreddit, type, count);

async function getRedditPosts(args: ProcessArgs): Promise<RedditResponse | undefined> {
	try {
		const url = getUrl(args);
		const res = await fetch(url, {
			method: "GET"
		});
		if (res.status === 200) {
			const json_string = (await res.buffer()).toString("utf-8");
			return ParseRedditResponse.toTypedObject(json_string);
		}
	} catch (e) {
		console.log(e);
	}
}

export interface RedditReturn {
	img_url: string;
	reddit_url: string;
	author: string;
	num_comments: number;
	created_on: string;
	title: string;
	upvotes: number;
}

export default async function parseTopRedditPosts(args: ProcessArgs): Promise<RedditReturn[] | undefined> {
	try {
		const { num_days, min_karma, num_embeds } = args;
		const data = await getRedditPosts(args);
		if (data?.data?.children == null || data.data.children.length < 1) {
			return;
		}
		const startOfDay = startOfToday();
		const is_after_this = subDays(startOfDay, num_days);
		return data.data.children
				   .filter((post, i) => (
					   post.data.score > min_karma
					   && post.data.post_hint === "image"
					   && isAfter(new Date(post.data.created * 1000), is_after_this)
					   && i < num_embeds
				   ))
				   .map((post): RedditReturn => ({
					   title: post.data.title,
					   img_url: post.data.url,
					   reddit_url: `https://old.reddit.com${post.data.permalink}`,
					   author: post.data.author,
					   num_comments: post.data.num_comments,
					   created_on: new Date(post.data.created_utc * 1000).toDateString(),
					   upvotes: post.data.score
				   }));
	} catch (e) {
		console.log(e);
		return;
	}
}
