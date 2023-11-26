import axios from "axios";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const { token } = getQuery(event);
  const { type } = getQuery(event);

  try {
    const response = await axios.get(`${config.apiUrl}/reports/all/${token}/${type}`);

    return {
      data: response.data,
    };
  } catch (error) {
    console.error(error);
  }
});
