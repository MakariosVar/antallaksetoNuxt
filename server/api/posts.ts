import axios from 'axios';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const { page } = getQuery(event);
  const { category } = getQuery(event);
  const { q } = getQuery(event);

  try {
    const response = await axios.get(`${config.apiUrl}/vue/posts?page=${page}&category=${category}&q=${q}`);
    const post_all = response.data;

    delete post_all.first_page_url;
    delete post_all.last_page_url;
    delete post_all.next_page_url;
    delete post_all.prev_page_url;
    delete post_all.path;

    return {
      posts_all: post_all,
    };
  } catch (error) {
    console.error(error);
  }
});
