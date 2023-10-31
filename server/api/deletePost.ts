import axios from 'axios';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const { id } = getQuery(event);
  const { auth_token } = getQuery(event);

  try {
    const response = await axios.delete(`${config.apiUrl}/p/${id}/${auth_token}`);
    const deleteResponse = response.data;
    return {
        deleteResponse: deleteResponse,
    };
  } catch (error) {
    console.error(error);
  }
});
