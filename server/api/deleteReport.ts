import axios from 'axios';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const { id } = getQuery(event);
  const { token } = getQuery(event);

  try {
    const response = await axios.delete(`${config.apiUrl}/reports/${id}/${token}`);
    const deleteResponse = response.data;
    return {
        deleteResponse: deleteResponse,
    };
  } catch (error) {
    console.error(error);
  }
});
