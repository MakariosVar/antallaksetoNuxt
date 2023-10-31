import axios from 'axios';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const { id } = getQuery(event);

  try {
    const response = await axios.get(`${config.apiUrl}/vue/getcomments/${id}`);
    const commentsResponse = response.data;
    return {
        commentsResponse: commentsResponse,
    };
  } catch (error) {
    console.error(error);
  }
});

