import axios from 'axios';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const { email } = getQuery(event);

  try {
    const response = await axios.post(`${config.apiUrl}/reset-password`, {
        email: email
    });

    const resetResponse = response.data;
    return {
        resetResponse: resetResponse,
    };
  } catch (error) {
    console.error(error);
  }
});
