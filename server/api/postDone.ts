import axios from 'axios';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const { id } = getQuery(event);
  const { auth_token } = getQuery(event);

  try {
    const response = await axios.get(`${config.public.apiUrl}/postDone/${id}/${auth_token}`);
    const doneResponse = response.data;
    return {
        doneResponse: doneResponse,
    };
  } catch (error) {
    console.error(error);
  }
});
