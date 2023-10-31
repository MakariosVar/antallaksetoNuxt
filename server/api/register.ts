import axios from 'axios';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const { name } = getQuery(event);
  const { email } = getQuery(event);
  const { password } = getQuery(event);

  try {
    const body = new FormData();
    body.append('name', name)
    body.append('email', email)
    body.append('password', password)
    const response = await axios.post(`${config.apiUrl}/vueregister`, body);
    const registerData = response.data;
    
    return {
        registerData: registerData,
    };
  } catch (error) {
    console.error(error);
  }
});
