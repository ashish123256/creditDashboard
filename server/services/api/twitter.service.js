import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const TWITTER_BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN;

export const fetchTwitterPosts = async () => {
  try {
    
    const response = await axios.get(
      'https://api.twitter.com/2/tweets/search/recent?query=from:twitterdev',
      {
        headers: {
          Authorization: `Bearer ${TWITTER_BEARER_TOKEN}`,
        },
      }
    );

    return response.data.data.map((tweet) => ({
      source: 'twitter',
      sourceId: tweet.id,
      content: tweet.text,
      author: 'Twitter Dev',
      url: `https://twitter.com/twitterdev/status/${tweet.id}`,
      metadata: {
        likes: 0, // Not available in basic v2 API
        retweets: 0, // Not available in basic v2 API
      },
    }));
  } catch (error) {
    console.error('Error fetching Twitter posts:', error.message);
    return []; // Return empty array on error
  }
};