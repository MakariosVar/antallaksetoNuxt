import axios from 'axios';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const { email } = getQuery(event);
  const { password } = getQuery(event);

  try {
    const body = new FormData();
    body.append('email', email)
    body.append('password', password)
    const response = await axios.post(`${config.apiUrl}/vuelogin`, body);
    const loginData = response.data;
    return {
        loginData: loginData,
    };
  } catch (error) {
    console.error(error);
  }
});
