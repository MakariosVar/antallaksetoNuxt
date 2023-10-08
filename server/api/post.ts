import axios from 'axios';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const { id } = getQuery(event);

  try {
    
    const response = await axios.get(`${config.public.apiUrl}/vue/post/${id}`);
    const post = response.data;

    return {
      post: post,
    };
  } catch (error) {
    console.error(error);
  }
});
