import axios from 'axios';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const { token } = getQuery(event);

  try {
    
    const response = await axios.get(`${config.apiUrl}/getmessages/${token}`);

    return {
        response: response.data,
    };
  } catch (error) {
    console.error(error);
  }
});
