import axios from 'axios';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const { profile_id } = getQuery(event);
  const { comment } = getQuery(event);
  const { token } = getQuery(event);

  try {
    const response = await axios.post(`${config.apiUrl}/c/store`,{
        comment,
        auth_token: token,
        profile_id
      });
    const commentsResponse = response.data;
    return {
        commentsResponse: commentsResponse,
    };  
  } catch (error) {
    console.error(error);
  }
});

