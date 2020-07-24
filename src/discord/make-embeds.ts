import { RedditReturn } from '../reddit/parse-reddit-top-posts';
import { MessageEmbed } from 'discord.js';

async function makeEmbed(post: RedditReturn): Promise<MessageEmbed> {
	return new MessageEmbed()
		.setColor('#0099ff')
		.setTitle(post.title)
		.setURL(post.img_url)
		.setAuthor(post.author)
		.addFields(
			{ name: 'Upvotes', value: `${post.upvotes}` },
			{ name: 'Created On', value: `${post.created_on}` },
			{ name: 'Comments', value: `[click here](${post.reddit_url})`, inline: true }
		)
		.setImage(post.img_url);
}
export default async function makeEmbeds(posts: RedditReturn[]): Promise<MessageEmbed[]> {
	return Promise.all(posts.map(async post => await makeEmbed(post)));
}



