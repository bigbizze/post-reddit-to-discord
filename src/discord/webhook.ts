import { WebhookClient } from 'discord.js';
import fetch from 'node-fetch';

export interface WebhookResponse {
	type:       number;
	id:         string;
	name:       string;
	avatar:     null;
	channel_id: string;
	guild_id:   string;
	token:      string;
}

async function get_webhook_info(webhook_url: string): Promise<WebhookResponse | undefined> {
	try {
		const res = await fetch(webhook_url, {
			method: "GET"
		});
		if (res.status === 200) {
			const json_string = (await res.buffer()).toString("utf-8");
			return JSON.parse(json_string) as WebhookResponse;
		}
	} catch (e) {
		console.log(e);
		return;
	}
}

export default async function get_webhook(webhook_url: string): Promise<WebhookClient | undefined> {
	const webhook_info = await get_webhook_info(webhook_url);
	if (webhook_info == null) {
		return;
	}
	return new WebhookClient(webhook_info.id, webhook_info.token);
}
