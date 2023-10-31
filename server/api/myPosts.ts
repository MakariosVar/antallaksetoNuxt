import axios from 'axios';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const { user_id } = getQuery(event);

  try {
    const response = await axios.get(`${config.apiUrl}/vue/myposts/${user_id}`);
    const postsData = response.data;

    return {
        postsResponse: postsData,
    };
  } catch (error) {
    console.error(error);
  }
});
