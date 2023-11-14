import axios from 'axios';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const { token } = getQuery(event);

  try {
    const response = await axios.get(`${config.apiUrl}/checkResetPasswordToken/${token}`);

    const resetResponse = response.data;
    return {
        resetResponse: resetResponse,
    };
  } catch (error) {
    console.error(error);
  }
});
