import axios from 'axios';

export const fetchRedditPosts = async () => {
  try {
    const response = await axios.get(
      'https://www.reddit.com/r/programming/top.json?limit=10'
    );

    return response.data.data.children.map((post) => ({
      source: 'reddit',
      sourceId: post.data.id,
      content: post.data.title,
      author: post.data.author,
      url: `https://reddit.com${post.data.permalink}`,
      metadata: {
        upvotes: post.data.ups,
        comments: post.data.num_comments,
      },
    }));
  } catch (error) {
    console.error('Error fetching Reddit posts:', error.message);
    return []; // Return empty array on error
  }
};