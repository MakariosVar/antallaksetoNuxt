import axios from 'axios';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const { user_id } = getQuery(event);
  const { object_type } = getQuery(event);
  const { object_id } = getQuery(event);
  const { category } = getQuery(event);
  const { other_text } = getQuery(event);

  try {
    const body = new FormData();
    body.append('user_id', user_id)
    body.append('object_type', object_type)
    body.append('object_id', object_id)
    body.append('report_category', category)
    if (other_text) {
        body.append('other_text', other_text)
    }
    const response = await axios.post(`${config.apiUrl}/report/create`, body);
    const reportData = response.data;
    
    return {
        reportData: reportData,
    };
  } catch (error) {
    console.error(error);
  }
});
