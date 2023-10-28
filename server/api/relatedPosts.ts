import axios from 'axios';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const { id } = getQuery(event);

  try {
    const response = await axios.get(`${config.public.apiUrl}/p/related/${id}`);
    const posts = response.data;

    return {
        posts: posts,
    };
  } catch (error) {
    console.error(error);
  }
});
