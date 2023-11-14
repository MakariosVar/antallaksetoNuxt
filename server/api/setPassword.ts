import axios from 'axios';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const { token, password } = getQuery(event);

  try {
    const response = await axios.post(`${config.apiUrl}/set-password/${token}`, {
      password: password
    });

    const resetResponse = response.data;
    return {
        resetResponse: resetResponse,
    };
  } catch (error) {
    console.error(error);
  }
});
