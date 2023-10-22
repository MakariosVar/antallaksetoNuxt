import axios from 'axios';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const { token } = getQuery(event);

  try {
    
    const response = await axios.get(`${config.public.apiUrl}/vue/toverificate/${token}`);
    const post = response.data;

    return {
      post: post,
    };
  } catch (error) {
    console.error(error);
  }
});
