import axios from 'axios';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const { id } = getQuery(event);
  const { auth_token } = getQuery(event);

  try {
    const response = await axios.get(`${config.apiUrl}/vue/profile/${id}/${auth_token}`);
    const profileResponse = response.data;
    return {
        profileResponse: profileResponse,
    };
  } catch (error) {
    console.error(error);
  }
});

