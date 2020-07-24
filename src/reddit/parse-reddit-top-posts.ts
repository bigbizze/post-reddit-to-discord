import { ParseRedditResponse, RedditResponse } from './response_types';
import fetch from 'node-fetch';
import { subDays, isAfter, startOfToday } from 'date-fns';
import { ProcessArgs } from "../process_args";

async function getRedditPosts(subreddit: string, num_posts: number = 20, only_top_posts: boolean = true): Promise<RedditResponse | undefined> {
	const url = only_top_posts ? `https://reddit.com/r/${subreddit}/top/.json?count=${num_posts}` : `https://reddit.com/r/${subreddit}.json?count=${num_posts}`;
	try {
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

export default async function parseTopRedditPosts({ num_days, subreddit, num_posts, min_karma, only_top_posts }: ProcessArgs): Promise<RedditReturn[] | undefined> {
	try {
		const data = await getRedditPosts(subreddit, num_posts, only_top_posts);
		if (data?.data?.children == null || data.data.children.length < 1) {
			return;
		}
		const startOfDay = startOfToday();
		const is_after_this = subDays(startOfDay, num_days);
		return data.data.children
				   .filter(post => (
					   post.data.score > min_karma
					   && post.data.post_hint === "image"
					   && isAfter(new Date(post.data.created * 1000), is_after_this)
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
