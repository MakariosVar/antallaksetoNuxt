import axios from 'axios';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const { auth_token } = getQuery(event);
  const { descriptionInput } = getQuery(event);
  const { token } = getQuery(event);

  try {
    console.log(descriptionInput)
    const formData = new URLSearchParams({
      description: descriptionInput,
    })

    const response = await axios.post(`${config.apiUrl}/profile/${auth_token}`,{
      description: descriptionInput,
    });
    const commentsResponse = response.data;
    return {
        commentsResponse: commentsResponse,
    };  
  } catch (error) {
    console.error(error);
  }
});

