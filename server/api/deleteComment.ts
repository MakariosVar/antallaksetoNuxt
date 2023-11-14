import axios from 'axios';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const { id } = getQuery(event);

  try {
    const response = await axios.post(`${config.apiUrl}/deletecomment/${id}`);
    const deleteResponse = response.data;
    return {
        deleteResponse: deleteResponse,
    };
  } catch (error) {
    console.error(error);
  }
});
