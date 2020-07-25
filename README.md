# post-reddit-to-discord

Creates discord embedded messages using discord webhooks from image posts on reddit.

I wrote this in an hour or so and have not checked that every combination of settings works (but they should work as it's straightforward enough).

![Example posts](https://i.imgur.com/FRgoVHM.png)

Argument | Example | Functionality | Default | Is Required
------------ | ------------- | ------------- | ------------- | ------------- 
--webhook   | https://discordapp.com/api/webhooks/some_identifier | The discord webhook to use | null | Yes
--subreddit   | hockey | Specify which subreddit to create embeds from | programmerhumor | No
--count   | 15 | How many posts should be considered (this may be limited by reddit itself) | 20 | No
--min_karma   | 500 | The minimum karma cut-off for posts | 10000 | No
--age   | 2 | Maximum days in age for posts (0 is one day) | 0 | No
--type   | controversial | The type of posts to consider, valid answers are new, controversial, rising, day, "week, month, year, or all | day | No
--num_embeds | 15 | The total number of discord messages with embeds to create | 5 | No

```
node prod/discord-reddit-post-embed.js --subreddit programmerhumor --min_karma -5000 --num_embeds 2 --count 2 --num_days 0 --type controversial --webhook https://discordapp.com/api/webhooks/some_num/some_id
```

# NOTE: "num_posts" is the "count" argument for reddit, this is NOT the number of embeds that will be created.

If you want to run this not from the command line, you will have to create an object matching the type in "process-args.ts" or edit the values in the initial type there, and pass it to the "postEmbedsFromRedditPosts" function.
