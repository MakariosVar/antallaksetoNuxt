import axios from 'axios';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const { auth_token } = getQuery(event);

  try {
    const response = await axios.get(`${config.public.apiUrl}/vue/getuser/${auth_token}`);
    const userData = response.data;
    return {
        userData: userData,
    };
  } catch (error) {
    console.error(error);
  }
});
