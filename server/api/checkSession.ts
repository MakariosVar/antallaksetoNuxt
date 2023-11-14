import axios from 'axios';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const { token } = getQuery(event);

  try {
    const response = await axios.get(`${config.apiUrl}/checkSession/${token}`);
    const sessionResponse = response.data;
    return {
        sessionResponse: sessionResponse,
    };
  } catch (error) {
    console.error(error);
  }
});
