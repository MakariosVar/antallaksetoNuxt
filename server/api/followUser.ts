import axios from 'axios';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const { id } = getQuery(event);
  const { token } = getQuery(event);

  try {
    const response = await axios.get(`${config.apiUrl}/follow/${id}/${token}`);
    const followResponse = response.data;
    return {
        followResponse: followResponse,
    };
  } catch (error) {
    console.error(error);
  }
});
